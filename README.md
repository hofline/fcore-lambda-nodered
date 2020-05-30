# fcore-lambda-nodered #

Serverless nodered base project with AWS Lambda

### Gettting started
```
npm install
```

### local run
```
export DEVELOPMENT=1 && node app.js
```

### local test
```
sls invoke local -f api --stage dev --region us-west-2
```

### deploy DEV ###
```
sls deploy --stage dev --region us-west-2 --bucket my-sls-deployments-us-west-2 --aws-profile profile-dev
```

### deploy QA ###
```
sls deploy --region us-east-1 --bucket my-sls-deployments-us-west-2 --stage qa --aws-profile profile-qa
```

### Warning!!! deploy HOMO ###
```
sls deploy --region us-west-2 --bucket my-sls-deployments-us-west-2--stage homo --aws-profile profile-prod
```