"use strict"

let assert = require("assert");
let SeckenSDK = require("../index.js");

let sdk = new SeckenSDK({
    app_id: process.env.SDK_TEST_ID,
    app_key: process.env.SDK_TEST_KEY,
});

describe("#getResult()", () => {
    it("test result", done => {
        sdk.getQrcode().then(data => {
            return sdk.getResult(data.event_id, false);
        }).then(data => {
            console.log(data);
        }, error => {
            console.log(error);
        }, notify => {
            if(notify.status == 602) done();
        });
    })
});
