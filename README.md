
**IMPORTANT**: Master branch is the only branch that is guaranteed to be up-to-date.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.4.

# Purpose

This is a ready-to-consume reference application that contains commonly used components in Angular written using best practices. This is intended to allow developers to set up a working production-ready application with minimal coding and minimal set up time.


# Getting Started

- Make sure Node.js is installed. Recommended version - v10.15.3.
- Yarn is the recommended package manager. [Install latest version](https://yarnpkg.com/en/docs/install#debian-stable).
- Make sure Angular-cli is installed. Use `yarn global add angular-cli`
- Clone this repo locally and run `yarn install` in your terminal from within the directory
- Run `yarn mock-api` in your terminal to run the mock API, which is needed for the application to run as intended. The API will run on `http://localhost:8080/`.
- Open a new terminal instance and run `yarn start` to run the UI locally. It will run the UI on `http://localhost:4200/`. The app will automatically recompile and reload if you change any of the source files.

# Features

For a comprehensive and up-to-date listing of features used in this application, visit - https://docs.google.com/document/d/1Durdkqi23tCq6CFDptcCBbKdqiKZZ6w9i6EavfdXkO4/edit?usp=sharing

# Concepts

To use this repository most effectively you will need to be familiar with these tools/concepts on top of being familiar with Angular 2+:-

1. [Angular Feature Modules](https://angular.io/guide/feature-modules)
2. [Lazy Loading of Feature Modules](https://angular.io/guide/lazy-loading-ngmodules)
3. [Global State Management with NGXS](https://ngxs.gitbook.io/ngxs)

# Usage

There are two ways in which this repo can be used:-

1)  **As a starting point for a new application** - In this case, you will clone the repo and change the configurations and modify the code in the application to fit the needs of the application you're developing.
2) **As a reference application** - In this case, you can look into the application code to see how aspects of the UI are written and either replicate the patterns within your application or copy-paste specific code from it into your application.

## Option 1: Use this as a starter application

Using this as a starter application is the easiest and most straightforward way to get started. To do this:-

1. Clone this repo locally and run `yarn install && yarn start` to run the app locally
2. In your editor, do a global search for the term `ng-starter-app` in the project and replace it with the name of your application.
3. You will have to replace the environment variables (including Keycloak URLs, API Gateway URL for each of your environments etc.) in these files - `src/environments/*.ts`
4. Modify the configurations within `src/app/sdk/config/*` and example code to suit your specific use case.


## Option 2: Importing Modules into existing projects

You will find individual features (listed in the doc linked above) in this folder - `src/app/sdk/features`. To import the feature into your existing project:-

1. Create a folder `src/app/sdk` within your project
2. Copy the folder of the feature you wish to import into the folder created in step 1, along with its respective config file if there is any.
3. Open the folder and find the `.md` file there. 
4. In the file you will find a list of dependencies and instructions for integrating the feature into your app. Follow these instructions. 
5. Refer to the implementation in this repo for troubleshooting in case you run into trouble.

Also, if you're copy-pasting only select modules into your project, do the following in your existing project for the components to work:-

1. Make sure to include the relevant dependencies into your `package.json` file
2. Add types module from npm (for instructions, see below).

---

**Instructions to add types module from npm:-**

Step 1: install @types/node with either of the following:

- npm install --save @types/node

Step 2: - edit your src/tsconfig.app.json file and add the following in place of the empty "types": [], which should already be there:

...
"types": [ "node" ],
"typeRoots": [ "../node_modules/@types" ]
...

---


# Support

In case you need assistance setting this up or have any feedback/suggestions, you can reach for support via:

+ Email: __ragavendra.yarasi@ishafoundation.org__
+ [Slack](https://isha-it.slack.com) Display Name: __ragavendra__
=======
# angularstarterapp
Angular Starter App

