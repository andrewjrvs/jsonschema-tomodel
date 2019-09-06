import * as models from './models';

export function generate(file: models.File, lang: models.languageType): string {
    const rtnFile: string[] = [];

    for(let i = 0, len = lang.fileTemplate.length; i < len; i++) {
        let tmpString = lang.fileTemplate[i];
        for (const flKey in file) {
            if (flKey === 'instances') {
                let instTempString = '';
                for (let j = 0; j < file.instances.length; j++){
                    instTempString += generateInstance(file.instances[j], lang);
                }
                tmpString = tmpString.replace(`{{${flKey}}}`, instTempString)
            } else {
                tmpString = tmpString.replace(`{{${flKey}}}`, file[flKey])
            }
        }
        rtnFile.push(tmpString);
    }//next i

    return rtnFile.join('\r\n');
}


function generateInstance(instance: models.Instance, lang: models.languageType): string {
    const rtnInstance: string[] = [];
    
    for(let i = 0, len = lang.instanceTemplate.length; i < len; i++) {
        let tmpString = lang.instanceTemplate[i];
        for (const instKey in instance) {
            if (instKey === 'keywords') {
                tmpString = tmpString.replace(`{{${instKey}}}`, instance[instKey].join(' '))
            } else {
                tmpString = tmpString.replace(`{{${instKey}}}`, instance[instKey])
            }
        }
        rtnInstance.push(tmpString);
    }//next i

    return rtnInstance.join('\r\n');
}