# Test with Mocha and Playwright

- [Test with Mocha and Playwright](#test-with-mocha-and-playwright)
  - [Installation](#installation)
    - [Adding node packages](#adding-node-packages)
  - [Prerequisites](#prerequisites)
    - [nvm](#nvm)
      - [For Linux](#for-linux)
      - [For Mac](#for-mac)
      - [For Windows](#for-windows)
  - [Setup](#setup)
  - [Test](#test)
    - [UI tests - Headless mode](#ui-tests---headless-mode)
    - [Run specific tests by file or directory](#run-specific-tests-by-file-or-directory)
    - [Run tests in parallel](#run-tests-in-parallel)
    - [Watch a test file](#watch-a-test-file)
    - [Test report](#test-report)
  - [Lint and Format](#lint-and-format)
  - [Structure](#structure)
    - [Artifacts](#artifacts)
    - [Config](#config)
    - [Constants](#constants)
    - [Scripts](#scripts)
    - [Services](#services)
    - [Pages](#pages)
    - [Tests](#tests)

This project runs on [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/getting-started) for package management.

It uses [Mocha](https://mochajs.org/) for the test framework and [Chai](https://mochajs.org/) to perform test assertions, [playwright](https://playwright.dev/docs/intro) for ui testing and [axios](https://axios-http.com/) as an http client for making http or service requests to test.

See [structure](#structure) for a description of the test project structure.

## Installation

Have [nvm](https://github.com/nvm-sh/nvm) installed to make it easier to manage node from your local environment. Yarn is also required to be installed with node and npm. Later versions of node should include yarn by default, if not, follow the install steps from the [prerequisites](#yarn).

```bash
nvm use
yarn ci
```

### Adding node packages

Using [yarn install](https://classic.yarnpkg.com/en/docs/cli/install) is used to install all dependencies from this package.

To [add](https://classic.yarnpkg.com/en/docs/cli/add), use `yarn add -D { package-name }` for adding new packages and;

`yarn upgrade { package-name }@{ version-number }` for [upgrading](https://classic.yarnpkg.com/lang/en/docs/cli/upgrade/) existing packages.

## Prerequisites

### [nvm](https://github.com/nvm-sh/nvm)

#### For Linux

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# check nvm installed
nvm

# install node
nvm install 16.13.0

# install yarn globally
npm install -g yarn

# check yarn working properly
yarn --version
```

#### For Mac

```
brew install nvm
nvm install `cat .nvmrc`
nvm use `cat .nvmrc`
```

#### For Windows

Download the setup.zip file from the [latest release](https://github.com/coreybutler/nvm-windows/releases), extract and run setup as administrator.

**Run terminal as administrator to run and use nvm.**

```bash
# check nvm installed
nvm

# install node
nvm install 16.13.0

# install yarn globally
npm install -g yarn

# check yarn working properly
yarn --version
```

## Setup

To set up the project, install the npm packages by running

```bash
yarn ci
```

## Test

To run all tests:

```bash
yarn test-ui tests
```

### UI tests - Headless mode

By default, UI tests are running on browsers in non-headless mode (browser visible). To have the tests running in headless mode (no browser visible), use the `headless` suffixed yarn scripts. ie

```bash
yarn test-ui-headless tests
```

### Run specific tests by file or directory

You can run a specific test by passing a test file or folder to the test:ui script. eg:

If you have a test structure like:

```
|-- test
|   |-- scenario1
|       |-- file-1a.test.js
|       |-- file-1b.test.js
|   |-- scenario2
|       |-- file-2a.test.js
```

```bash
# running test-ui script passing a directory
yarn test-ui test/scenario1
# will run file-1a and file-1b tests

# running test-ui script passing a file
yarn test-ui test/scenario2/file-2a.test.js
# will run file-2a test
```

### Run tests in parallel

You can run all the tests in parallel by using the parallel script. Other scripts have a parallel variant if you need to run specific test files or directory with test-ui by adding -parallel `yarn test-ui-parallel`.

```bash
# adding -parallel to test-ui will run all tests under test/scenario1 in parallel
yarn test-ui-parallel test/scenario1

```

### Watch a test file

You can have a test or sets of tests to automatically rerun after saving your changes by providing a directory, file or list of both to the watch option.

```bash
yarn test-ui-watch test/scenario1/file-1a.test.js
```

### Test report

There is an html report generated after every run of our tests. These are saved under the `artifacts/report` folder. This should provide additional resource for reviewing the test results outside of the test runner from the console.

## Lint and Format

Formatting and linting of source files are enforced by [eslint](https://eslint.org/docs/about/) and [prettier](https://prettier.io/).

Most editors can integrate directly with these tools, so that files will be checked and formatted.

> On install of local dependencies `yarn install`, a git pre-commit hook will be added from [githooks](scripts/githooks/pre-commit).
> This will run steps similar to `yarn lint-pretty` for the files to be committed.

> **WARNING**: You can add **--no-verify** on your git commit to bypass the pre-commit hook... If you don't use it, that will be the end of it. I will not look for you, I will not pursue you... but if you do, I will look for you, I will find you... and I will kill you.

Before then, the IDE will highlight issues and errors based on rules that were set in [.eslintrc.json](.eslintrc.json) to be fixed, see eslint [rules](https://eslint.org/docs/rules/). Here are the npm scripts to lint and check formatting:

- `yarn lint-pretty` - see if there are linting issues and what files are not formatted correctly.
- `yarn lint-fix-pretty` - try to fix fixable eslint errors and re-format files in place according to the prettier rules.

## Structure

```
.
|-- test
|   |-- artifacts
|       |-- reports
|           |--report_20420908_121213.html
|   |-- config
|       |-- config.js
|   |-- constants
|   |-- scripts
|   |-- services
|       |-- sample-api-service
|           |-- api-endpoints.js
|           |-- api-endpoints-helper.js
|           |-- index.js
|       |-- aws-utility-service
|           |-- aws.js
|   |-- pages
|       |-- base.page.js
|       |-- store
|           |-- catalog-search.page.js
|           |-- store.page.js
|   |-- tests
|       |-- scenario-group
|           |-- group-1
|               |-- group-1.test.js
|               |-- group-1a.test.js
|           |-- group-2
|               |-- group-2.test.js
|               |-- group-2a.test.js
|-- package.json
|-- *config.json
```

### Artifacts

- Have all test artifacts save here ie test result reports, error screenshots and logs.

### Config

- All test related configurations should live here. Do not confuse with configs for node packages and dependencies like eslint, mocha configs on the main directory.

### Constants

- Contains constants to use for test and function arguments.
- **Example** http response status codes.

### Scripts

- Any scripts we need to run adjacent to our test suite like hooks or running build pipelines.
- Exceptions could be when a build tool requires their scripts on a specific directory eg: github actions requires them to be on a .github directory from the main directory.

### Services

- All services under test and utilities for the test suite are here. If you need to get data from a web service or a configuration or secret from a key store, create a service folder for that resource or purpose here.
- **Example** if you want to read a json file from aws s3, create an aws utility folder here and have an s3.js file that contains methods for getting files from s3 etc.

```
|-- services
|   |-- aws
|       |-- s3.js
|   |-- kafka
|       |-- kafka.js
|   |-- blog-post
|       |-- blog-post.js
|       |-- blog-post-helper.js
|       |-- index.js
```

- **index.js** - Use index to export all files from a directory so there's not much clutter from the import statements when importing a few classes or methods from files spread inside the directory eg:

```
|-- services
|   |-- blog-post
|       |-- blog-post.js
|       |-- blog-post-helper.js
|       |-- index.js
```

```javascript
// blog-post.js

export const blogPostFunction = () => {
  console.log('hello from blog post function');
};
```

```javascript
// blog-post-helper.js

export const blogPostFunctionHelper = () => {
  console.log('hello from blog post function helper');
};
```

```javascript
// index.js

export * from './blog-post';
export * from './blog-post-helper';
```

```javascript
// file.test.js

import { blogPostFunction, blogPostFunctionHelper } from './services/blog-post';
```

### Pages

- Similar to services, all page objects are here. Have each pages represent the tree map of the application.
- Each page is composed of the element selectors and the page actions.

```
|-- pages
|   |-- sample.page.js
```

```javascript
// sample.page.js

import { BasePage } from '@page/base.page';

export class SamplePage extends BasePage {
  #sampleButton = 'button[type="sample"]';
  /**
   * Do some sampling.
   *
   * @returns {Promise<number>}
   */
  async sample() {
    await this.page.click(this.#sampleButton);
  }
}
```

### Tests

- All tests for your application are here. Suffix the test files with .test.js. Try grouping them by logical parts of the application or service.

```
|-- tests
|   |-- blog-posts
|       |-- add-update.test.js
|       |-- delete.test.js
|       |-- get.test.js
```
