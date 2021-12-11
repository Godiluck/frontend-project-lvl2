#!/usr/bin/env node

import {program} from "commander";
import {getFile, parseFiles} from "./func.js";


program
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .option('-V, --version', 'output the version number')
    .action((filepath1, filepath2) => {
        const data1 = getFile(filepath1)
        const data2 = getFile(filepath2)
        const parsedJson = parseFiles(data1, data2)
        console.log(parsedJson)
    })

program.parse();