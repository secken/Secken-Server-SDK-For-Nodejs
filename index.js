"use strict"

let Q = require("q");
let lazy = require("lazy.js");
let crypto = require("crypto");
let request = require("request");

class SeckenSDK {
    constructor(options) {
        this.app_id = options.app_id;
        this.app_key = options.app_key;
        this.base_url = "https://api.sdk.yangcong.com/";
    }

    sha1(text) {
        return crypto.createHash("sha1").update(text, 'utf8').digest("hex");
    }

    getSignature(data, ignore) {
        ignore = ignore || [];
        ignore = lazy(["signature"]).union(ignore);

        let string = "";

        lazy(data)
            .keys()
            .without(ignore)
            .sort()
            .each(key => {
                string += `${key}=${data[key]}`;
            });

        string += this.app_key;
        return this.sha1(string);
    }

    request(uri, params, method, base_url) {
        params = params || {};
        method = method || "GET";
        base_url = base_url || this.base_url;

        let options = {
            baseUrl: base_url,
            uri: uri,
            method: method,
            qs: params,
        };

        let defer = Q.defer();
        let _self = this;

        request(options, (error, response, body) => {
            let data = JSON.parse(body);

            switch(data.status) {
                case 200:
                    if(data.signature === _self.getSignature(data)) {
                        defer.resolve(data);
                    } else {
                        defer.reject(data);
                    }
                    break;
                default:
                    defer.reject(data);
                    break;
            }
        });

        return defer.promise;
    }

    getQrcode(options) {
        options = options || {};

        let params = lazy({app_id: this.app_id})
            .assign(lazy(options).pick([
                'auth_type',
                'action_type',
                'action_details',
                'callback',
            ]))
            .map((value, key) => {
                switch(key) {
                    case "callback": return [key, encodeURIComponent(value)];
                    default: return [key, value];
                }
            })
            .toObject();
        params.signature = this.getSignature(params);

        return this.request("/qrcode_for_auth", params);
    }

    getResult(event_id, time) {
        let once = time === false ? true : false;
        time = time || 2000;
        let params = {
            app_id: this.app_id,
            event_id: event_id,
        };

        params.signature = this.getSignature(params);

        let _self = this;
        let defer = Q.defer();

        let loop = () => {
            _self.request("/event_result", params).then(data => {
                defer.resolve(data);
            }, data => {
                switch(data.status){
                    case 201:
                    case 602:
                        if(!once) setTimeout(loop, time);
                        defer.notify(data);
                        break;
                    default:
                        defer.reject(data);
                }
            });
        };

        loop();

        return defer.promise;
    }

    postAuthPush(options) {
        let params = lazy({app_id: this.app_id})
            .assign(lazy(options).pick([
                'uid',
                'auth_type',
                'action_type',
                'action_details',
                'callback',
            ]))
            .map((value, key) => {
                switch(key) {
                    case "callback": return [key, encodeURIComponent(value)];
                    default: return [key, value];
                }
            })
            .toObject();
        
        params.signature = this.getSignature(params);

        return this.request("/realtime_authorization", params, "POST");
    }

    checkAuthToken(options) {
        let params = {
            app_id: this.app_id,
            auth_token: options.auth_token,
        };

        params.signature = this.getSignature(params);

        return this.request("/query_auth_token", params);
    }
}

module.exports = SeckenSDK;
