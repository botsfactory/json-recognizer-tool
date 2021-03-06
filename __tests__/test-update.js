const jsonTool = require('../index');
const shell = require('shelljs');
const async = require('async');

const exampleObjB = {
    intents: [
        {
            bfId: 'cj7w9hzfb000276jxhuc21qrv',
            regex: '/Hi/',
            intent: 'greeting'
        }
    ]
}

const exampleObjA = {
    intents: [
        {
            bfId: 'cj7w9hzfb000276jxhuc21qrv',
            regex: '/Hello/',
            intent: 'greeting'
        }
    ]
}

describe('Update object in array.', () => {

    it('Should update an object in an array in a JS object.', () => {
        let jsonId = { bfId: 'cj7w9hzfb000276jxhuc21qrv' };
        let updated = jsonTool.updateObjectInArray(jsonId, 'intents', exampleObjA.intents[0], exampleObjB);
        expect(updated).toEqual(exampleObjA);
    });
});

describe('Update object in a JSON file.', () => {

    it('Should update an object in a JSON file.', async (done) => {
        shell.cp('__tests__/ex-1obj.json', '__tests__/ex-1obj_copy.json');

        let jsonId = { bfId: 'cj7w9hzfb000276jxhuc21qrv' };
        let json = await jsonTool.updateObjectInFile(jsonId, exampleObjA.intents[0], 'intents', 'ex-1obj_copy', '__tests__/');
        let file = await jsonTool.getJsonFile('__tests__/', 'ex-1obj2');
        let fileUpdated = await jsonTool.getJsonFile('__tests__/', 'ex-1obj_copy');

        expect(fileUpdated).toEqual(file);

        shell.rm('__tests__/ex-1obj_copy.json');
        done();
    });
});


describe('Update value in array.', () => {

    it('Should update an object in an array in a JS object.', () => {
        let jsonId = { bfId: 'cj7w9hzfb000276jxhuc21qrv' };
        let updated = jsonTool.updateValueInArray(jsonId, 'intents.regex', '/Hello/', exampleObjB);
        expect(updated).toEqual(exampleObjA);
    });
});

describe('Update value in a JSON file.', () => {

    it('Should update an value in a JSON file.', async (done) => {
        shell.cp('__tests__/ex-1obj.json', '__tests__/ex-1obj_copy.json');
        
        let jsonId = { bfId: 'cj7w9hzfb000276jxhuc21qrv' };
        let json = await jsonTool.updateValueInFile(jsonId, '/Hello/', 'intents.regex', 'ex-1obj_copy', '__tests__/');
        let file = await jsonTool.getJsonFile('__tests__/', 'ex-1obj2');
        let fileUpdated = await jsonTool.getJsonFile('__tests__/', 'ex-1obj_copy');

        expect(fileUpdated).toEqual(file);

        shell.rm('__tests__/ex-1obj_copy.json');
        done();
    });
});


describe('Replace object.', () => {

    it('Should replace an object in a JS object.', () => {
        let updated = jsonTool.replaceObject('intents', exampleObjA.intents, exampleObjB);
        expect(updated).toEqual(exampleObjA);
    });
});

describe('Replace object in a JSON file.', () => {

    it('Should replace an object in a JSON file.', async (done) => {
        shell.cp('__tests__/ex-1obj.json', '__tests__/ex-1obj_copy.json');

        let json = await jsonTool.replaceObjectInFile(exampleObjA.intents, 'intents', 'ex-1obj_copy', '__tests__/');
        let file = await jsonTool.getJsonFile('__tests__/', 'ex-1obj2');
        let fileUpdated = await jsonTool.getJsonFile('__tests__/', 'ex-1obj_copy');

        expect(fileUpdated).toEqual(file);

        shell.rm('__tests__/ex-1obj_copy.json');
        done();
    });
});