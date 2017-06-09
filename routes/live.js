import express from 'express';
import request from 'co-request';
import co from 'co';
import crypto from 'crypto';

let router = express.Router();
let config = {
  AppKey: "ac951ac246b8218c8c7e54cdc116a89c",
  AppSecret: "42b13dbb42d7"
}
let rq = request.defaults({jar: true});

let getNonce = function(len) {
   len = len || 32;
　　let $chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefhijkmnprstwxyz123456789';
　　let maxPos = $chars.length;
　　let pwd = '';
　　for (let i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

let getCheckSum = function(appSecret, nonce, curTime) {
  let checkString = appSecret + nonce + curTime;
  let sha1 = crypto.createHash("sha1");
  sha1.update(checkString);
  let checkSum = sha1.digest('hex');
  return checkSum;
}
let CurTime = Date.now();
let Nonce = getNonce(16);
let headers = {
  AppKey: config.AppKey,
  Nonce,
  CurTime,
  CheckSum: getCheckSum(config.AppSecret, Nonce, CurTime),
  Content-Type: "application/json;charset=utf-8"
}

let opt = {
  uri: "https://vcloud.163.com/app/channellist",
  headers,
  json: true,
  method: 'POST'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '搞什么飞机啊' });
});

module.exports = router;
