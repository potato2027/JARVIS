pipeline{
    agent any
    stages {
        stage ('Building Docker Image') {
            steps {
                bat 'docker build -t myapp:0.0.1 .'
            }
        }
       stage ('Runnung Docker Image') {
            steps {
                bat 'docker container run myapp:0.0.1'
            }
        }
    }
}
