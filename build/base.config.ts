/*
 * @Author: Quarter
 * @Date: 2021-12-29 07:28:23
 * @LastEditTime: 2022-04-09 07:46:18
 * @LastEditors: Quarter
 * @Description: vite 基础配置
 * @FilePath: /acrossdb/build/base.config.ts
 */
import { resolve } from "path";
import { defineConfig } from "vite";

// 文档: https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  plugins: [],
});