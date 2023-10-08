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

The application has been hosted on 👉 [link](https://main.d2w95gfx7rgwd6.amplifyapp.com/)

![Image](https://techblog.nhn-techorus.com/wp-content/uploads/2022/11/AWSAmplify_OGP.png)

## Frontend section 👇

### React
Text -->

### Typescript
Text -->

## Backend section 👇
The backend is a AWS Lambda fuction containing Serverless Express Backend and exposing a AWS APIGateway REST API 👉 [link](https://bvj938q4m0.execute-api.eu-central-1.amazonaws.com/dev)

Current routes configured: [device, user]. Each endpoint except login and register is protected with JWT token.

### /device 
#### PATCH
Endpoint for updating a device. Example request path: `/device?id=1234`
Updates a device with deviceId provided in queryParams and device properties to update in body. 
UserId is extracted from the JWT token and checked if it matches the userId of the device to be updated.

Passing following device object body
```
{
    "id": "1234", // id is provided by the user and has to be unique. Optional.
    "name": "Device updated.", // name is provided by the user. Optional.
}
```
And the output if successful is the updated device object with all properties that also includes id and userId:
```
{
    "id": "1234",
    "name": "Device updated",
    "userId": "1234",
}
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)

#### DELETE
Endpoint for deleting a device. Example request path: `/device?id=1234`
Deletes a device with id provided in queryParams. UserId is extracted from the JWT token and checked if it matches the userId of the device to be deleted.
This endpoint does not return anything. If successful it returns 204 **No Content** status code.

[More info about --> AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html)

### /device/new
#### POST
Endpoint for creating a new device. Example request path: `/device/new`
Inserts a new device in the database. UserId is extracted from the JWT token and added to the device object.
Passing following device object body
```
{
    "id": "1234", // id is provided by the user and has to be unique. Mandatory.
    "name": "Device :)", // name is provided by the user. Optional.
}
```

Returns the created device in the following format:
```
{
    "id": "1234",
    "name": "Device :)", // Returns the name if specified in the body. Otherwise returns "Unnamed device"
    "userId": "1234",
}
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/putitemcommand.html)

### /device/current
#### GET
Endpoint for getting the current readings of a device. Example request path: `/device/current?id=1234`
Gets the current readings of a device with id provided in queryParams. UserId is extracted from the JWT token and checked if it matches the userId of the device to be fetched. Then performs a query on the database to get the latest readings of the device sorted by the timestamp property in the Readings DynamoDB table.

Returns the readings in the following format:
```
{
    "id": "1234",
    "deviceId": "1234",
    "timestamp": "153234234", // Unix timestamp
    "light": "1234",
    "temp": "1234",
    "humidity": "1234",
    "ph": "1234",
    "waterTemp": "1234",
}
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/ScanCommand/)

### /device/historical
#### GET
Endpoint for getting the historical readings of a device. Example request path: `/device/historical?id=1234&start=1234&end=1234&type=1234`
Gets the historical readings of a device with id provided in queryParams. UserId is extracted from the JWT token and checked if it matches the userId of the device to be fetched. Then performs a query on the database to get the readings of the device sorted by the timestamp property in the Readings DynamoDB table.
The queryParamteres are for example:
```
{
    "id": "1234", // id of the device
    "start": "1234", // Unix timestamp
    "end": "1234", // Unix timestamp
    "type": "1234", // Type of the readings. Can be one of the following: light, temp, humidity, ph, waterTemp
}
```
Returns the readings in the following format:
```
[
    {
        "id": "1234",
        "deviceId": "1234",
        "timestamp": "153234234", // Unix timestamp
        "light": "1234",
        "temp": "1234",
        "humidity": "1234",
        "ph": "1234",
        "waterTemp": "1234",
    },
    {
        "id": "1234",
        "deviceId": "1234",
        "timestamp": "153234234", // Unix timestamp
        "light": "1234",
        "temp": "1234",
        "humidity": "1234",
        "ph": "1234",
        "waterTemp": "1234",
    },
    ...
]
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/ScanCommand/)

### /user
#### PATCH
Endpoint for updating a user. Example request path: `/user?id=1234`
Updates a user with userId provided in queryParams and user properties to update in body.
An example of a user object body:
```
{
    "username": "Username updated.", // username is provided by the user. Optional.
    "email": "Email updated.", // email is provided by the user. Optional.
    "firstName": "User updated.", // firstName is provided by the user. Optional.
    "lastName": "User updated.", // lastName is provided by the user. Optional.
}
```
And the output if successful is the updated user object with all properties (except password):
```
{
    "id": "1234",
    "username": "Username updated.",
    "email": "Email updated.",
    "firstName": "User updated.",
    "lastName": "User updated.",
}
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)

#### DELETE
Endpoint for deleting a user. Example request path: `/user?id=1234`
Deletes a user with id provided in queryParams. UserId is extracted from the JWT token and checked if it matches the userId of the user to be deleted.
This endpoint does not return anything. If successful it returns 204 **No Content** status code.

[More info about --> AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html)

### /user/login
#### POST
Endpoint for logging in a user. Example request path: `/user/login`
Logs in a user with email and password provided in body. If successful returns a JWT token.
An example of a user object body:
```
{
    "email": "Email updated.", // email is provided by the user. Mandatory.
    "password": "Password updated.", // password is provided by the user. Mandatory.
}
```
And the response is a JWT Token containing the user information that has an expiration time of 1hr

[More info about --> JWT Tokens](https://jwt.io/)

### /user/register
#### POST
Endpoint for registering a user. Example request path: `/user/register`
Registers a user with email, password, username, firstName and lastName provided in body. Decrypts the password and stores it in the database using bcrypt.
An example of a user object body:
```
{
    "email": "Email updated.", // email is provided by the user. Mandatory.
    "password": "Password updated.", // password is provided by the user. Mandatory.
    "username": "Username updated.", // username is provided by the user. Mandatory.
    "firstName": "User updated.", // firstName is provided by the user. Mandatory.
    "lastName": "User updated.", // lastName is provided by the user. Mandatory.
}
```
And the response is a JWT Token containing the user information that has an expiration time of 1hr

[More info about --> JWT Tokens](https://jwt.io/)

# Authors
```
Stefan Georgiev (304284)
Yoana Miteva ()
```
