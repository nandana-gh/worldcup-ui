pipeline {
    agent any

    environment {
        IMAGE_NAME = 'worldcup-ui'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Building the image locally to verify Compilation and Dockerfile logic
                bat 'docker build -t %IMAGE_NAME%:%BUILD_ID% .'
            }
        }
    }
}
