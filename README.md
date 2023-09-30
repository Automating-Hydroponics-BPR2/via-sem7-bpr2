# via-sem7-bpr2-client
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/main.yml)](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/actions/workflows/main.yml)
[![github](https://img.shields.io/github/v/release/Automating-Hydroponics-BPR2/via-sem7-bpr2-client)](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/releases)

The client of the BPR2 (Bachelor Project) for VIA.

![Image](https://upload.wikimedia.org/wikipedia/commons/5/5d/VIA_UC_logo.png)

*Short Project description goes here* ------>

# Changelog
See the [changelog](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/blob/main/CHANGELOG.md) to see latest changes.

Raise an [issue](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/issues) if you see something that needs improvement or witness a bug with the template

## How to install? Prerequisities

You MUST have : `node & npm`

After successfully installing node run the following command:

```
npm install yarn -g
```
This will install yarn globally. This project was built with yarn as package manager in mind. 

I have not tested with npm as pkm. Raise an issue if you see a problem with npm.

## Husky & Commitizen initialization

Next head over to the root folder of your project and type
```
yarn install && yarn husky-init && yarn run start
```

This will configure husky & commitizen to automatically prettify and lint your files. 

As well as commit by the conventional commit [standard.](https://github.com/commitizen/cz-cli)

## Best commit practices for me are:
```
$ git add .
$ git commit
```
After `$ git commit` the terminal will call husky pre-commit hook which will lint all files. 
Then husky will call the prepare-commit-msg which on its side will prompt the commitizen conventional commit interface.

Lastly, of course, after selecting the type of commit and commit message we need to push our changes.
```
$ git push
```

# Amplify

This bachelor project has been build and hosted on AWS Amplify which is a way to deploy Full-stack applications under one roof. [Learn more](https://docs.amplify.aws/)

The application has been hosted on 👉 [link](https://stg-amplifyinit.d36cs0wh270jpt.amplifyapp.com/)

![Image](https://techblog.nhn-techorus.com/wp-content/uploads/2022/11/AWSAmplify_OGP.png)

## Frontend section 👇

### React
Text -->

### Typescript
Text -->

## Backend section 👇
The backend is a AWS Lambda fuction containing Serverless Express Backend and exposing a AWS ApiGateway REST API 👉 [link](https://p8hb9lbwxc.execute-api.eu-central-1.amazonaws.com/dev/)

Current endpoints configured:

### /device 
#### Post
Returns the created object in the following format. UUID is automatically created & added in the backend:
```
{
    "id": "3a00618a-5355-4f89-88bf-95c3c6756e49",
    "name": "Device :)",
    "type": "Device",
    "reading": "Readin",
    "dateTime": "Date"
}
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/putitemcommand.html)

### /device/{deviceId} 
#### GET
Gets a device with deviceId provided in pathParams
```
{
    "dateTime": "Datetime 2123",
    "id": "77c8b2f2-4ff3-4d41-a5e4-446b479468c0",
    "name": "Device with postman 1234:)",
    "reading": "Reading 2123",
    "type": "Device Type 1232"
}
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html)

#### PATCH
Updates a device with deviceId provided in pathParams and device properties to update in body

Passing following device object body
```
{
    "name": "Device updated with postman for testing purpose :)",
    "type": "Device Type 1",
    "reading": "Reading 1",
    "dateTime": "Datetime 1"
}
```
And expecting the output to be the same body so that the API confirms the update:
```
{
    "dateTime": "Datetime 1",
    "id": "1234",
    "name": "Device updated with postman for testing purpose :)",
    "reading": "Reading 1",
    "type": "Device Type 1"
}
```
⬆️ Update operation successful
[More info about --> AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)

#### DELETE
Deletes a record in the database with deviceId provided in pathParams and returns just a status 204 if deleted.

[More info about --> AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html)

### /devices
#### GET
Gets a list of devices

Query paramteres can be passed in the url
```
start="deviceId from where the returned devices array starts onwards (excluded)"
limit="the amount of items returned in the array"
```
Fx. URL/devices/?start=1234&limit=1 would fetch 2 devices AFTER the provided deviceId (excluding it)

The response contains the devices array, count object with total amount of devices returned and a property named LastEvaluatedKey which passes the id of the last passed device so that can be used in the start query parameter next request to create pagination in the frontend.

```
{
    "devices": [
        {
            "dateTime": "Datetime 2123",
            "id": "77c8b2f2-4ff3-4d41-a5e4-446b479468c0",
            "name": "Device with postman 1234:)",
            "reading": "Reading 2123",
            "type": "Device Type 1232"
        }
    ],
    "count": 1,
    "lastEvaluatedKey": {
        "id": "77c8b2f2-4ff3-4d41-a5e4-446b479468c0"
    }
}
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/ScanCommand/)


# Authors
```
Stefan Georgiev (304284)
Yoana Miteva ()
```
