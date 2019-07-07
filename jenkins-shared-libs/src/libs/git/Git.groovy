#!groovy
package libs.git;

def String cloneAndCheckout(String REPO, String APPNAME, String BRANCH){
    script {
        sh "git clone -b ${BRANCH} ${REPO} && cd ${APPNAME} && git checkout ${BRANCH}"
        PWD = sh (
            script:  "cd ${APPNAME} && pwd",
            returnStdout: true
        ).trim()
        return PWD
    }
}

def String getShortCommitHash(String REPO_PWD) {
    script {
        shortCommit = sh (
            script:  "cd ${REPO_PWD} && git log -n 1 --pretty=format:'%h'",
            returnStdout: true
        ).trim()
        return shortCommit
    }
}

return this