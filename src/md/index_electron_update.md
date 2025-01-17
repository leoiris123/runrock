# electron 应用更新-基于 github

## （1）自动发布 release 版本

配置发布命令

https://www.electron.build/configuration/publish#how-to-publish

```json
"build": "vue-tsc && vite build && electron-builder -c electron.config.json",
"release": "vue-tsc && vite build && electron-builder -c electron.config.json",
```

生成 token

https://github.com/settings/tokens/new

修改配置

```json
"publish": {
    "provider": "github",
    "token": "",
    "owner": "",
    "private": true,
    "releaseType": "draft", // “draft” | “prerelease” | “release” | “undefined” 默认草稿状态
    "repo": "electron-vue-application"
  },
```

## （2）自动更新逻辑修改

安装 electron-updater: https://www.electron.build/auto-update

相比 autoUpdater，第三方包 `electron-updater` 有以下优势：

- 不需要搭建专门的更新服务（如 Hazel、Nuts 等）。
- 同时支持 macOS 和 Windows 签名。
- 支持获取下载进度，等等。

# 具体代码实现

主进程封装更新模块

```ts
import { dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { join, dirname } from "node:path";
import { logger } from "../../modules/logger.ts";
import { ipcMainService } from "../../ipcManager";

class AppAutoUpdate {
  initConfig() {
    if (process.env.NODE_ENV === "development") {
      // 需要注意这里的路径问题
      autoUpdater.updateConfigPath = join(__dirname, `../../dev-update.yml`);
    }
    autoUpdater.autoDownload = false;
    autoUpdater.logger = logger;

    autoUpdater.forceDevUpdateConfig = true;

    // events
    autoUpdater.on("error", (error) => {
      // 若github上都没有最新的release可用就会报错，需要将 draft 状态的更改为 release 状态
      dialog.showErrorBox("更新失败", JSON.stringify(error));
    });
    autoUpdater.on("update-available", () => {
      ipcMainService.send("app:update-info", {
        type: "update-available",
      });
    });
    autoUpdater.on("checking-for-update", () => {
      console.log("checking-for-update: ");
    });
    autoUpdater.on("update-not-available", () => {
      ipcMainService.send("app:update-info", {
        type: "update-not-available",
        data: {
          version: autoUpdater.currentVersion,
        },
      });
    });
    autoUpdater.on("download-progress", (progressObj) => {
      // 通知渲染进程下载进度
      ipcMainService.send("app:update-info", {
        type: "download-progress",
        data: progressObj,
      });
    });
    autoUpdater.on("update-downloaded", () => {
      // dialog.showMessageBox({
      //   type: 'info',
      //   title: '安装更新',
      //   message: `更新下载完毕，应用将重启并安装`,
      //   buttons: ['确定']
      //   detail: '',
      // }).then(res => {
      //   autoUpdater.quitAndInstall()
      // })
      ipcMainService.send("app:update-info", {
        type: "update-downloaded",
      });
    });
    this.registerAppUpdateEventHandler();
  }
  checkAppUpdate() {
    autoUpdater.checkForUpdates();
  }

  handleDownloadUpdate() {
    autoUpdater.downloadUpdate();
  }

  handleQuitAppToInstall() {
    autoUpdater.quitAndInstall();
  }

  registerAppUpdateEventHandler() {
    // 检查是否有可用版本
    ipcMainService.on("app:check-update", (event: any, data) => {
      this.checkAppUpdate();
    });
    ipcMainService.on("app:update-download", (event: any, data) => {
      this.handleDownloadUpdate();
    });
    ipcMainService.on("app:update-install", (event: any, data) => {
      this.handleQuitAppToInstall();
    });
  }
}

export const appAutoUpdate = new AppAutoUpdate();
```

渲染进程逻辑修改

```js
<template>
  <div>
    <CommonBar />
    <div class="update-container">
      <span>下载速度： {{ downloadSpeed }} / S</span>
      <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" />
      <div class="flex">
        <el-button @click="checkForUpdate()">检查更新</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { ipcRenderService } from '@/render/services/ipcService'
import CommonBar from '@/render/components/base/commonBar/index.vue'
import { convertBandwidth } from '@/render/utils/format'

const percentage = ref(0)
const downloadSpeed = ref('0 KB')

function checkForUpdate() {
  ipcRenderService.send('app:check-update')
}

onMounted(() => {
  // 发现可用更新
  ipcRenderService.on('app:update-info', (event: any, data: any) => {
    console.log('data: app:update-info', data);
    switch (data.type) {
      case 'update-available':
        ElMessageBox.confirm(
          '发现可用更新，是否立即下载？',
          '更新提示',
          {
            confirmButtonText: '立即下载',
            cancelButtonText: '取消',
            type: 'info',
            center: true,
          }
        ).then(() => {
          ipcRenderService.send('app:update-download')
        })
        .catch(() => {
        })
        break;
      case 'update-downloaded':
        ElMessageBox.confirm(
          '更新下载完毕，是否重启并安装？',
          '更新提示',
          {
            confirmButtonText: '立即安装',
            cancelButtonText: '取消',
            type: 'info',
            center: true,
          }
        ).then(() => {
          ipcRenderService.send('app:update-install')
        })
        .catch(() => {
        })
        break;

      case 'download-progress':
        percentage.value = parseFloat(data.data.percent.toFixed(2));
        downloadSpeed.value = convertBandwidth(data.data.bytesPerSecond) || '0 KB';
        break
      case 'update-not-available':
        ElMessageBox.confirm(
          '当前已是最新版本',
          '更新提示',
          {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'info',
            center: true,
          }
        ).then(() => {
        })
        .catch(() => {
        })
        break

      default:
        break;
    }
  });
})
</script>

<style lang="scss" scoped>
:deep(.ep-progress-bar__inner) {
  background: linear-gradient(to right, #009aff, #7a00ff);
}
.update-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px 50px 0;
  span {
    font-size: 13px
  }
};
.flex {
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
```
