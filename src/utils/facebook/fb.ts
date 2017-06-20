import request = require('request');
import util = require('util');

import Photo = require('./models/photo');
import Profile = require('./models/profile');
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
    private accessToken: string;

    constructor(version?: string) {
        this.version = version ? version : config.version;
        // tslint:disable-next-line:no-http-string
        this.baseUri = util.format('https://%s/v%s', config.baseUri, this.version);
    }

    public setAppAccessToken(): Promise<boolean> {
        const uri = util.format('%s/oauth/access_token?client_id=%s&client_secret=%s&grant_type=client_credentials',
            this.baseUri, config.clientId, config.clientSecret);
        return new Promise<boolean>((resolve, reject) => {
            request.get(uri, {}, (err, res, body) => {
                if (res.statusCode !== 200) {
                    reject(body);
                }
                this.accessToken = util.format('access_token=%s', JSON.parse(body).access_token);
                resolve(true);
            });
        });
    }

    public getPhotosUserIsTaggedIn(userId: string): Promise<Photo[]> {
        const uri = util.format('%s/%s/photos?%s', this.baseUri, userId, this.accessToken);
        return new Promise<Photo[]>((resolve, reject) => {
            request.get(uri, {
                headers: { 'access_token': this.accessToken }
            }, (err, res, body) => {
                if (res.statusCode !== 200) {
                    reject(body);
                }
                resolve(body);
            });
        });
    }

    public getPhotoTags(photoId: string): Promise<Tag[]> {
        const uri = util.format('%s/%s/tags?', this.baseUri, photoId, this.accessToken);
        return new Promise<Tag[]>((resolve, reject) => {
            reject('Not Implimented');
        });
    }

    public getUserProfile(userId: string, fields?: string): Promise<Profile> {
        let uri = util.format('%s/%s?%s', this.baseUri, userId, this.accessToken);
        if (fields) {
            uri = util.format('%s&fields=%s', uri, fields)
        }
        return new Promise<Profile>((resolve, reject) => {
            request.get(uri, (err, res, body) => {
                if (res.statusCode !== 200) {
                    reject(body);
                }
                resolve(JSON.parse(body));
            });
        });
    }
}
export = FacebookUtils;