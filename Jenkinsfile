pipeline {
    agent any

    environment {
    DOCKERHUB_USER = credentials('dockerhub-user')
    DOCKERHUB_PASS = credentials('dockerhub-pass')
    VERSION = "${BUILD_NUMBER}"
    IMAGE_NAME = "mitend69/devops-app:${VERSION}"
    LATEST_IMAGE = "mitend69/devops-app:latest"
    PREVIOUS_VERSION = "${BUILD_NUMBER - 1}"
    PREVIOUS_IMAGE = "mitend69/devops-app:${PREVIOUS_VERSION}"
}

    stages {

        stage('Build Docker Image') {
            steps {
                sh '''
                # Build versioned image
                docker build -t $DOCKERHUB_REPO:$IMAGE_TAG .

                # Tag versioned image as latest
                docker tag $DOCKERHUB_REPO:$IMAGE_TAG $DOCKERHUB_REPO:latest
                '''
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                    # Push both versioned and latest tags
                    docker push $DOCKERHUB_REPO:$IMAGE_TAG
                    docker push $DOCKERHUB_REPO:latest
                    '''
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

