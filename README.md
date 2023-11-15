[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/main.yml)](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/actions/workflows/main.yml)
[![github](https://img.shields.io/github/v/release/Automating-Hydroponics-BPR2/via-sem7-bpr2-client)](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/releases)
[![jest tested](https://img.shields.io/badge/Jest-tested-eee.svg?logo=jest&labelColor=99424f)](https://github.com/jestjs/jest)

BPR2 (Bachelor Project) for VIA. Full-stack development with AWS Amplify.

![Image](https://upload.wikimedia.org/wikipedia/commons/5/5d/VIA_UC_logo.png)

# Table of Contents
- [Changelog](#changelog)
- [How to install? Prerequisities](#how-to-install-prerequisities)
- [How to install? Dependencies](#how-to-install-dependencies)
- [How to install? Husky & Commitizen initialization](#how-to-install-husky--commitizen-initialization)
- [Best commit practices for me are:](#best-commit-practices-for-me-are)
- [Amplify](#amplify)
  - [Frontend section 👇](#frontend-section-)
    - [React](#react)
    - [Typescript](#typescript)
    - [Storybook](#storybook)
    - [MUI](#mui)
    - [Styled Components](#styled-components)
  - [Backend section 👇](#backend-section-)
    - [JWT Token](#jwt-token)
    - [Jest](#jest)
    - [BCrypt](#bcrypt)
  - [API Endpoint Documentation](#api-endpoint-documentation)
    - [/device](#device)
      - [PATCH](#patch)
      - [DELETE](#delete)
    - [/device/new](#devicenew)
      - [POST](#post)
    - [/device/current](#devicecurrent)
      - [GET](#get)
    - [/device/historical](#devicehistorical)
      - [GET](#get-1)
    - [/user](#user)
      - [PATCH](#patch-1)
      - [DELETE](#delete-1)
    - [/user/login](#userlogin)
      - [POST](#post-1)
    - [/user/register](#userregister)
      - [POST](#post-2)
- [Authors](#authors)


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

## How to install? Dependencies

After installing yarn, head over to the root folder of your project and type
```
yarn install
```
This will install all dependencies for the project.

## How to install? Husky & Commitizen initialization

Next head over to the root folder of your project and type
```
yarn husky:init
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

However, if you want you can use the already defined script for commiting changes:
```
$ yarn run push
```

This will run all of the above commands in one go.

# Amplify

This bachelor project has been build and hosted on AWS Amplify which is a way to deploy Full-stack applications under one roof. [Learn more](https://docs.amplify.aws/)

The application has been hosted on 2 environments: Main and Dev.
```
Main environment 👉 [link](https://main.d2w95gfx7rgwd6.amplifyapp.com/)
Dev environment 👉 [link](https://stg-amplifychanges-4-10-23.d2w95gfx7rgwd6.amplifyapp.com/)
```

![Image](https://techblog.nhn-techorus.com/wp-content/uploads/2022/11/AWSAmplify_OGP.png)

## Frontend section 👇

### React
React.js is a JavaScript library for building user interfaces. [Learn more](https://reactjs.org/). It has been the leading library for building user interfaces for the past 7 years. [Statistics](https://insights.stackoverflow.com/survey/2020#technology)

![Image](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)

### Typescript
TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. [Learn more](https://www.typescriptlang.org/)

![Image](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png)

### Storybook
Storybook is an open source tool for developing UI components in isolation for React, Vue, Angular, and more. It makes building stunning UIs organized and efficient. [Learn more](https://storybook.js.org/)

![Image](https://res.cloudinary.com/practicaldev/image/fetch/s--AU4TEK0l--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9ype7suwe1wjzz4x3idl.png)

### MUI
MUI is a lightweight CSS framework that follows Google's Material Design guidelines. [Learn more](https://mui.com/)

![Image](https://miro.medium.com/v2/resize:fit:1200/1*fEyeESs-HxVR7Zlr-fdlvw.png)

### Styled Components
Styled Components is a CSS-in-JS library that enables developers to write each component with their own styles. [Learn more](https://styled-components.com/)

![Image](https://res.cloudinary.com/practicaldev/image/fetch/s--yJirJ3Kb--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1jwk9rkgalxe89uftrha.png)

## Backend section 👇
The backend is a AWS Lambda fuction containing Serverless Express Backend.

### JWT Token
JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. [Learn more](https://jwt.io/)
The token is generated on the backend and returned to the frontend after a successful login or register. The token is then stored in the local storage of the browser and is used for authentication on the backend. The token has an expiration time of 1hr.

[![JWT Token](https://jwt.io/img/pic_logo.svg)](https://jwt.io/)

### Jest
Jest is a delightful JavaScript Testing Framework with a focus on simplicity. [Learn more](https://jestjs.io/)
Jest is used for testing the backend. The tests are located in the `__tests__` folder. The tests are run on every push to the main branch using Github Actions.

[![Jest](https://jestjs.io/img/jest.png)](https://jestjs.io/)

### BCrypt
BCrypt is a password hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher. [Learn more](https://en.wikipedia.org/wiki/Bcrypt)
BCrypt is used for hashing the password of the user on the backend. The password is hashed before storing it in the database. The password is decrypted when the user logs in and is compared with the password in the database.

[![BCrypt](https://media.geeksforgeeks.org/wp-content/uploads/20220427143809/Artboard1.jpg)](https://en.wikipedia.org/wiki/Bcrypt)

## API Endpoint Documentation\
The API has been developed in AWS APIGateway and is exposed in 2 stages: Main and Dev.

```
👉 Main [link](https://1aelqys6w7.execute-api.eu-central-1.amazonaws.com/main)
👉 DEV [link](https://bvj938q4m0.execute-api.eu-central-1.amazonaws.com/dev)
```

Current routes configured: [device, user]. Each endpoint except login and register is protected with a JWT token. The token is extracted from the Authorization header and is checked if it is valid and not expired. If the token is valid the request is processed, otherwise the request is rejected with 401 **Unauthorized** status code.

### /device
#### PATCH
Endpoint for updating a device. Example request path: `/device?id=1234`
Updates a device with id provided in queryParams and device properties to update in body. 
UserId is extracted from the JWT token and checked if it matches the userId of the device to be updated.

Passing following device object body
```
{
    "deviceId": "1234-1234-1234", // String. deviceId is provided by the user and has to be unique. Optional. Must be between 10 and 20 characters if not unchanged
    "name": "Device updated ✅", // String. Name is provided by the user, "Unnamed Device" otherwise. Optional. Must be between 10 and 20 characters if not unchanged
}
```
And the output if successful is the updated device object with all properties (updated and not updated) that also includes id and userId:
```
{
    "id": "443155a5-5494-4269-84df-fe848b0f2bb0", // String. The id of the device is also returned with the response
    "deviceId": "1234-1234-1234", // String. The deviceId if specified, otherwise the old deviceId is returned
    "name": "Device updated ✅", // String. The name if specified, "Unnamed Device" otherwise.
    "userId": "1234", // String. userId of the user that updated the device is also returned with the response
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
    "deviceId": "1234-1234-1234", // String. deviceId is provided by the user and has to be unique. Mandatory. Must be between 10 and 20 characters
    "name": "Device with a specified name 😎", // String. Name is provided by the user, "Unnamed Device" otherwise. Optional. Must be between 10 and 20 characters
}
```

Returns the created device in the following format:
```
{
    "id": "443155a5-5494-4269-84df-fe848b0f2bb0", // String. Autogenerated id of the device is also returned with the response
    "deviceId": "1234-1234-1234", // String
    "name": "Device with a specified name 😎", // String. The name if specified, "Unnamed Device" otherwise.
    "userId": "1234", // String. userId of the user that created the device is also returned with the response
}
```
[More info about --> AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/putitemcommand.html)

### /device/current
#### GET
Endpoint for getting the current readings of a device. Example request path: `/device/current?id=1234`
Gets the current readings of a device with id provided in queryParams. UserId is extracted from the JWT token and checked if it matches the userId of the device to be fetched. Then performs a query on the database to get the latest readings of the device sorted by the timestamp property in the Readings DynamoDB table.

Returns the readings in the following format if any are found:
```
{
    "id": "443155a5-5494-4269-84df-fe848b0f2bb0", // String. id of the reading
    "deviceId": "1234", // String. id of the device
    "timestamp": 153234234, // Int. Represents an unix timestamp
    "light": "1234", // String. Light value of the reading
    "temp": "1234", // String. Temperature value of the reading
    "humidity": "1234", // String. Humidity value of the reading
    "ph": "1234", // String. PH value of the reading
    "waterTemp": "1234", // String. Water temperature value of the reading
}
```

Otherwise returns empty object: ``{}``

[More info about --> AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/ScanCommand/)

### /device/historical
#### GET
Endpoint for getting the historical readings of a device. Example request path: `/device/historical?id=1234&start=1234&end=1234`
Gets the historical readings of a device with id provided in queryParams. UserId is extracted from the JWT token and checked if it matches the userId of the device to be fetched. Then performs a query on the database to get the readings of the device sorted by the timestamp property in the Readings DynamoDB table.
The queryParamteres are for example:
```
{
    "id": "1234-1234-1234", // deviceId of the device
    "start": 1700062429, // Unix timestamp
    "end": 1700062429, // Unix timestamp
}
```
Returns the readings in the following format if any are found:
```
Items: [
    {
        "id": "443155a5-5494-4269-84df-fe848b0f2bb0", // String. id of the reading 
        "deviceId": "1234-1234-1234", // String. deviceId of the device
        "timestamp": 1700062429, // Number. Unix timestamp
        "light": "1234", // String. Light value of the reading
        "temp": "1234", // String. Temperature value of the reading
        "humidity": "1234", // String. Humidity value of the reading
        "ph": "1234", // String. PH value of the reading
        "waterTemp": "1234", // String. Water temperature value of the reading
    },
    {
        "id": "443155a5-5494-4269-84df-fe848b0f2bb0", // String. id of the reading
        "deviceId": "1234", // String. id of the device
        "timestamp": 1700062429, // Number. Unix timestamp 
        "light": "1234", // String. Light value of the reading
        "temp": "1234", // String. Temperature value of the reading
        "humidity": "1234", // String. Humidity value of the reading
        "ph": "1234", // String. PH value of the reading
        "waterTemp": "1234", // String. Water temperature value of the reading
    },
    {...}
],
Count: 2 // Number. The number of items in the Items array.
LastEvaluatedKey: 443155a5-5494-4269-84df-fe848b0f2bb0 /* String. The primary key of the item where the operation stopped, inclusive of the previous result set. Use this value to start a new operation, excluding this value in the new request. /*

```

Otherwise returns empty array: ``[]``

[More info about --> AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/dynamodb/command/ScanCommand/)

### /user
#### PATCH
Endpoint for updating a user. Example request path: `/user?id=1234`
Updates a user with userId provided in queryParams and user properties to update in body.
An example of a user object body:
```
{
    "username": "Username updated.", // String. Username is provided by the user. Optional. Must be between 3 and 20 characters
    "email": "Email updated.", // String. Email is provided by the user. Optional. Must be between 7 and 30 characters. Must be a valid email format
    "firstName": "User updated.", // String. FirstName is provided by the user. Optional. Must be between 3 and 20 characters
    "lastName": "User updated.", // String. LastName is provided by the user. Optional. Must be between 3 and 20 characters
}
```
And the output if successful is the updated user object with all properties (except password):
```
{
    "id": "443155a5-5494-4269-84df-fe848b0f2bb0", // String. The id of the user is also returned with the response
    "username": "Username updated.", // String. Updated username or old username if not updated.
    "email": "Email updated.", // String. Updated email or old email if not updated.
    "firstName": "User updated.", // String. Updated firstName or old firstName if not updated.
    "lastName": "User updated.", // String. Updated lastName or old lastName if not updated.
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
Logs in a user with username and password provided in body. If successful returns a JWT token.
An example of a user object body:
```
{
    "username": "Username", // String. Username is provided by the user. Mandatory.
    "password": "Password.", // String. Password is provided by the user. Mandatory.
}
```
And the response is a JWT Token containing the user information (everthing except password is contained in the token) that has an expiration time of 1hr

[More info about --> JWT Tokens](https://jwt.io/)

### /user/register
#### POST
Endpoint for registering a user. Example request path: `/user/register`
Registers a user with email, password, username, firstName and lastName provided in body. Decrypts the password and stores it in the database using bcrypt.
An example of a user object body:
```
{
    "email": "Email updated.", // String. Email is provided by the user. Mandatory. Must be between 7 and 30 characters. Must be a valid email format
    "password": "Password updated.", // String. Password is provided by the user. Mandatory. Must be between 6 and 20 characters
    "username": "Username updated.", // String. Username is provided by the user. Mandatory. Must be between 3 and 20 characters
    "firstName": "User updated.", // String. FirstName is provided by the user. Mandatory. Must be between 3 and 20 characters
    "lastName": "User updated.", // String. LastName is provided by the user. Mandatory. Must be between 3 and 20 characters
}
```
And the response is a JWT Token containing the user information (everthing except password is contained in the token) that has an expiration time of 1hr

[More info about --> JWT Tokens](https://jwt.io/)

# Authors
```
Stefan Georgiev (304284)
Yoana Miteva ()
```
