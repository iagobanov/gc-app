package libs.docker;

def void imageBuilder(String APPNAME, String STRIPPED_COMMIT, String DOCKER_REGISTRY){
    script {    
        sh "docker build -t ${DOCKER_REGISTRY}/${APPNAME}:${STRIPPED_COMMIT} --pull=true ."
    }    
}

def void imageTag(String APPNAME, String STRIPPED_COMMIT, String DOCKER_REGISTRY) {
    script {    
        sh "docker tag ${DOCKER_REGISTRY}/${APPNAME}:${STRIPPED_COMMIT} ${DOCKER_REGISTRY}/${REPO_NAME}:latest" 
    }
}

def void imagePublish(String APPNAME, String STRIPPED_COMMIT, String DOCKER_REGISTRY) {
    script {    
        sh "docker push ${DOCKER_REGISTRY}/${APPNAME}:${STRIPPED_COMMIT}"
        sh "docker push ${DOCKER_REGISTRY}/${APPNAME}:latest"
    }
} 

def void registryLogin(String REGISTRY_USER, String REGISTRY_PW) {
    sh "docker login -u ${REGISTRY_USER} -p ${REGISTRY_PW}"
}