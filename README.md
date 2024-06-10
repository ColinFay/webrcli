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

Modify the index.js with this line juste before the end of the function

```javascript
await globalThis.webR.evalR('cowsay::say("Hello from R!")');
```

Then run

```bash
npm start
```


