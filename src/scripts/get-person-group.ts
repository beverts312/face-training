// tslint:disable-next-line:missing-jsdoc
import sdk = require('azure-face-sdk');
import util = require('util');

import fail = require('../fail');
import Config = require('../config');
const config = Config.azure;

const opts = new sdk.SdkOpts(config.ocpApiKey);
const personGroupSdk = new sdk.PersonGroupSdk(opts);
const personSdk = new sdk.PersonSdk(opts);

const personGroupId = config.personGroup.id;

personSdk.listPeopleInGroup(personGroupId).then((people) => {
    console.log(JSON.stringify(people));
}).catch(fail);
