"use strict";
import {LiveURL, getRequestObj, rq} from './tools'
import co from 'co';

let opt = getRequestObj(LiveURL.CreateVideoType, 'POST');
opt.body = {
  typeName: "周星驰",
  description: "无厘头搞笑星氏幽默",
  isDel: 0
};

co(function* () {
  let rst = yield rq(opt);
  if(rst.statusCode == 200) {
     let body = rst.body;
     let code = body.code;
     if(code == 200) {
       let vt = body.ret;
       console.log(vt);
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
  typeId: 12345
 }
  */
