/*
 * @Author: Quarter
 * @Date: 2022-04-09 02:10:04
 * @LastEditTime: 2022-04-09 08:27:38
 * @LastEditors: Quarter
 * @Description: 类型
 * @FilePath: /acrossdb/src/types.ts
 */
import api from "./api";

declare module "vue/types/vue" {
  interface Vue {
    $across: typeof api;
  }
  interface VueConstructor {
    $across: typeof api;
  }
}

// 广播事件
export interface BroadcastEvent {
  channel: string; // 信道
  message: any; // 数据
  timestamp: number; // 时间戳
  url: string; // 地址
}



// 事件存储仓库
export interface EventDatabase {
  [key: string]: StorageUpdateCallback[];
}

// 存储配置
export interface StorageConfig {
  data: StorageData; // 数据
  timestamp: number; // 时间戳
  type: "ACROSS_DATABASE"; // 类型
  version: string; // 版本号
}

// 存储数据
export interface StorageData {
  [key: string]: any;
}

// 存储时间数据
export interface StorageUpdateEvent {
  key: string; // 键名
  timestamp: number; // 时间戳
  type: "ACROSS_UPDATE"; // 类型
  url: string; // 地址
  value: any; // 值
}

export type StorageUpdateCallback = (val: any) => void;