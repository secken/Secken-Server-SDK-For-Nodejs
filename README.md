# Secken Private Cloud Server SDK For Nodejs

[中文文档](https://github.com/secken/Secken-Server-SDK-For-Nodejs/blob/master/CN.md)

## Description
Nodejs SDK for Secken-SDK Server

Website: https://www.yangcong.com

Wechat: yangcongAPP

Wechat Group: http://t.cn/RLGDwMJ

QQ: 475510094

Sina Weibo: http://weibo.com/secken

Business: 010-64772882 / market@secken.com

Support: support@secken.com

Documents: https://www.yangcong.com/help

## Install && Usage

To install Secken.Private.ServerSdk, Import these packages

```
npm install secken-sdk
```

```
let SeckenSDK = require('secken-sdk');
let sdk = new SeckenSDK({
    app_id: 'appid',
    app_key: 'appkey',
});
```
all the functions in SDK will return a `Promise` object by node module `Q`

## Release

#### 0.0.2
* Update Readme
#### 0.0.1
* Add `#getQrcode`, `#postAuthPush`, `#getResult`, `#checkAuthToken`

Secken-SDK wrote by `ES6`, please using in `Node 5.0 +`

## getQrcode (get a qrcode picture for auth)
```
sdk.getQrcode(options).then(data => {
    // data.qrcode_url
    // data.event_id   
});
```

params:
```
options = {
    auth_type: '',
    action_type: '',
    action_details: '',
    callback: ''
}
```

|    status    | 		description 	    |
|:----------:|:----------------------------:|
|  200       |       OK                     |
|  400       |       params error           |
|  403       |       signature error        |
|  404       |       no such app id         |
|  407       |       time out               |
|  500       |       system error           |
|  609       |       ip address blocked     |

## getResult (get action result by event id)

accept 2 params: `event_id` and `times`

`times` will set `2000` by default, the function will get result in loop with delay time 2000 ms, by setting `times` to change the loop delay time, if `times` was `false`, function will run only one times

```
sdk.getQrcode(options).then(data => {
    return sdk.getResult(data.event_id, times);
}).then(data => {
    // success
}, error => {
    // error
}, notify => {
    // waiting for user auth, status 602
});
```

|    status  | 		description 	            |
|:----------:|:--------------------------------:|
|  200       |       OK                         |
|  201       |       event has been resolved    |
|  400       |       params error               |
|  403       |       signature error            |
|  404       |       no such app id             |
|  407       |       time out                   |
|  500       |       system error               |
|  601       |       reject by user             |
|  602       |       waiting for user auth      |
|  604       |       no such event id           |
|  606       |       callback is set            |
|  609       |       ip address blocked         |

## postAuthPush (push a message to user for auth)
```
sdk.postAuthPush({
    uid: "",
}).then(data => {
    // success
}, error => {
    // failed
});
```

params:
```
options = {
    uid: "",   // required
    auth_type: "",
    action_type: "",
    action_details: ""
}
```  

|    status  | 		description 		      |
|:----------:|:------------------------------:|
|  200       |       OK                       |
|  400       |       params error             |
|  403       |       signature error          |
|  404       |       no such app id           |
|  407       |       time out                 |
|  500       |       system error             |
|  609       |       ip address blocked       |

## checkAuthToken (check auth token)
```
sdk.checkAuthToken({
    auth_token: "1234567890123456789012345678901234567890",
}).then(data => {
    // success
}, error => {
    // failed
});
```

|    status   | 		desciption 		     |
|:----------:|:-----------------------------:|
|  200       |       OK                      |
|  400       |       params error            |
|  403       |       signature error         |
|  404       |       no such app id          |
|  407       |       time out                |
|  500       |       system error            |
|  608       |       no such token           |
|  609       |       ip address blocked      |
