"use strict";
import {LiveURL, getRequestObj, rq} from './tools'
import co from 'co';

let opt = getRequestObj(LiveURL.CreateChannel, 'POST');
opt.body = {
  name: "倚天屠龙记",
  type: 0,
  needRecord: 1,
  filename: "武林至尊宝刀屠龙",
  format: 1
};

co(function* () {
  let rst = yield rq(opt);
  if(rst.statusCode == 200) {
     let body = rst.body;
     let code = body.code;
     if(code == 200) {
       let channel = body.ret;
       console.log(channel);
     }else {
       console.log(code, body.msg);
     }
  }


  console.log('Finished!');
 }).catch(function(err){
     console.error(err);
 });

 // res format for body.ret
 /*
 {
  httpPullUrl: 'http://flv567962b6.live.126.net/live/672721a113f8483484a6e64eae7abcf8.flv?netease=flv567962b6.live.126.net',
  hlsPullUrl: 'http://pullhls567962b6.live.126.net/live/672721a113f8483484a6e64eae7abcf8/playlist.m3u8',
  rtmpPullUrl: 'rtmp://v567962b6.live.126.net/live/672721a113f8483484a6e64eae7abcf8',
  name: '倚天屠龙记',
  pushUrl: 'rtmp://p567962b6.live.126.net/live/672721a113f8483484a6e64eae7abcf8?wsSecret=70d96b8427e0de90b33b0858f55df6ec&wsTime=1495877090',
  ctime: 1495877090284,
  cid: '672721a113f8483484a6e64eae7abcf8'
 }
  */
