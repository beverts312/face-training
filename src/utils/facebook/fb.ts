import request = require('request');
import util = require('util');

import Photo = require('./models/photo');
import Tag = require('./models/tag');

import Config = require('../../config');
const config = Config.facebook;
/**
 * Utils for interacting with Facebbook
 * @class FacebookUtils
 */
class FacebookUtils {

    private baseUri: string;
    private version: string;
    private appId: string;
    private appSecret: string;

    constructor(version?: string) {
        this.appId = config.clientId;
        this.appSecret = config.clientSecret;
        this.version = version ? version : config.version;
        // tslint:disable-next-line:no-http-string
        this.baseUri = util.format('http://%s/v%s/', config.baseUri, this.version);
    }

    public setAppAccessToken(): Promise<string> {
        const uri = util.format('%s/%s/photos', this.baseUri);
        return new Promise<string>((resolve, reject) => {
            reject('Not Implimented');
        });
    }

    public getPhotosUserIsTaggedIn(userId: string): Promise<Photo[]> {
        const uri = util.format('%s/%s/photos', this.baseUri, userId);
        return new Promise<Photo[]>((resolve, reject) => {
            reject('Not Implimented');
        });
    }

    public getPhotoTags(photoId: string): Promise<Tag[]> {
        const uri = util.format('%s/%s/tags', this.baseUri, photoId);
        return new Promise<Tag[]>((resolve, reject) => {
            reject('Not Implimented');
        });
    }
}
export = FacebookUtils;