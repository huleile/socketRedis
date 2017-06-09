'use strict';
import crypto from 'crypto';
import request from 'co-request';
const rq = request.defaults({jar: true});

const AppConfig = {
  AppKey: "ac951ac246b8218c8c7e54cdc116a89c",
  AppSecret: "42b13dbb42d7"
};

const vcloud = "https://vcloud.163.com/app";

const LiveURL = {
  // 频道管理
  "CreateChannel": vcloud + "/channel/create",                // 创建频道
  "UpdateChannel": vcloud + "/channel/update",                // 修改频道信息
  "ChannelList": vcloud + "/channellist",                     // 频道列表
  "FlowAddress": vcloud + "/address",                         // 重新获取推流拉流地址
  "ChannelStatus": vcloud + "/channelstats",                  // 频道状态信息
  "RemoveChannel": vcloud + "/channel/delete",                // 删除频道
  "SetAlwaysRecord": vcloud + "/channel/setAlwaysRecord",     // 设置频道录制状态
  "RecordVideoList": vcloud + "/videolist",                   // 获取录制视频文件列表
  "VodVideoList": vcloud + "/vodvideolist",                   // 获取某一时间范围的录制视频文件列表
  "SetRecordCbk": vcloud + "/record/setcallback",             // 设置视频录制后的回调地址
  "SetSignKey": vcloud + "/callback/setSignKey",              // 设置回调的加签秘钥
  "PauseChannel": vcloud + "/channel/pause",                  // 禁用频道
  "PauseChannels": vcloud + "/channellist/pause",             // 批量禁用频道
  "ResumeChannel": vcloud + "/channel/resume",                // 恢复频道
  "ResumeChannels": vcloud + "/channellist/resume",           // 批量恢复频道
  "MergeRecords": vcloud + "/video/merge",                    // 录制文件合并

  // 视频文件管理
  "VideoList": vcloud + "/vod/video/list",                    // 视频文件信息列表
  "VideoInfo": vcloud + '/vod/video/get',                     // 视频文件信息详情
  "EditVideo": vcloud + "/vod/video/edit",                    // 视频文件信息编辑
  "RemoveSingle": vcloud + "/vod/video/delete_single",        // 删除单个转码输出视频
  "RemoveVideo": vcloud + "/vod/video/videoDelete",           // 删除视频文件
  "DisableVideo": vcloud + "/vod/video/videoDisable",         // 屏蔽视频文件
  "RecoverVideo": vcloud + "/vod/video/videoRecover",         // 恢复视频文件, 对立屏蔽视频文件
  "RemoveVideos": vcloud + "/vod/video/delete",               // 批量删除视频

  // 视频截图
  "CreateSnapshot": vcloud + "/vod/snapshot/create",          // 获取视频截图地址
  "SetSnapshot": vcloud + "/vod/snapshot/set",                // 设置视频封面

  // 视频分类管理
  "CreateVideoType": vcloud + "/vod/type/create",             // 创建视频分类
  "VideoTypeInfo": vcloud + "/vod/type/get",                  // 视频分类详情
  "VideoTypes": vcloud + "/vod/type/list",                    // 视频分类列表
  "UpdateVideoType": vcloud + "/vod/type/update",             // 修改视频分类
  "RemoveVideoType": vcloud + "/vod/type/typeDelete",         // 删除视频分类
  "SetTypeToVideo": vcloud + "/vod/type/set"                  // 设置视频的分类
};

const getNonce = function(l) {
   let len = l || 16;
　　let $chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefhijkmnprstwxyz123456789';
　　let maxPos = $chars.length;
　　let pwd = '';
　　for (let i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

const getCheckSum = function(appSecret, nonce, curTime) {
  let checkString = appSecret + nonce + curTime;
  let sha1 = crypto.createHash("sha1");
  sha1.update(checkString);
  let checkSum = sha1.digest('hex');
  return checkSum;
}

const getHeaders = function() {
    let CurTime = Date.now();
    let Nonce = getNonce();
    return {
        "AppKey": AppConfig.AppKey,
        "Nonce": Nonce,
        "CurTime": CurTime,
        "CheckSum": getCheckSum(AppConfig.AppSecret, Nonce, CurTime),
        "Content-Type": "application/json;charset=utf-8"
    }
}

const getRequestObj = function(uri, method) {
  return {
    uri,
    headers: getHeaders(),
    json: true,
    method
  }
}

export {AppConfig, getNonce, getCheckSum, LiveURL, getHeaders, getRequestObj, rq};
