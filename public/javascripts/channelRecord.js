"use strict";
import {LiveURL, getRequestObj, rq} from './tools'
import co from 'co';

let opt = getRequestObj(LiveURL.ChannelRecord, 'POST');
opt.body = {
  cid: "672721a113f8483484a6e64eae7abcf8",
  needRecord: 1,
  duration: 5,
  filename: "武林至尊宝刀屠龙",
  format: 0
};

co(function* () {
  let rst = yield rq(opt);
  if(rst.statusCode == 200) {
     let body = rst.body;
     let code = body.code;
     let msg = body.msg;
     console.log(code, msg);
  }


  console.log('Finished!');
 }).catch(function(err){
     console.error(err);
 });

 //res format
 //{code: 200, msg: undifined} or {code: 错误码, msg: 错误信息}
