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

# Authors
```
Stefan Georgiev (304284)
Yoana Miteva ()
```
