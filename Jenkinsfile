pipeline {
    agent any

    tools {
        nodejs "NodeJS_22" // Use stable LTS for CI memory stability
    }

    environment {
        VERCEL_TOKEN      = credentials('VERCEL_TOKEN')
        VERCEL_PROJECT    = credentials('VERCEL_PROJECT_ID')
        VERCEL_SCOPE      = credentials('VERCEL_ORG_ID')
    }

    stages {
        stage('Checkout') {
            steps {
                // Multibranch safe: uses env.BRANCH_NAME automatically if this is a Multibranch Pipeline
                checkout scm
            }
        }

        stage('Install') {
            steps {
                // Use legacy-peer-deps to avoid memory spikes
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
                    # Export secrets for safe CLI usage
                    export VERCEL_TOKEN=$VERCEL_TOKEN
                    export VERCEL_PROJECT=$VERCEL_PROJECT
                    export VERCEL_ORG=$VERCEL_SCOPE

                    # Deploy
                    npx vercel --prod --yes
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
