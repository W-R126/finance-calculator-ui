pipeline {
    agent none

    environment {
        CI = 'true'
    }

    stages {
        stage('Build') {
            agent { docker 'node:12.16.1-stretch-slim' }
            steps {
                sh 'echo "registry=https://nexus.fintechchallenge.pl/repository/npm\n//nexus.fintechchallenge.pl/repository/npm/:_authToken=NpmToken.434397a1-9630-3664-8603-21bf57209914\nalways-auth=true" >> ~/.npmrc'
                sh 'yarn'
                sh 'yarn build'
            }
        }
        stage('Test') {
            agent { docker 'node:12.16.1-stretch-slim'}
            steps {
                sh 'yarn test'
            }
        }
        stage('Sonar') {
            when { branch 'master' }
            agent { docker 'fintech/sonar-agent' }
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                        sh "sonar-scanner"
                    }
                }
            }
        }
        stage('Docker push') {
            when { branch 'master' }
            agent none
            steps {
                script {
                    docker.withRegistry('https://metis-team-docker-registry.fintechchallenge.pl/v2/', 'docker-push-user') {
                        def build = docker.build("metis-team/metis-finance-calculator-ui", '-f ./docker/Dockerfile .')
                        build.push("latest")
                    }
                }
            }
        }
        stage('Deploy Sit') {
            when { branch 'master' }
            agent { docker 'fintech/kubernetes-agent' }
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubeconfig-sit', variable: 'KUBECONFIG')]) {
                        sh "kubectl apply -f ./kubernetes-sit.yaml"
                        sh "kubectl rollout restart deployment metis-finance-calculator-ui"
                    }
                }
            }
        }
        stage('Deploy Uat') {
            when { branch 'master' }
            agent { docker 'fintech/kubernetes-agent' }
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubeconfig-uat', variable: 'KUBECONFIG')]) {
                        sh "kubectl apply -f ./kubernetes-uat.yaml"
                        sh "kubectl rollout restart deployment metis-finance-calculator-ui"
                    }
                }
            }
        }
    }
}