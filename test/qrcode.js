"use strict"

let assert = require("assert");
let SeckenSDK = require("../index.js");

let sdk = new SeckenSDK({
    app_id: process.env.SDK_TEST_ID,
    app_key: process.env.SDK_TEST_KEY,
});

describe("#getQrcode()", () => {
    it("get qrcode", done => {
        sdk.getQrcode().then(data => {
            if(data.qrcode_url) done();
        }, error => {
            console.log("error~~~");
            console.log(error)
        });
    });

    describe("test auth type", () => {
        it("type 1 (one click)", done => {
            sdk.getQrcode({
                auth_type: 1,
            }).then(data => {
                if(data.qrcode_url) done();
            }, error => {
                console.log("error~~~");
                console.log(error)
            });
        });
        it("type 2 (error)", done => {
            sdk.getQrcode({
                auth_type: 2,
            }).then(data => {
                console.log(data);
            }, error => {
                done();
            });
        });
        it("type 3 (face)", done => {
            sdk.getQrcode({
                auth_type: 3,
            }).then(data => {
                if(data.qrcode_url) done();
            }, error => {
                console.log("error~~~");
                console.log(error)
            });
        });
        it("type 4 (voice)", done => {
            sdk.getQrcode({
                auth_type: 3,
            }).then(data => {
                if(data.qrcode_url) done();
            }, error => {
                console.log("error~~~");
                console.log(error)
            });
        });
    });

    it("test with callback", done => {
        sdk.getQrcode({
            callback: "https://yangcong.com/callback",
        }).then(data => {
            if(data.qrcode_url) done();
        }, error => {
            console.log("error~~~");
            console.log(error)
        });
    });
});
