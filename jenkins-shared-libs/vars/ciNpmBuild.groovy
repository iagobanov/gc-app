#!groovy

def call(body) {
    //Parser Configuration
    def config = [:]
    body.resolveStrategy = Closure.DELEGATE_FIRST
    body.delegate = config
    body()

    //Instancia dos Objetos
    def npm = new libs.build.npm.NpmBuild()
    def git = new libs.git.Git()
    def docker = new libs.docker.Docker()
    def repoPwd
    def strippedCommit
    

    pipeline {
        agent any

        environment {
            DOCKER_REGISTRY = "iagobanov"
            REGISTRY_USER = "iagobanov"
            REGISTRY_PW = ""
        }

        stages {
            stage('Clone APP Repository & get stripped commit') { 
                steps {
                    script {
                        repoPwd = git.cloneAndCheckout("${params.REPO}", "${params.APPNAME}" "${params.BRANCH}")
                        strippedCommit = git.getShortCommitHash("${repoPwd}")
                    }
                }
            }
            stage('Build and Test') {
                steps {    
                    dir(repoPwd){
                        script {
                            npm.install()
                        }   
                    }  
                }
            }
            stage ('Docker Login') {
                steps {
                    dir (repoPwd) { 
                        docker.registryLogin("${env.REGISTRY_USER}","${env.REGISTRY_PW}")
                    } 
                }
            }              
            stage ('Docker Build') {
                steps {
                    dir (repoPwd) { 
                        docker.imageBuilder("${params.APPNAME}","${strippedCommit}", "${env.DOCKER_REGISTRY}")
                    } 
                }
            }                
            stage('Docker tag') {
                steps {
                    dir(repoPwd){
                        script {
                            docker.imageTag("${params.APPNAME}","${strippedCommit}", "${env.DOCKER_REGISTRY}")
                        }
                    }
                }
            }
            stage('Docker push') {
                steps {
                    dir(repoPwd){
                        script {
                            docker.imagePublish("${params.APPNAME}","${strippedCommit}", "${env.DOCKER_REGISTRY}")
                        }
                    }
                }
            }
            stage('Update Minikube APP') {          
                steps {
                    dir(repoPwd)
                    script {
                        sh "kubectl rollout restart deployment/${APPNAME}"
                    }
                }
            }
        }
        post {
            always { 
                cleanWs()
            }
        }       
    }
}