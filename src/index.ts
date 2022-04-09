/*
 * @Author: Quarter
 * @Date: 2022-04-08 09:26:40
 * @LastEditTime: 2022-04-09 08:34:55
 * @LastEditors: Quarter
 * @Description: 入口文件
 * @FilePath: /acrossdb/src/index.ts
 */
import api from "./api";
import Vue, { PluginObject, VueConstructor } from "vue";
import { init } from "./init";

export default {
  install: (vue: VueConstructor<Vue>) => {
    init();

    vue.prototype.$across = api;
    Object.defineProperties(vue.prototype, {
      $across: {
        get() {
          return api;
        },
      },
    });
  },
} as PluginObject<any>;

export * from "./decorators";
export * from "./types";