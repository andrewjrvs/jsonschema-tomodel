import * as models from './models';
import { JSONSchema } from 'json-schema-typed'


export function generatefile(schma: JSONSchema, lang: models.languageType): models.File {
    let rtnFile: models.File = {}
    rtnFile = generateFileWithInstance(rtnFile, schma, lang);


    return rtnFile;
}

function generateFileWithInstance(file: models.File, schma: JSONSchema, lang: models.languageType): models.File {
    let rtnFile: models.File = Object.assign({}, file);

    rtnFile.instances = [];
    //for(const instKey in schma.properties) {
        // const instSchma: JSONSchema = schma.properties[instKey] as JSONSchema;
        const instSchma: JSONSchema = schma as JSONSchema;
        let newInst: models.Instance = {};
        newInst.name = lang.process('instanceName', instSchma.title, instSchma);
        newInst.access_Modifier = lang.process('instanceAccessModifier', 'public', instSchma);
        newInst.keywords = [];
        newInst.keywords.push(lang.instance.keywords.keyword);
        newInst = generateInstanceWithProperties(newInst, instSchma, schma, lang);
        rtnFile.instances.push(newInst);
    //}
    
    return rtnFile;
}


function generateInstanceWithProperties(instance: models.Instance, instSchma: JSONSchema, schma: JSONSchema, lang: models.languageType): models.Instance {
    let rtnInst: models.Instance = Object.assign({}, instance);

    rtnInst.properties = [];
    for(const propKey in instSchma.properties) {
        const propSchma = instSchma.properties[propKey] as JSONSchema;
        let newProp: models.Property = {};
        newProp.name = lang.process('propName', propKey, propSchma);
        newProp.access_Modifier = lang.process('propertyAccessModifier', 'public', propSchma);
        newProp.type = lang.process('propertyType', propSchma.type, propSchma);
        newProp.keywords = [];
        rtnInst.properties.push(newProp)
    }

    return rtnInst;
}