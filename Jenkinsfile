pipeline {
    agent any

    tools {
        nodejs "NodeJS_22" // Use stable LTS for CI memory stability
    }

    environment {
        VERCEL_TOKEN   = credentials('VERCEL_TOKEN')       // API token
        VERCEL_PROJECT = credentials('VERCEL_PROJECT_ID')  // Project ID
        VERCEL_ORG     = credentials('VERCEL_ORG_ID')      // Org/Team ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci --legacy-peer-deps'
            }
        }

        stage('Build') {
            steps {
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
                sh '''
                    # Export Jenkins credentials into shell env
                    export VERCEL_TOKEN=$VERCEL_TOKEN
                    export VERCEL_PROJECT_ID=$VERCEL_PROJECT
                    export VERCEL_ORG_ID=$VERCEL_ORG

                    # Authenticate & deploy (works with non-interactive CI)
                    npx vercel deploy \
                      --token=$VERCEL_TOKEN \
                      --prod \
                      --yes \
                      --scope=$VERCEL_ORG
                '''
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
