"use strict"

let assert = require("assert");
let SeckenSDK = require("../index.js");

let sdk = new SeckenSDK({
    app_id: process.env.SDK_TEST_ID,
    app_key: process.env.SDK_TEST_KEY,
});

describe("#postAuthPush()", () => {
    describe("test uid", () => {
        it("uid in EN", done => {
            sdk.postAuthPush({
                uid: "Secbone",
            }).then(data => done(), data => console.log(data));
        });

        it("uid in CN", done => {
            sdk.postAuthPush({
                uid: "呵呵",
            }).then(data => done(), data => console.log(data));
        });
    });
    describe("test auth type", () => {
        it("type 1 (one click)", done => {
            sdk.postAuthPush({
                uid: "Secbone",
                auth_type: 1,
            }).then(data => done(), data => console.log(data));
        });
        it("type 2 (error)", done => {
            sdk.postAuthPush({
                uid: "Secbone",
                auth_type: 2,
            }).then(data => console.log(data), data => done());
        });
        it("type 3 (face)", done => {
            sdk.postAuthPush({
                uid: "Secbone",
                auth_type: 3,
            }).then(data => done(), data => console.log(data));
        });
        it("type 4 (voice)", done => {
            sdk.postAuthPush({
                uid: "Secbone",
                auth_type: 4,
            }).then(data => done(), data => console.log(data));
        });
    });

    it("test callback", done => {
        sdk.postAuthPush({
            uid: "Secbone",
            callback: "https://yangcong.com/callback",
        }).then(data => done(), data => console.log(data));
    });
});
