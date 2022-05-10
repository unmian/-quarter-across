# @quarter/across

> 一个简单的跨页面通信或数据传递工具

## 安装

配置私有仓库

```txt
// .yarnrc
"@quarter:registry" "https://npm.lescity.com.cn/"

//.npmrc
@quarter:registry=https://npm.lescity.com.cn/
```

安装依赖

```bash
npm install @quarter/across
# 或者
yarn add @quarter/across
```

vue 安装

```typescript
// main.ts
import Vue from "vue";
import App from "./App.vue";
import router from "router";
import store from "store";
import AcrossPlugin from "@quarter/across";

Vue.use(AcrossPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
```


## 使用

### 数据存储

本工具库的数据存储采用订阅发布模式，需要使用者手动对数据进行订阅更新，以及**取消订阅**

- **storage(key: string, value: any):** 存储或更新数据
- **obtain(key: string): any:** 获取当前数据
- **subscribe(key: string, callback: StorageUpdateCallback):** 订阅数据更新
- **unsubscribe(key: string, callback: StorageUpdateCallback):** 取消订阅数据更新

```typescript
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Demo extends Vue {
  acrossData = "demo"; // 跨页面数据

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    this.$across.subscribe("across-demo", this.updateValue);
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeDestory(): void {
    this.$across.unsubscribe("across-demo", this.updateValue);
  }
  
  /**
   * @description: 更新值
   * @author: Quarter
   * @param {any} val 值
   * @return
   */  
  updateValue(val: any): void {
    this.acrossData = val;
  }
}
```

### 使用装饰器

我们也可以通过装饰器的形式来订阅数据更新

- **@Subscribe(key?: string):** 订阅数据更新

```typescript
import { Component, Vue } from "vue-property-decorator";
import { Subscribe } from "@quarter/across";

@Component
export default class Demo extends Vue {
  acrossData = "demo"; // 跨页面数据
  
  /**
   * @description: 更新值
   * @author: Quarter
   * @param {any} val 值
   * @return
   */  
  @Subscribe("acrossData") 
  updateValue(val: any): void {
    this.acrossData = val;
  }
}
```

### 📢广播消息

本工具库的还可以对所有的界面进行数据广播，通过对 `window` 监听 `across-broadcast` 事件即可

- **broadcast(message: any, channel: string = "default"):** 广播消息数据，channel 为信道，可以用来区分不同渠道的信息数据

```typescript
import { Component, Vue } from "vue-property-decorator";
import { BroadcastEvent } from "@quarter/across";

@Component
export default class Demo extends Vue {
  acrossData = "demo"; // 跨页面数据

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    window.addEventListener("across-broadcast", this._handleBroadcast);
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeDestory(): void {
    window.removeEventListener("across-broadcast", this._handleBroadcast);
  }
  
  /**
   * @description: 广播数据
   * @author: Quarter
   * @return
   */  
  _broadcast(): void {
    this.$across.broadcast({ data: "demo-data" }, "demo");
  }
  
  /**
   * @description: 处理广播数据
   * @author: Quarter
   * @param {MessageEvent} e 消息事件
   * @return
   */  
  _handleBroadcast(e: MessageEvent): void {
    const data = e.data as BroadcastEvent;
    if ("demo" === data.channel) {
      // do something
    }
  }
}
```

## Licenses

GPL-3.0 License © 2022-PRESENT [Quarter](https://github.com/unmian)

## Releases

### Version 0.0.1 - 2022/03/09

- **feat:** 完成第一个可用版本