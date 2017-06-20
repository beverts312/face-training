// tslint:disable-next-line:missing-jsdoc
import sdk = require('azure-face-sdk');
import util = require('util');

import FB = require('../utils/facebook/fb');
import Config = require('../config');
import fail = require('../fail');

const config = Config.azure;

const opts = new sdk.SdkOpts(config.ocpApiKey);
const personSdk = new sdk.PersonSdk(opts);
const faceListSdk = new sdk.FaceListSdk(opts);
const faceSdk = new sdk.FaceSdk(opts);
const fb = new FB();

const personGroupId = config.personGroup.id;

const userId = process.argv[2];

fb.setAppAccessToken().then(() => {
    fb.getUserProfile(userId, 'id,name').then((profile) => {
        const userData = util.format('%s-%s', profile.id, profile.name);
        console.log(userData);
        personSdk.createPerson(personGroupId, profile.id, userData).then((person) => {
            console.log(util.format('Sucessfully created person %s', person.personId));
            faceListSdk.createList(util.format('%s-fb', userId), userId).then(() => {
                console.log('Sucessfully created face list');
            }).catch((err) => {
                console.error('Failed to make face list');
                fail(err);
            })
        }).catch((err) => {
            console.error('Failed to make person');
            fail(err);
        });
    }).catch((err) => {
        console.error('Failed to get profile');
        fail(err);
    });
}).catch((err) => {
    console.error('Failed to auth');
    fail(err);
});