import * as fs from 'fs';
import * as path from 'path';
import _ from "lodash";

export const getFile = (file) => {
    const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
    return JSON.parse(fs.readFileSync(`${filePath}`));
}

export const parseFiles = (data1, data2) => {
    const keys = Object.keys({...data1, ...data2});
    const sortedKeys = _.sortBy(keys);
    const result = {};
    sortedKeys.map((key) => {
        const value1 = data1[key];
        const value2 = data2[key];
        if (!_.has(data1, key)) {
            result[`+ ${key}`] = `${value2}`
        } else if (!_.has(data2, key)) {
            result[`- ${key}`] = `${value1}`
        } else if (!_.isEqual(value1, value2)) {
            result[`- ${key}`] = `${value1}`
            result[`+ ${key}`] = `${value2}`
        } else {
            result[`  ${key}`] = `${value1}`
        }
    })
    const replaceSigns = (obj) => {
        obj = JSON.stringify(obj, null, 2);
        obj = obj.replaceAll(/"/g, '');
        obj = obj.replaceAll(/,/g, '');
        return obj;
    }
    return replaceSigns(result);
}
