# [4.0.0](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/compare/v3.0.0...v4.0.0) (2023-10-08)


### Bug Fixes

* **backend > lambda > controllers:** fixing delete an user or device. Now just returning 204 ([34fc658](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/34fc6581ea3f795580ee883d6d020cd521d48e50))
* **backend > lambda > passport.js:** fixing a mistyped import ([68c0357](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/68c035789d6ae1f5012fbb900f64702e2e0b3327))
* **backend > lambda > passport.js:** fixing wrong import ([6293b10](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/6293b1065f98a217cdc3367586e292817fea0d30))
* **backend > lambda > passport:** fixing wrong import in config/passport.js ([b6bf804](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/b6bf80496782eab328e94b128ea08cd1f7f09136))
* **backend > lambda > services:** deviceService & userService method changes ([78ac5bf](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/78ac5bf1ba7d5d94d7c9c4c1a034fc698be87f8f))
* **backend > lambda > userservice:** adding KeyConditionExpression to the QueryCommand ([dfb241c](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/dfb241c610b567275b58e4926e725bf47f0d62f8))
* **backend > lambda > userservice:** fixing checkIfUsernameExists function. Specifically QueryComman ([5a6a4be](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/5a6a4be808f2d2374f9347d8b6395d07aff714b4))
* **backend > lambda > userservice:** fixing checkIfUsernameExists method QueryCommand ([24e3d61](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/24e3d615075dd9f1172cf3333bff220c01d3f7da))
* **backend > lambda > userservice:** fixing checkIfUsernameExists method QueryCommand ([64f1d8d](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/64f1d8d8c56be9631ac7ad01fead10becc5bc9e0))
* **backend > lambda > userservice:** fixing checkIfUsernameExists method QueryCommand ([8f1434c](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/8f1434c6f7166488777af34e6244c310cbdc6e0c))
* **backend > lambda > userservice:** fixing checkIfUsernameExists method QueryCommand fix ([abaf2b4](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/abaf2b4cc529d99e9f38e2027164be32305a4fc4))
* **backend > lambda > userservice:** fixing checkIfUsernameExists QueryCommand ([deb7539](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/deb7539aaa94952be1d2982dcd70273fea71d428))
* **backend > lambda > userservice:** fixing checkIfUsernamExists method QueryCommand ([a8a59b6](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/a8a59b6518881a63ef3f1b960b3e26d77d023af4))
* **backend > lambda:** adding some devDeps to fix @mapbox/node-pre-gyp missing error in Amplify CI ([44c7420](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/44c742033ecbe4314905a3ee3cebd97c5850a0ce))
* **backend > lambda:** changes to controllers, changes to userService service ([47365e1](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/47365e10df57628d93224e93ec7df0f19e6ed1cc))
* **backend > lambda:** removing redundant packages. Fixing huge error with JS when there is no *.js ([b68c500](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/b68c500344a4ae1c9258303344bf5672fb957a00))
* **bpr2lambda1:** fixing aws-asset-path to lambda funciton source code ([42642eb](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/42642ebe86b741e7528b9808b0e8b93bd0fcbc79))
* fixing path to lambda function ([c2e63d9](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/c2e63d9aae7aed5277dbdb04cc1cdfd094aaf369))
* fixing wrong pathing to lambda function in cloudformation-template ([85f5227](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/85f52275b8f8071ced336dca4da465fb2de78a7f))
* **lambda\:** changes to services. Naming change in deviceController ([feafdbb](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/feafdbbd62e620346303f2920595e4bd1cc5f30a))
* **lambda:** deviceService fixes in get current & historical readings ([5042a23](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/5042a2383f0629041e264aea9d07be27379aaf92))
* **lambda:** deviceService fixing ht getCurrentReadings showing the latest instead of the newest ([e368df1](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/e368df192c22164ba604ba69e50c35bd040095b4))
* **lambda:** fixing a wrong implementation of the authenticated user object ([80e546e](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/80e546e6f4fdf5b83d9897de696194849444d2f7))
* **lambda:** fixing updateUserById function. Now utilizing the UpdateItemCommand ([dfed6d6](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/dfed6d6ef66040d300597efcca540dd597216178))
* **lambda:** fixing wrong reference to queryParam in deviceController. Adding debug points ([9c91426](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/9c914262cea10d79db911cbf7077b262c485b1de))
* **lambda:** passport.js now correctly calls the checkIfUsernameExists method ([ca5fb29](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/ca5fb297e2cee8aef18bbf80b3cf4ab2a23f56c8))
* **lambda:** userService.js now does not need GetItemCommand ([c380b03](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/c380b03f4eef01f2e8a80ff913d5f5c09234b59f))
* **lmabda > userservice:** fixing promise in userToCreate object ([6d638cd](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/6d638cdb7c81b092fd0e53cdbb42c7bf57b43e02))
* **userservice:** fixing finally the checkIfUsernameExists method ([7bed480](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/7bed480e6a962844927c4b05da25aa19c5df0c67))


### Features

* **amplify > backend > lambda:** user path, Changes in Device path ([1e9a1ac](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/1e9a1ac85aad73b70fd5f92b95a5d523138c50f2))
* **backend > lambda:** adding jwtStrategy. Adding authentication to router paths ([010bfa8](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/010bfa8a5b5a3a991788e110ce78dd60b3d2e923))
* **lambda:** changes to controllers, services, apiErrorHandler, config/passport, event.json ([ac997d9](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/ac997d90f31c4b29282544cc4fa1b3a26cf80520))


### BREAKING CHANGES

* **lambda:** No longer token in headers. Now instead we are sending the JWT in the Authorization
header.

# [3.0.0](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/compare/v2.0.1...v3.0.0) (2023-10-08)


### Bug Fixes

* **backend > lambda > controllers:** fixing delete an user or device. Now just returning 204 ([6813add](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/6813addca5bccec3862213f6c08289a0c8bafc97))
* **backend > lambda > passport.js:** fixing a mistyped import ([2cdbf5d](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/2cdbf5d29d49e2098cc47b48e2a2f77e9337d7f2))
* **backend > lambda > passport.js:** fixing wrong import ([ee8b6ab](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/ee8b6abf1bfd3186f61b223091d19d04d7e57ad7))
* **backend > lambda > passport:** fixing wrong import in config/passport.js ([b5057f1](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/b5057f1127ff8535277b1b9e3b4ec327be0b0567))
* **backend > lambda > services:** deviceService & userService method changes ([7ae28bf](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/7ae28bf84cda25167ad651d3b88010bee23fe4a6))
* **backend > lambda > userservice:** adding KeyConditionExpression to the QueryCommand ([6269b18](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/6269b18cc57e926ec47fcdf83174efcb611e6ec6))
* **backend > lambda > userservice:** fixing checkIfUsernameExists function. Specifically QueryComman ([f42fd91](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/f42fd9197f60b1572481892d5367cc094a2ec7f4))
* **backend > lambda > userservice:** fixing checkIfUsernameExists method QueryCommand ([f6017a9](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/f6017a9772a9dd318e7fdcddcb0b3b3fbf8cddd6))
* **backend > lambda > userservice:** fixing checkIfUsernameExists method QueryCommand ([256d6de](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/256d6de1ada25623ccd14d7dcf248a3941b2541a))
* **backend > lambda > userservice:** fixing checkIfUsernameExists method QueryCommand ([32d2963](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/32d29638f2b97315ab8d68d4eeab7e5454b23f4a))
* **backend > lambda > userservice:** fixing checkIfUsernameExists method QueryCommand fix ([a7b6712](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/a7b6712380e71c93758138c86d293c8b67d71030))
* **backend > lambda > userservice:** fixing checkIfUsernameExists QueryCommand ([d6850f9](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/d6850f99ec1b87d50e3709a17362b0418a8963bf))
* **backend > lambda > userservice:** fixing checkIfUsernamExists method QueryCommand ([83aaaa7](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/83aaaa7e01aaf404fd6b8932add043c44d3bc7f8))
* **backend > lambda:** adding some devDeps to fix @mapbox/node-pre-gyp missing error in Amplify CI ([057e21d](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/057e21dcdaea26ebeace9aa3e709b4524529f68c))
* **backend > lambda:** changes to controllers, changes to userService service ([db2ed2e](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/db2ed2ef81a942b6dcc261bf2b24b25f20b97d94))
* **backend > lambda:** removing redundant packages. Fixing huge error with JS when there is no *.js ([fa22d66](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/fa22d66f4155e4e9aabe694263a070857eb878b2))
* **lambda\:** changes to services. Naming change in deviceController ([3504730](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/35047305fbfb6b4c9bb2b45c8ef00f6baff73ddd))
* **lambda:** deviceService fixes in get current & historical readings ([3092a0c](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/3092a0c2a72041d7657865ea04fdb93bad59cd37))
* **lambda:** deviceService fixing ht getCurrentReadings showing the latest instead of the newest ([188ec4a](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/188ec4a460c03ae62afff2ba0e2bfd0da3f8b702))
* **lambda:** fixing a wrong implementation of the authenticated user object ([71f9ad1](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/71f9ad141398abb522bb3ad02796906ceeca9405))
* **lambda:** fixing updateUserById function. Now utilizing the UpdateItemCommand ([3fdb3e2](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/3fdb3e274eb88882ffc56686a30c6913172c85c9))
* **lambda:** fixing wrong reference to queryParam in deviceController. Adding debug points ([8bffe68](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/8bffe68b24035379d21d3979c8af603b0d466a96))
* **lambda:** passport.js now correctly calls the checkIfUsernameExists method ([0be5047](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/0be50473b037ead0f2dcb26e98fc09158dbb93ca))
* **lambda:** userService.js now does not need GetItemCommand ([df95099](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/df9509929dc4493a9854fcb5fcdbd761805a11ac))
* **lmabda > userservice:** fixing promise in userToCreate object ([f4ecb56](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/f4ecb569e5553b6cb3414584698a43867128b29e))
* **userservice:** fixing finally the checkIfUsernameExists method ([c2644da](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/c2644da6d6700db3ab8f83e1271d42da50d37baf))


### Features

* **amplify > backend > lambda:** user path, Changes in Device path ([76c08c6](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/76c08c616cf751496c39e20b5206e238c8dc2a5e))
* **backend > lambda:** adding jwtStrategy. Adding authentication to router paths ([3123776](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/312377636c51d085b0431af09b1dbf8a015aaa9d))
* **lambda:** changes to controllers, services, apiErrorHandler, config/passport, event.json ([e135e13](https://github.com/Automating-Hydroponics-BPR2/via-sem7-bpr2-client/commit/e135e139240c3cffd7c3ccbc5b55bbc21942cb95))


### BREAKING CHANGES

* **lambda:** No longer token in headers. Now instead we are sending the JWT in the Authorization
header.

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
