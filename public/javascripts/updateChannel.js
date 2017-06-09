"use strict";
import {LiveURL, getRequestObj, rq} from './tools'
import co from 'co';

let opt = getRequestObj(LiveURL.UpdateChannel, 'POST');
opt.body = {
  type: 0, //必须字段
  cid: "672721a113f8483484a6e64eae7abcf8",
  needRecord: 0,  // 无用
  duration: 10,  //无用
  name: "倚天剑屠龙刀" //必须字段
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
// success: {}
// failed: {code, msg}
