# webrcli

[EXPERIMENTAL] Do not use

cli tools for building node project with webr inside

## Install

```bash
npm install -g webrcli
```

## Get version

```bash
webrcli --version
```

## Init a project

- Initiate and configure a project:

```bash
webrcli init mywebrapp
```

## Command line tools

- Download a webR compiled package and its dependencies:

```bash
webrcli install cowsay
```

- Read a DESCRIPTION file and build the webR package library

```bash
webrcli installFromDesc $(pwd)/rfuns/DESCRIPTION
```

## Other functions

- `webrcli installFromPackageJson` used when running `npm start`, so you probably do not need to use it manually. This function takes a `package.json` file with an `rdependencies` entry and install the packages listed there.

## Working example

```bash
cd /tmp
webrcli init cowsaywebr
cd cowsaywebr
webrcli install cowsay
```

Add to your index.js

```javascript
// At the top of the script
const { library } = require('spidyr');

const cowsay = await library("cowsay");
await cowsay.say("Hello world");
```

Then, back to your console :

```bash
npm start
```


