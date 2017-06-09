"use strict";
import {LiveURL, getRequestObj, rq} from './tools'
import co from 'co';

let opt = getRequestObj(LiveURL.ChannelStatus, 'POST');
opt.body = {
  cid: "672721a113f8483484a6e64eae7abcf8"
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

 //res format for body.ret
 /*
 {
  needRecord: 0,
  uid: 70677,
  duration: 60,
  status: 0,
  name: '倚天屠龙记',
  filename: '武林至尊宝刀屠龙',
  format: 0,
  type: 0,
  ctime: 1495877090284,
  cid: '672721a113f8483484a6e64eae7abcf8',
  recordStatus: null
}
*/
