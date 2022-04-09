/*
 * @Author: Quarter
 * @Date: 2022-04-08 09:29:55
 * @LastEditTime: 2022-04-09 07:38:58
 * @LastEditors: Quarter
 * @Description: 初始化数据仓库
 * @FilePath: /acrossdb/src/test/init.ts
 */
import { dispatch, trigger } from "./api";
import { BROADCASE_CHANNEL, STORAGE_KEY } from "./constants";
import { StorageConfig, StorageUpdateEvent } from "./types";

/**
 * @description: 初始化
 * @author: Quarter
 * @return
 */
export const init = (): void => {
  const result = localStorage.getItem(STORAGE_KEY);
  if (typeof result === "string") {
    try {
      const config = JSON.parse(result) as StorageConfig;
      if (typeof config.data === "object") {
        Object.keys(config.data).forEach((key: string) => {
          dispatch(key, config.data[key]);
        });
      }
    } catch (e) {
      throw new Error(`[ACROSSDB error] 解析数据仓库配置失败` + e);
    }
  }
  window.addEventListener("storage", _handleDataUpdate);
  window.addEventListener("beforeunload", () => {
    window.removeEventListener("storage", _handleDataUpdate);
  });
  BROADCASE_CHANNEL.addEventListener("message", _handleChannelBroadcast);
};

/**
 * @description: 处理初始更新
 * @author: Quarter
 * @param {StorageEvent} e 存储事件
 * @return
 */
const _handleDataUpdate = (e: StorageEvent): void => {
  if (e instanceof StorageEvent) {
    // 判断事件类型
    if (e.isTrusted && STORAGE_KEY + "UPDATE" === e.key && typeof e.newValue === "string") {
      try {
        const result = JSON.parse(e.newValue) as StorageUpdateEvent;
        if ("ACROSS_UPDATE" === result.type) {
          dispatch(result.key, result.value);
        }
      } catch (e) {
        throw new Error(`[ACROSSDB error] 解析数据更新事件失败` + e);
      }
    }
  }
};

/**
 * @description: 处理信道广播
 * @author: Quarter
 * @param {MessageEvent} e 存储事件
 * @return
 */
const _handleChannelBroadcast = (e: MessageEvent): void => {
  if (e instanceof MessageEvent && e.isTrusted) {
    trigger(e.data);
  }
};