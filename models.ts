import { JSONSchema } from 'json-schema-typed'

export interface languageType {
    instance: {
        access_modifiers: string | string []
        keywords: {
            'keyword': string
            'extends' : string
        }
    }
    property: {
        access_modifiers: string | string []
    }
    process(value: string, obj: any, schema: JSONSchema): any
    fileTemplate: string[]
    instanceTemplate: string[]
    propertyTemplate: string[]
    methodTemplate: string[]
    importTemplate: string[]
}

export interface File {
    includes?: any[]
    meta?: any[]
    instances?: any[]
    path?: string
    comments?: string[]
}

export interface Common {
    access?: string
    keywords?: string[]
    name?: string
    decorators?: string[]
    comments?: string[]
}

export interface Instance extends Common {
    extends?: string | string[]
    init?: string[]
    properties?: Property[]
    methods?: any[]
}

export interface Property extends Common {
    type?: string;
    value?: string;
}