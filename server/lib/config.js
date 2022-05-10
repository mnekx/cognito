const environments = {}

environments.staging = {
    'httpPort': 4000,
    'httpsPort': 4001,
    'envName': 'staging',
    'hashingSecret': 'this is a secret'
}

environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'this is also a secret'
}

const currentEnv = typeof process.env.NODE_ENV == 'string'? process.env.NODE_ENV.toLowerCase(): '';

const envToExport = typeof environments[currentEnv] == 'object'? environments[currentEnv]: environments.staging;

module.exports = envToExport;