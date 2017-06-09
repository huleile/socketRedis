"use strict";
import {LiveURL, getRequestObj, rq} from './tools'
import co from 'co';

let opt = getRequestObj(LiveURL.VideoList, 'POST');
opt.body = {
  currentPage: 1,
  pageSize: 10,
  status: 0,
  type: 0
};
co(function* () {
  let rst = yield rq(opt);
  if(rst.statusCode == 200) {
     let body = rst.body;
     let code = body.code;
     if(code == 200) {
       let videos = body.ret;
       console.log(videos);
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
{ createTime: 1495881191658,
  origUrl: 'http://vodr7rkjwu0.vod.126.net/vodr7rkjwu0/672721a113f8483484a6e64eae7abcf8_1495881105981_1495881146865_6458417-00000.mp4',
  downloadOrigUrl: 'http://vodr7rkjwu0.nosdn.127.net/672721a113f8483484a6e64eae7abcf8_1495881105981_1495881146865_6458417-00000.mp4?download=%E6%AD%A6%E6%9E%97%E8%87%B3%E5%B0%8A%E5%AE%9D%E5%88%80%E5%B1%A0%E9%BE%99_20170527-183145_20170527-183226.mp4',
  updateTime: 1495881192332,
  status: 40,
  width: '480',
  videoName: '武林至尊宝刀屠龙_20170527-183145_20170527-183226',
  typeName: '直播录制',
  duration: 40,
  height: '360',
  description: null,
  snapshotUrl: 'http://vodr7rkjwu0.nosdn.127.net/e2801e6c-e386-4165-a0ae-203f6b89de1e.jpg',
  initialSize: 2359380,
  vid: 1906602,
  completeTime: null,
  typeId: 73919,
  durationMsec: 40000
}
 */
