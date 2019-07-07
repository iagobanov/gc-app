#!groovy
@Library('gc-libs') _

provKMSCreateKey {
    properties([
      parameters([
        string(name: 'APPLICATION', defaultValue: '', description: 'The name of the application of this Key'),
        string(name: 'TEAM_NAME', defaultValue: '', description: 'Enter your team name: ["Iws", "Platform", "Enablers"]'),
        string(name: 'ROLES', defaultValue: '"arn:aws:iam::265455541035:role/sample-prod,arn:aws:iam::265455541035:role/another-sample-prod"', description: 'The ARNs of the roles that will consume this KMS Key. The ARNs must be separated by comma.')
       ])
    ])
}