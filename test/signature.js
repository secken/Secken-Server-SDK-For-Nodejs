"use strict"

let assert = require("assert");
let SeckenSDK = require("../index.js");

let sdk = new SeckenSDK({
    app_id: process.env.SDK_TEST_ID,
    app_key: process.env.SDK_TEST_KEY,
});

describe("#getSignature()", () => {
    it("sha1 test", () => {
        assert.equal("62f45acb2db5ea6c2f5598ff696a4a436c5dbc10", sdk.getSignature({app_id: sdk.app_id}))
    });
});
