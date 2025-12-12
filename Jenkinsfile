pipeline {
    agent any

    environment {
        VERSION = "${BUILD_NUMBER}"
        IMAGE_NAME = "mitend69/devops-app:${VERSION}"
        LATEST_IMAGE = "mitend69/devops-app:latest"
        PREVIOUS_IMAGE = "mitend69/devops-app:${BUILD_NUMBER - 1}"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'dockerhub-user', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                    ]) {
                        sh """
                        docker login -u $DOCKER_USER -p $DOCKER_PASS
                        docker build -t ${IMAGE_NAME} .
                        docker tag ${IMAGE_NAME} ${LATEST_IMAGE}
                        """
                    }
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'dockerhub-user', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                    ]) {
                        sh """
                        docker login -u $DOCKER_USER -p $DOCKER_PASS
                        docker push ${IMAGE_NAME}
                        docker push ${LATEST_IMAGE}
                        """
                    }
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh """
                ansible-playbook ansible/deploy.yml \
                    -e docker_image=${IMAGE_NAME} \
                    -e rollback_image=${PREVIOUS_IMAGE}
                """
            }
        }
    }

    post {
        success {
            echo "Deployment Successful!"
        }
        failure {
            echo "Pipeline Failed!"
        }
    }
}

