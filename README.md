# webrcli

[EXPERIMENTAL] Do not use in prod

cli tools for building node project with webr inside

## Install

```bash
npm install -g spidycli
```

## Get version

```bash
spidycli --version
```

## Init a project

- Initiate and configure a project:

```bash
spidycli init ./mywebrapp
```

## Command line tools

- Download a webR compiled package and its dependencies:

```bash
spidycli install cowsay
```

- Read a DESCRIPTION file and build the webR package library

```bash
spidycli installFromDesc $(pwd)/rfuns/DESCRIPTION
```

## Working example

```bash
cd /tmp
spidycli init cowsaywebr
cd cowsaywebr
spidycli install cowsay
```

Modify the index.js with this line juste before the end of the function

```javascript
await globalThis.webR.evalR('cowsay::say("Hello from R!")');
```

Then run

```bash
node index.js
```


