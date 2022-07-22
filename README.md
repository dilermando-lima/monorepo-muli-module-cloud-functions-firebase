# MONOREPO MUILTMODULE CLOUD FUNCTIONS FIREBASE

## About

This project is an example that handle multiple modules in monorepo with `npm workspaces` using `firebase cloud functions` that can consume modules.
We are using `typescript` to code all solution.

  * [Requirements](#requirements)
  * [Project Architecture](#project-architecture)
  * [Preparing enviromment](#preparing-enviromment)
  * [Some custom npm scripts](#some-custom-npm-scripts)
  * [Running firebase emulator and request functions](#running-firebase-emulator-and-request-functions)

## Requirements

It's required to install [`node.js`](https://nodejs.org/en/) and create any account in [`firebase console`](https://console.firebase.google.com/) 

See more details in https://firebase.google.com/docs/functions/get-started

## Project Architecture 

This project has 2 modules to cover `firebase cloud functions` and 1 module to cover an example module to be imported. We can see all workspace hierarchy running `npm ls`

```bash
# output from 'npm ls' ( required run 'npm install' before )

wp@1.0.0
│
├──┬── apia@1.0.0 -> ./functions/apia
│  ├───── firebase-admin@10.3.0
│  ├───── firebase-functions@3.22.0
│  ├───── string-module@1.0.0 deduped -> ./string-module
│  └───── typescript@4.7.4
│
├──┬ apib@1.0.0 -> ./functions/apib
│  ├───── firebase-admin@10.3.0 deduped
│  ├───── firebase-functions@3.22.0 deduped
│  ├───── string-module@1.0.0 deduped -> ./string-module
│  └───── typescript@4.7.4 deduped
│
└──┬ string-module@1.0.0 -> ./string-module
   └──── typescript@4.7.4 deduped

```
Project files summarized bellow

```bash
.
│ 
├── functions
│   ├── apia      # example MODULE for function APIA
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │ 
│   └── apib      # example MODULE for function APIB
│       ├── index.ts
│       ├── package.json
│       └── tsconfig.json
│ 
├── string-module # example MODULE to be imported
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
│ 
├── .firebaserc   # firebase project settings
├── firebase.json # firebase settings to describe funtion modules
├── package.json  # npm configuration to handle all workspace command
└── tsconfig.json # tsconfig parent will be extended and overrided for all tsconfig modules

```


> Note: each module has a `tsconfig.json` extends `tsconfig.json` from root project and all module has its own `package.json` to handle its own dependencies
## Preparing enviromment

Download this project

```bash
git clone https://github.com/dilermando-lima/monorepo-muli-module-cloud-functions-firebase.git
```

Check `node` and `npm` version

```bash
node --version
npm --version # required ^16
```
Install firebase tools

```bash
sudo npm install -g firebase-tools
```

Login firebase 

```bash
firebase login
```

Jump into project folder and run in root path

```bash
npm install # install all project dependencies
npm run build:wp # build all modules in workspace

```

>Note: There is no valid `firebase project` added into `./.firebaserc` to add your project use `firebase use --add` and choose your `firebase project` then check if `./.firebaserc` is good as you prefer


## Some custom npm scripts

In `./package.json` places in root folder we have some `npm` command to be used on managing  workspace' modules

```bash

# clean typescript builts in all  workspace' modules
npm run build:clean:wp

# build all modules
npm run build:wp

# clean build modules then build them
npm run build:hard:wp

# build all modules and watching all of them in background
npm run build:watch:bkg:wp

# cleaning current dependencies then reinstall them
npm run install:hard

# run build wactinh and start firebase emulator
npm run serve:wp


```

## Running firebase emulator and request functions

If you used to code on vscode, all `.vscode/launch.json` is prepared to debug application
If you wanna try on command line try:
```bash
# rebuild modules and start watching any changes on development
npm run build:watch:bkg:wp

# start emulator with all available functions
firebase emulators:start --only functions
```

> Note: the two command bellow is already covered in `npm run serve:wp`

After start up emulator we can see all functions available on console, try request:

  - http://localhost:5001/{your-project}/{your-region}/funcA ( from module ./functions/apia/ )
  - http://localhost:5001/{your-project}/{your-region}/funcB ( from module ./functions/apib/ )








