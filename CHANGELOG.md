## [2.0.1](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/compare/v2.0.0...v2.0.1) (2023-10-04)


### Bug Fixes

* **package.json & .husky hooks:** fixing an error indicating there are no src/*.ts files ([a7e9a60](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/a7e9a60a80cac55adaf593fba64d3ba0e3030881))
* **theme:** fixing theme dialog, global theme ([bd124d0](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/bd124d0decffd1577083c45625456ed34f7ae2f9))

# [2.0.0](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/compare/v1.0.0...v2.0.0) (2023-09-30)


### Bug Fixes

* amplify Buld fails, trying to resolve it ([dd946c2](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/dd946c2975d21334ceb9d9bc7335b14788a3a7c3))
* **backend > lambda > devicecontroller, deviceservice, apierror:** better error handlin, service fix ([8950316](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/8950316788be52f2ad30d5cbb56c512e386d3d5b))
* **backend > lambda > deviceservice.js:** fixing some wrong implementation regarding methods ([b75308c](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/b75308cfc336d35a39e8d3baf03fcfc8fb26f5c4))
* **backend > lambda > deviceservice:** fixing passing string to limit instead of number ([3deb39d](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/3deb39dca6163bcc0f3009b86e016527ebdfd137))
* **backend > lambda > deviceservice:** fixing typo in the imports regarding DynamoDBError ([d3748c0](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/d3748c0e806d00d80d4e4d1bef33daf8172ef5f7))
* **backend > lambda function:** writing code to fix lambda function ([5cb3b5e](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/5cb3b5e1c0c480db32671bd4fca88afece17886a))
* **backend > lambda:** deviceService.js > getAllDevices now is expecting a start from query params ([2c9ef25](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/2c9ef256503ab75608406c0b24b6a09ae3e4b17a))
* **backend:** trying to fix lambda function ([fd2b13a](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/fd2b13a126bea8188feb799908a623ed5018d6a8))
* **deviceservice.js:** fixing error with dynamoDb causing a massive timeout ([245a224](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/245a224ca4f7ef4cb7b0ae6a16ba803782ad3e1e))
* **deviceservice:** fixing wrong DB name in deviceService ([507b4a1](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/507b4a17bd65384794ab79d366c8caa681677712))
* fixing build error due to .NET 6 supposedly missing ([ea61322](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/ea613228dcf2959a583c9003413fe742a5c56a90))
* **lambda function backend:** stable commit for lambda function backend. Succesfully getting item ([cbac15c](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/cbac15c019ad69488ee78a18e510f089634d38da))
* **lambda function:** deviceService is now passing TableName correct ([cd50215](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/cd50215d24a7a4722394aabe2679f3d1cb86a4f6))
* **lmabda function:** now passing event instead of req, res ([537dd2a](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/537dd2aa9040a0f88d58cd0de700c5750ff6b4b8))
* lmadas ([99e47e3](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/99e47e335d2eb6a2c58beb251050eb854d62c3e3))
* **routers dir:** fixing missing /device/{deviceId} ([189b3ca](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/189b3ca4f815b181e5447a3c8dc8508a1964678f))


### Features

* adding user authentication in the form of AWS Cognito ([e28aae4](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/e28aae463a9808139226036b135d9549d57e8b4f))
* **amplify:** adding AWS Amplify to repository ([5a0f540](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/5a0f540ab9a9174effd7338e3358ff4cb35fa8bc))
* api ([4951b9e](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/4951b9eb71a3b86e93c1dc4e9bc23ab581e70de7))
* **bpr2lambda1 in the backend:** adding some serverless functionality. Router, Controller, Service ([77a41d7](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/77a41d796975ca43d9aa71a0cead44ef4e382287))
* **lambda backend:** adding logger, custom apiErrorHandler middleware and fixing small issues ([0834dc1](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/0834dc1ef431d6cc5ac372ec92ab38519d57840d))
* **lambda backend:** adding marshall, unmarshall from aws-sdk/utils ([b791d8c](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/b791d8c270b2a6afaa19268c3f74e97c7f2844b7))
* **lambda backend:** adding patch, delete & modifying existing get all methods ([855deff](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/855deff2141dc2c99564a49e198b44f939de9b38))


### BREAKING CHANGES

* **lambda backend:** Application is now pressumably untested. Needs testing. Testing locally not
initialized due to AWS Credentials and local DynamoDB not configured.

# 1.0.0 (2023-09-22)


### Bug Fixes

* **package.json & storybook related files:** fixing issues: storybook freezing and 2 react instances ([6583ddc](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/6583ddca12e7c13b8fa0196d634ce10b86b49871))
