# Secken Private Cloud Server SDK For Nodejs

## 简介（Description）
官方提供了一套用于和洋葱验证服务交互的SDK组件，通过使用它，您可以简化集成Secken服务的流程并降低开发成本。

密码就要大声说出来，开启无密时代，让密码下岗

洋葱是一个基于云和用户生物特征的身份验证服务。网站通过集成洋葱，可以快速实现二维码登录，或在支付、授权等关键业务环节使用指纹、声纹或人脸识别功能，从而彻底抛弃传统的账号密码体系。对个人用户而言，访问集成洋葱服务的网站将无需注册和记住账号密码，直接使用生物特征验证提高了交易安全性，无需担心账号被盗。洋葱还兼容 Google 验证体系，支持国内外多家网站的登录令牌统一管理。

【联系我们】

官网：https://www.yangcong.com

微信：yangcongAPP

微信群：http://t.cn/RLGDwMJ

QQ群：475510094

微博：http://weibo.com/secken

帮助：https://www.yangcong.com/help

合作：010-64772882 / market@secken.com

支持：support@secken.com

帮助文档：https://www.yangcong.com/help

项目地址：https://github.com/secken/Secken-Server-SDK-For-Nodejs

洋葱SDK产品服务端SDK主要包含四个方法：
* 获取二维码的方法（ getQrcode ），用于获取二维码内容和实现绑定。
* 请求推送验证的方法（ postAuthPush ），用于发起对用户的推送验证操作。
* 查询事件结果的方法（ getResult ），用于查询二维码登录或者推送验证的结果。
* 复验验证结果的方法（ checkAuthToken ），用于复验移动端SDK验证的结果。

## 安装使用（Install & Get Started）

To install Secken.Private.ServerSdk, Import these packages

```
npm install secken-sdk
```
使用
```
let SeckenSDK = require('secken-sdk');
let sdk = new SeckenSDK({
    app_id: 'appid',
    app_key: 'appkey',
});
```
`本程序接口都以 Promise 形式返回`

## 更新发布（Update & Release Notes）

#### 0.0.1
1. 完成基本 API 接口的封装

## 要求和配置（Require & Config）
```
Node 5.0.0+
```

## 获取二维码内容并发起验证事件（getQrcode）
```
sdk.getQrcode(options).then(data => {
    // data.qrcode_url 二维码地址
    // data.event_id   事件 ID
});
```

参数:
```
options = {
    auth_type: '',
    action_type: '',
    action_details: '',
    callback: ''
}
```

|    状态码   | 		状态详情 		  |
|:----------:|:-----------------:|
|  200       |       成功         |
|  400       |       上传参数错误  |
|  403       |       签名错误                |
|  404       |       应用不存在                |
|  407       |       请求超时                |
|  500       |       系统错误                |
|  609       |       ip地址被禁                |

## 查询验证事件的结果（getResult）

接受两个参数：`event_id` 和 `times`，默认 `times` 为 `2000`，表示程序将以 2000毫秒 的时间间隔循环查询结果，每次结果将以 notify 形式返回。如果 `times` 为 `false`，则只请求一次，不循环查询.

```
sdk.getQrcode(options).then(data => {
    return sdk.getResult(data.event_id, times);
}).then(data => {
    // 查询成功
}, error => {
    // 错误
}, notify => {
    // 等待用户响应，轮询查询结果
});
```

|    状态码   | 		状态详情 		  |
|:----------:|:-----------------:|
|  200       |       成功         |
|  201       |       事件已被处理                |
|  400       |       上传参数错误  |
|  403       |       签名错误                |
|  404       |       应用不存在                |
|  407       |       请求超时                |
|  500       |       系统错误                |
|  601       |       用户拒绝                |
|  602       |       用户还未操作                |
|  604       |       事件不存在                |
|  606       |       callback已被设置                |
|  609       |       ip地址被禁                |

## 发起推送验证事件（postAuthPush）
```
sdk.postAuthPush({
    uid: "",
}).then(data => {
    // 成功
}, error => {
    // 失败
});
```

参数:
```
options = {
    uid: "",   // 必填
    auth_type: "",
    action_type: "",
    action_details: ""
}
```  

|    状态码   | 		状态详情 		  |
|:----------:|:-----------------:|
|  200       |       成功         |
|  400       |       上传参数错误  |
|  403       |       签名错误                |
|  404       |       应用不存在                |
|  407       |       请求超时                |
|  500       |       系统错误                |
|  608       |       验证token不存在           |
|  609       |       ip地址被禁                |

## 复验验证结果的方法（checkAuthToken）
```
sdk.checkAuthToken({
    auth_token: "1234567890123456789012345678901234567890",
}).then(data => {
    // 成功
}, error => {
    // 失败
});
```

|    状态码   | 		状态详情 		  |
|:----------:|:-----------------:|
|  200       |       成功         |
|  400       |       上传参数错误  |
|  403       |       签名错误                |
|  404       |       应用不存在                |
|  407       |       请求超时                |
|  500       |       系统错误                |
|  608       |       验证token不存在           |
|  609       |       ip地址被禁                |
