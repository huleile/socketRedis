"use strict";
import {LiveURL, getRequestObj, rq} from './tools';
import co from 'co';

let opt = getRequestObj(LiveURL.RemoveChannel, 'POST');
opt.body = {
  cid: "1d97695950e74ef7b0f07f5e6b2a69a0"
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
