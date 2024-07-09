## 性能优化

### 网络部分

1 减少请求时间

DNS Prefech 可以让浏览器在空闲的时候预先解析网页中的域名

资源压缩
资源拆分 ：入口分割 拆分多个 entry 分包配置 提取第三方的公共库

删除冗余代码 ：TreeShaking 删除无用 css pure-webpack-plugin

按需加载 suspense + React.lazy

静态资源存放 Cdn

2 减少请求次数
http 缓存
本地存储

### 渲染部分

### 应用

img 设置 data-src 在 img 出现出现在可视区域 IntersectionObserver getBoundingRect
防抖截流
虚拟列表
Fragment
key
