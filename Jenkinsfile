#!/usr/bin/env groovy

@Library('demo-pipeline-library@feature/cf-helper') _

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    parameters {
        string( name: 'CF_BASE_HOST',
                defaultValue: 'local.pcfdev.io',
                description: 'Base host for CF apps')
    }

    tools {
        nodejs 'node-7'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('NPM Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint Code') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm run test:headless'
            }
        }

        stage('Build') {
            steps {
                // angular - always needed
                sh 'npm run build:prod'

                // just for this feature
                sh 'npm run express:build'
            }
        }

        stage('Deploy & Run E2E') {
            when {
                expression {
                    return isFeatureBranch() || env.BRANCH_NAME == 'master'
                }
            }
            steps {
                script {
                    String appName = isFeatureBranch()
                                ? appNameFromManifest(append: env.BRANCH_NAME)
                                : appNameFromManifest()

                    cfPush([
                        appName: appName,
                        apiUrl: 'https://api.local.pcfdev.io',
                        org:    'pcfdev-org',
                        space:  'pcfdev-space',
                        credentialsId: 'pcf',
                        skipSSL: true
                    ])


                    if (isFeatureBranch()) {
                        String middlewareAppName = appName.replaceAll('cidemo-frontend', 'cidemo-middleware')
                        String middlewareUrl = "http://${middlewareAppName}.local.pcfdev.io"
                        withCf([
                            apiUrl: 'https://api.local.pcfdev.io',
                            org:    'pcfdev-org',
                            space:  'pcfdev-space',
                        ]) {
                            sh "cf set-env $appName MIDDLEWARE_ENDPOINT $middlewareUrl"
                        }
                    }

                    build job: '/downstream/run-e2e-tests',
                          wait: true,
                          parameters: [string(name: 'APP_BASE_URL', value: "https://${appName}.${params.CF_BASE_HOST}/"),
                                       string(name: 'BRANCH', value: env.BRANCH_NAME)]
                }
            }
        }
    }

    post {
        success {
            script {
                createArtifact {
                    prefix = 'artifact-'
                    version = nextVersion()
                    sha = buildCommitSha()
                }

                uploadToArtifactory {
                    pattern = 'artifact-*.zip'
                    target = 'snapshot-local/cidemo-frontend/'
                }

                cleanUpArtifacts()
            }
        }
    }
}
