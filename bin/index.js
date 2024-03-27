#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const { install, installFromDesc } = require('../src/install')
const { init } = require('../src/init')
const { installFromPackageJson } = require('../src/installFromPackagejson')

yargs(hideBin(process.argv))
  .command(
    'init <destination_folder>',
    'Init a webr project with webrtools structure.',
    (yargs) => {
      yargs
        .positional('destination_folder', {
          type: 'string',
          default: ".",
          describe: 'Where to init the project.',
        });
    },
    (argv) => {
      init(argv.destination_folder)
    }
  ).command(
    'install <package> [destination_folder]',
    'install package. Think of it as a "npm install" for R packages.',
    (yargs) => {
      yargs
        .positional('package', {
          type: 'string',
          describe: 'package to install',
        })
        .positional('destination_folder', {
          type: 'string',
          default: "./webr_packages",
          describe: 'Where to install the packages',
        });
    },
    (argv) => {
      install(argv.package, argv.destination_folder)
    }
  ).command(
    'installFromDesc <description_file> [destination_folder]',
    'Install dependencies of an R package by reading its DESCRIPTION file.',
    (yargs) => {
      yargs
        .positional('description_file', {
          type: 'string',
          describe: 'Path to the DESCRIPTION file.',
        })
        .positional('destination_folder', {
          type: 'string',
          default: "./webr_packages",
          describe: 'Where to install the packages',
        });
    },
    (argv) => {
      installFromDesc(argv.description_file, argv.destination_folder)
    }
  ).
  command(
    'installFromPackageJson [packageJson] [destination_folder]',
    'Install dependencies from package.json file containing an "rdependencies" entry.',
    (yargs) => {
      yargs.
        positional('packageJson', {
          type: 'string',
          describe: 'Path to the package.json file.',
          default: "package.json",
        })
        .positional('destination_folder', {
          type: 'string',
          default: "./webr_packages",
          describe: 'Where to install the packages',
        });
    }, (argv) => {
      installFromPackageJson(argv.packageJson, argv.destination_folder)
    })
  .parse();