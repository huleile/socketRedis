"use strict";
import {LiveURL, getRequestObj, rq} from './tools'
import co from 'co';

let opt = getRequestObj(LiveURL.VideoTypeInfo, 'POST');
opt.body = {
  typeId : 80076
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
 { typeName: '功夫片',
 createTime: 1496715059037,
 isDel: 1,
 desc: '李小龙功夫片',
 number: 0,
 typeId: 80074
 }
  */
