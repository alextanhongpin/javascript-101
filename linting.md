To ensure we are all on the same 📃, here's some tools that can improve productivity and maintain consistency in our source code:


## ESLint

[ESLint](https://github.com/eslint/eslint) is an open source JavaScript linting utility originally created by Nicholas C. Zakas in June 2013. Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn't adhere to certain style guidelines.

#### Quick Start

Global installation:

```bash
$ npm install -g eslint
```

Setting up eslint for a project:
```bash
$ eslint --init
```

## StandardJS

[StandardJS](https://standardjs.com/) is a JavaScript style guide, with linter & automatic code fixer. The instructions provided will help you to install the text editor plugins which will automatically format your code, check for unused variables, inconsistent styling, indentation etc. 

TL;DR

Install globally:

```bash
$ npm i -g standard
```

### Sublime Text

> To open the palette, press `ctrl+shift+p` (Win, Linux) or `cmd+shift+p` (OS X)

Using Package Control, install `SublimeLinter` and `SublimeLinter-contrib-standard`.
For automatic formatting on save, install `StandardFormat`.

### Atom

> Open up the Settings View using `Cmd+,`, click on the "Install" tab and type your search query into the box under Install Packages.

Install `linter-js-standard`.
Alternatively, you can install `linter-js-standard-engine`. Instead of bundling a version of standard it will automatically use the version installed in your current project. It will also work out of the box with other linters based on standard-engine.

For automatic formatting, install `standard-formatter`. For snippets, install `standardjs-snippets`.

### Visual Studio Code

> Select Extension (Lowest icon on the left bar). 

Install `vscode-standardjs`. (Includes support for automatic formatting.)

For JS snippets, install: `vscode-standardjs-snippets`. For React snippets, install `vscode-react-standard`.

```js
// Remember to add this to your `Settings.json`
// Turns auto fix on save on or off.
  "standard.autoFixOnSave": false,
```

## [Airbnb](https://github.com/airbnb/javascript)

Airbnb JavaScript style guide. Lots of useful examples and good practices. Read it if you have difficulty 😴 at night. 
