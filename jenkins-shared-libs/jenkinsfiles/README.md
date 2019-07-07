# jenkins-shared-libs

Arquivos responsaveis por invocar os Shared Libs.

Equivalente aos arquivos que ficam na pasta `jenkinsfiles/` das aplicações.

O nome dos arquivos é o mesmo nome do job no jenkins.

```
#!groovy

@Library('gb-libs@feature/s3-rollback') _

cdFrontDeployS3{
    properties([
      parameters([
        string(name: 'COMMIT',      description: '*', ),
        string(name: 'TEAM_NAME',      description: '*', ),
        string(name: 'REPOCONF',      description: '*', ),
        string(name: 'CLOUDFRONT',      description: '*', ),
        string(name: 'CACHE_PATH',      description: '*', ),
        string(name: 'APP_URL',      description: '*', )
       ])
    ])
}
```

` @Library('gb-libs) _ ` - Esta linha é responsavel por dizer qual lib utilizar (Configurada no Jenkins)

`cdFrontDeployS3 `  - Este é o nome do arquivo que será utilizado da pasta `vars`, no caso o arquivo `cdFrontDeployS3.groovy`