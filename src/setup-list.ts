// tslint:disable-next-line:missing-jsdoc
import sdk = require('azure-face-sdk');
import util = require('util');

import Config = require('./config');
const config = Config.azure;

const opts = new sdk.SdkOpts(config.ocpApiKey);
const personGroupSdk = new sdk.PersonGroupSdk(opts);

const personGroupId = process.argv[2] ||  config.personGroup.id;
const name = process.argv[3] || config.personGroup.name;

personGroupSdk.createGroup(personGroupId, name).then(() => {
    console.log(util.format('Sucessfully created group %s', personGroupId));
}).catch((err) => {
    console.error('Failed to make group');
    console.error(util.format('Details: %s', err));
    process.exit(1);
});