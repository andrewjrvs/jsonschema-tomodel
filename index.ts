import * as fs from 'fs';
import { languageType } from './models';
import { JSONSchema } from 'json-schema-typed'
import * as flUtil from './file';
import { generate } from './generate';

const languages: {[key: string]: languageType} = {
    "typescript" : {
        instance: {
            access_modifiers: 'public'
            , keywords: {
                keyword: 'class',
                extends: 'extends'
            }
        },
        property: {
            access_modifiers: ['public', 'private']
        }
        , process(value: string, obj: any, schema: JSONSchema): any {
            return obj;
        }
        , fileTemplate: [
            `{{imports}}`
            , ``
            , `{{instances}}`
        ]
        , instanceTemplate: [
            `{{comments}}`
            , `{{decorators}}`
            , `export {{keywords}} {{name}} {{extends}} {`
            , ` {{properties}}`
            , ` {{init}}`
            , ` {{methods}}`
            , `}`
        ]
        , importTemplate: [
            `import { {{name}} } from './{{path}}'`
        ]
        , methodTemplate: [
            `{{access}} {{name}} (): {{type}} {`
            , `   {{content}}`
            , `}`
        ]
        , propertyTemplate: [
            `{{access}} {{name}}: {{type}};`
        ]
    }
}


// const textFile = fs.readFileSync(__dirname + "/textFile.txt", "utf8");
const JsonSchemaTxt = fs.readFileSync(__dirname + "/json-schema/Common/Thing.json", "utf8");
const JsonSchema = JSON.parse(JsonSchemaTxt) as JSONSchema;
//console.log(JsonSchema);
const fl = flUtil.generatefile(JsonSchema, languages.typescript);
console.log(fl);
console.log(fl.instances[0]);
console.log(generate(fl, languages.typescript));