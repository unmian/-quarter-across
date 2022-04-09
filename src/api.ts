/*
 * @Author: Quarter
 * @Date: 2022-04-09 07:40:23
 * @LastEditTime: 2022-04-09 08:39:16
 * @LastEditors: Quarter
 * @Description: API 接口
 * @FilePath: /acrossdb/src/api.ts
 */
import { BROADCASE_CHANNEL, EVENT_DATABASE, STORAGE_KEY, STORAGE_VUE, VERSION } from "./constants";
import { BroadcastEvent, StorageConfig, StorageUpdateCallback, StorageUpdateEvent } from "./types";

/**
 * @description: 广播📢
 * @author: Quarter
 * @param {any} message 消息内容
 * @return
 */
const broadcast = (message: any, channel: string = "default"): void => {
  const msg: BroadcastEvent = {
    channel,
    message,
    timestamp: Date.now(),
    url: window.location.href,
  };
  BROADCASE_CHANNEL.postMessage(msg);
  trigger(msg);
};

/**
 * @description: 分发数据更新
 * @author: Quarter
 * @return
 */
export const dispatch = (key: string, val: any): void => {
  if (typeof key === "string") {
    // 数据更新
    STORAGE_VUE.$set(STORAGE_VUE.storage, key, val);
    // 事件分发
    const keys = Object.keys(EVENT_DATABASE);
    if (keys.includes(key) && Array.isArray(EVENT_DATABASE[key])) {
      EVENT_DATABASE[key].forEach((func: (val: any) => void) => {
        if (typeof func === "function") {
          func(val);
        }
      });
    }
  }
};

/**
 * @description: 数据获取
 * @author: Quarter
 * @param {string} key 键名
 * @return
 */
const obtain = (key: string): any => {
  return STORAGE_VUE.storage[key];
};

/**
 * @description: 数据更新
 * @author: Quarter
 * @return
 */
const refresh = (): void => {
  const config: StorageConfig = {
    data: STORAGE_VUE.storage,
    type: "ACROSS_DATABASE",
    timestamp: Date.now(),
    version: VERSION,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
};

/**
 * @description: 数据存储
 * @author: Quarter
 * @param {string} key 键名
 * @param {any} val 值
 * @return
 */
const storage = (key: string, value: any): void => {
  dispatch(key, value);
  refresh();
  const event: StorageUpdateEvent = {
    key,
    timestamp: Date.now(),
    type: "ACROSS_UPDATE",
    url: location.href,
    value,
  };
  localStorage.setItem(STORAGE_KEY + "UPDATE", JSON.stringify(event));
};

/**
 * @description: 订阅事件
 * @author: Quarter
 * @param {string} key 键名
 * @param {StorageUpdateCallback} callback 回调
 * @return
 */
const subscribe = (key: string, callback: StorageUpdateCallback): void => {
  const keys = Object.keys(EVENT_DATABASE);
  if (keys.includes(key) && Array.isArray(EVENT_DATABASE[key])) {
    EVENT_DATABASE[key].push(callback);
  } else {
    Reflect.set(EVENT_DATABASE, key, [callback]);
  }
};

/**
 * @description: 触发事件
 * @author: Quarter
 * @param {BroadcastEvent} data 数据
 * @return
 */
export const trigger = (data: BroadcastEvent): void => {
  const event = new MessageEvent("across-broadcast", {
    data,
  });
  window.dispatchEvent(event);
};

/**
 * @description: 取消订阅事件
 * @author: Quarter
 * @param {string} key 键名
 * @param {StorageUpdateCallback} callback 回调
 * @return
 */
const unsubscribe = (key: string, callback: StorageUpdateCallback): void => {
  const keys = Object.keys(EVENT_DATABASE);
  if (keys.includes(key) && Array.isArray(EVENT_DATABASE[key])) {
    EVENT_DATABASE[key].splice(EVENT_DATABASE[key].indexOf(callback), 1);
  }
};

export default {
  broadcast,
  obtain,
  storage,
  subscribe,
  unsubscribe,
};