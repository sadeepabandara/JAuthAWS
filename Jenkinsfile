pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sadeepabandara/JAuthAWS.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Lint (Code Quality)') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                }
                dir('backend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }

        stage('Security Audit') {
            steps {
                dir('frontend') {
                    sh 'npm audit --audit-level=low || true'
                }
                dir('backend') {
                    sh 'npm audit --audit-level=low || true'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Assuming Dockerfile is at root and can build entire app
                sh 'docker build -t jauthaws-frontend ./frontend'
                sh 'docker build -t jauthaws-backend ./backend'
            }
        }

        stage('Deploy (Test Env)') {
            steps {
                sh '''
                docker rm -f jauthaws-frontend-test || true
                docker run -d -p 3000:3000 --name jauthaws-frontend-test jauthaws-frontend
                '''

                sh '''
                docker rm -f jauthaws-backend-test || true
                docker run -d -p 4000:4000 --name jauthaws-backend-test jauthaws-backend
                '''
            }
        }

        stage('Release (Deploy with CodeDeploy)') {
            steps {
                withAWS(region: 'us-east-1', credentials: 'aws-jenkins-creds') {
                    sh '''
                        echo "Making start scripts executable..."
                        chmod +x frontend/start.sh backend/start.sh

                        echo "Zipping application..."
                        zip -r JAuthAWS.zip . -x "node_modules/*" ".git/*"

                        echo "Uploading to S3..."
                        aws s3 cp JAuthAWS.zip s3://jauthaws-deployments/JAuthAWS.zip

                        echo "Creating CodeDeploy deployment..."
                        aws deploy create-deployment \
                            --application-name JAuthAWS \
                            --deployment-group-name JAuthAWS-DeploymentGroup \
                            --s3-location bucket=jauthaws-deployments,key=JAuthAWS.zip,bundleType=zip
                    '''
                }
            }
        }

        stage('Monitoring') {
            steps {
                sh 'echo "Simulating monitoring step: logs, metrics, alerts..."'
            }
        }
    }
}
