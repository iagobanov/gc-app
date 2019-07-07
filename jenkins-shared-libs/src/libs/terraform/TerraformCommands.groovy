#!groovy

package libs.terraform;

def void terraformInit(String directory, String tfBinPath) {
    sh "cd ${directory} && ${tfBinPath} init"
}

def void terraform_execution(String command, String directory, String tfBinPath, String variables){
    //Variaveis tem escopo Global nao precisam ser definidas.
    if ("${command}" == "plan") {
        sh "cd ${directory} && ${tfBinPath} ${command} ${variables}"            
    } else {
        sh "cd ${directory} && ${tfBinPath} ${command} ${variables} --auto-approve"
    }
}

return this