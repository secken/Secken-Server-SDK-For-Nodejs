"use strict"

let assert = require("assert");
let SeckenSDK = require("../index.js");

let sdk = new SeckenSDK({
    app_id: process.env.SDK_TEST_ID,
    app_key: process.env.SDK_TEST_KEY,
});

describe("#checkAuthToken()", () => {
    it("should be error", done => {
        sdk.checkAuthToken({
            auth_token: process.env.SDK_TEST_TOKEN,
        }).then(data => console.log(data), data => {
            if(data.status == 608) done();
        });
    });
});
