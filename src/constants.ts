/*
 * @Author: Quarter
 * @Date: 2022-04-08 09:30:34
 * @LastEditTime: 2022-04-09 08:28:03
 * @LastEditors: Quarter
 * @Description: 静态常量
 * @FilePath: /acrossdb/src/constants.ts
 */
import Vue from "vue";
import { EventDatabase, StorageData } from "./types";

// 广播通道
export const BROADCASE_CHANNEL = new BroadcastChannel("__ACROSS_BROADCAST__");

// 事件仓库
export const EVENT_DATABASE: EventDatabase = {};

// 存储键名
export const STORAGE_KEY = "__ACROSS_DATABASE__";

// 数据存储对象
export const STORAGE_VUE = new Vue({
  name: "ACROSS_DATABASE",
  data() {
    return {
      storage: {} as StorageData,
    };
  },
});

// 版本号
export const VERSION = "v0.0.1";