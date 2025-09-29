pipeline {
    agent any
    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Git branch to build')
    }
    tools {
        nodejs "NodeJS_22"
    }
    environment {
        VERCEL_TOKEN      = credentials('VERCEL_TOKEN')
        VERCEL_ORG_ID     = credentials('VERCEL_ORG_ID')
        VERCEL_PROJECT_ID = credentials('VERCEL_PROJECT_ID')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/yajay0411/ci_cd_react_boilerplate'
            }
        }
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Build') {
            steps {
                script {
                    if (params.BRANCH_NAME == 'main') {
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
                  --prod=${params.BRANCH_NAME == 'main'}
                """
            }
        }
    }
    post {
        success { echo "✅ Deployment successful for branch: ${params.BRANCH_NAME}" }
        failure { echo "❌ Deployment failed for branch: ${params.BRANCH_NAME}" }
    }
}
