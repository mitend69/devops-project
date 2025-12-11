pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/mitend69/devops-project.git'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh '''
                ansible-playbook ansible/deploy.yml
                '''
            }
        }

    }

    post {
        success {
            echo "Deployment Successful!"
        }
        failure {
            echo "Deployment Failed!"
        }
    }
}
