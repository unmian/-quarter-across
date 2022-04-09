/*
 * @Author: Quarter
 * @Date: 2022-04-09 02:19:09
 * @LastEditTime: 2022-04-09 07:42:03
 * @LastEditors: Quarter
 * @Description: 自定义装饰器
 * @FilePath: /acrossdb/src/decorators.ts
 */
import api from "./api";
import { StorageUpdateCallback } from "./types";
import Vue, { ComponentOptions } from "vue";
import { createDecorator, VueDecorator } from "vue-class-component";

/**
 * @description: 订阅数据更新
 * @author: Quarter
 * @param {string} customKey 键名
 * @return
 */
export const Subscribe = (customKey?: string): VueDecorator => {
  return createDecorator((options: ComponentOptions<Vue>, key: string, index: number): void => {
    const keyName = typeof customKey === "string" ? customKey : key;
    if (typeof options.methods !== "object") {
      options.methods = Object.create(null);
    }
    // @ts-ignore
    const method = options.methods[key] as StorageUpdateCallback | undefined;
    if (typeof method === "function") {
      api.subscribe(keyName, method);
      const beforeDestroy = options.beforeDestroy;
      if (typeof beforeDestroy === "function") {
        options.beforeDestroy = (): () => void => {
          api.unsubscribe(keyName, method);
          return beforeDestroy;
        };
      } else {
        options.beforeDestroy = (): void => {
          api.unsubscribe(keyName, method);
        };
      }
    }
  });
};