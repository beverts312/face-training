// tslint:disable-next-line:missing-jsdoc
const config = {
    azure: {
        ocpApiKey: process.env.AZURE_FACE_KEY,
        personGroup: {
            name: 'Bailey Test Group',
            id: 'bailey-test-group-1'
        }
    },
    facebook: {
        baseUri: 'graph.facebook.com',
        version: '2.9',
        clientId: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET
    }
};
export = config;