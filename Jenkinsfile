#!/usr/bin/env groovy

@Library('demo-pipeline-library') _

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    parameters {
        string( name: 'CF_API',
                defaultValue: 'https://api.local.pcfdev.io',
                description: 'Cloud Foundry API url')

        string( name: 'CF_BASE_HOST',
                defaultValue: 'local.pcfdev.io',
                description: 'Base host for CF apps')

        string( name: 'CF_ORG',
                defaultValue: 'pcfdev-org',
                description: 'Cloud Foundry Org')

        string( name: 'CF_SPACE',
                defaultValue: 'pcfdev-space',
                description: 'Cloud Foundry Space')
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
                sh 'npm run build:prod'
            }
        }

        stage('Deploy & Run E2E') {
            environment {
                PCF = credentials('pcf')
            }
            steps {
                sh "cf login -a ${params.CF_API} -u $PCF_USR -p $PCF_PSW -o ${params.CF_ORG} -s ${params.CF_SPACE}  --skip-ssl-validation"

                script {
                    def appName = isFeatureBranch()
                                ? appNameFromManifest(append: env.BRANCH_NAME)
                                : appNameFromManifest()

                    sh "cf push ${appName}"

                    sh 'printenv'

                    build job: '/run-e2e-tests',
                          wait: true,
                          parameters: [string(name: 'APP_BASE_URL', value: "https://${appName}.${params.CF_BASE_HOST}/"),
                                       string(name: 'APP_REPO', value: 'https://github.com/julie-ng/js-cidemo-frontend.git'),
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
