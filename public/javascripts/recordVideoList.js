"use strict";
import {LiveURL, getRequestObj, rq} from './tools'
import co from 'co';

let opt = getRequestObj(LiveURL.RecordVideoList, 'POST');
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
