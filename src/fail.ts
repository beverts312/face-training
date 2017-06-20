// tslint:disable-next-line:missing-jsdoc
import util = require('util');

const fail = (err: Error) => {
    console.error(util.format('Details: %s', err));
    process.exit(1);
};
export = fail;