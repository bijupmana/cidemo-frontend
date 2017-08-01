#!/usr/bin/env groovy

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

        stage('Deploy') {
            environment {
                PCF = credentials('pcf')
            }
            steps {
                script {
                    sh "cf login -a ${params.CF_API} -u $PCF_USR -p $PCF_PSW -o ${params.CF_ORG} -s ${params.CF_SPACE}  --skip-ssl-validation"
                    sh 'cf push'
                }
            }
        }

        stage('E2E Tests') {
            steps {
                script {
                    def appInfo = readYaml file: './manifest.yml'
                    def appName = appInfo.applications[0].name
                    withEnv(["APP_BASE_URL=https://${appName}.${params.CF_BASE_HOST}/"]) {
                        sh 'npm run e2e:prod'
                    }
                }
            }
        }

        stage('Create Artifact') {
            steps {
                script {
                    // Remove previous artifacts
                    sh 'rm -rf *.zip'

                    // Determine next semantic version
                    String version = sh(script: "npm run version:next | tail -n 1", returnStdout: true).trim()
                    String sha = sh(script: "git log -n 1 --pretty=format:'%h'", returnStdout: true)
                    println version

                    // Save build metadata
                    String branch = env.BRANCH_NAME.replace('/','-')
                    String buildData = """
                    {
                        "version": "${version}+${sha}",
                        "type": "snapshot",
                        "branch": "${branch}",
                        "job": {
                            "baseName": "${env.JOB_BASE_NAME}",
                            "name": "${env.JOB_NAME}"
                        },
                        "build": {
                            "number": "${env.BUILD_NUMBER}",
                            "tag": "${env.BUILD_TAG}",
                        }
                    }"""
                    touch file: 'artifact.json'
                    writeFile file: 'artifact.json', text: buildData, encoding: 'utf-8'

                    // Create zip artifact
                    zip zipFile: "artifact-${branch}-${sha}.zip"
                }
            }
        }

        stage('Archive to Artifactory') {
            steps {
                script {
                    def artifactoryUrl = "http://${env.LOCAL_IP}:8000/artifactory"
                    def server = Artifactory.newServer url: artifactoryUrl, credentialsId: 'artifactory'
                    def uploadSpec = """{
                          "files": [
                            {
                              "pattern": "artifact-*.zip",
                              "target": "snapshot-local/cidemo-frontend/"
                            }
                         ]
                        }"""
                    def buildInfo = server.upload(uploadSpec)
                    server.publishBuildInfo(buildInfo)
                }
            }
        }
    }
}
