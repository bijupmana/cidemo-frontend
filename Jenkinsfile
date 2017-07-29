#!/usr/bin/env groovy

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
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
    }
}
