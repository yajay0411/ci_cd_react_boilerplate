pipeline {
    agent any

    tools {
        nodejs "NodeJS_22"
    }

    environment {
        VERCEL_TOKEN     = credentials('VERCEL_TOKEN')
        VERCEL_ORG_ID    = credentials('VERCEL_ORG_ID')
        VERCEL_PROJECT_ID= credentials('VERCEL_PROJECT_ID')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "main", url: 'https://github.com/yajay0411/ci_cd_react_boilerplate'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                // Prod vs Dev build
                script {
                    if (env.BRANCH_NAME == 'main') {
                        sh 'npm run build:production'
                    } else {
                        sh 'npm run build:development'
                    }
                }
            }
        }

        stage('Deploy to Vercel') {
            steps {
                sh """
                npx vercel deploy \
                  --token=$VERCEL_TOKEN \
                  --org $VERCEL_ORG_ID \
                  --project $VERCEL_PROJECT_ID \
                  --prod=${env.BRANCH_NAME == 'main'}
                """
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful for branch: ${env.BRANCH_NAME}"
        }
        failure {
            echo "❌ Deployment failed for branch: ${env.BRANCH_NAME}"
        }
    }
}
