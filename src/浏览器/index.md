#### http 常见状态码

1xx 服务器收到请求
2xx 请求成功
3xx 重定向
4xx 客户端错误 404 未找到资源 403 没有权限
5xx 服务器错误 504 网关超时

#### http 常见的 header

request header

Accept：浏览器可接收的数据类型
Accept-Encoding：浏览器可接收的压缩算法，如 gzip
Accept-language：浏览器可接收的语言，如 zh-CN
Connection：keep-alive，一次 TCP 连接重复使用
cookie
Host
User-Agent：浏览器信息
Content-type：发送数据的类型，常见的有 application/json，application/x-www-form-urlencoded，multipart/form-data，text/plain 等

response headers
Content-type:返回的数据类型
Content-length：数据大小
Content-Encoding 压缩算法，如 gzip ，对应
Accept-EncodingSet-Cookie

请描述 http 缓存机制缓存

即某些情况下，资源不是每次都去服务端获取，而是第一次获取之后缓存下来，下次再请求时，直接读取本地缓存，而不再去服务端请求
为什么需要缓存：让网页更快的显示出来，
提高性能哪些资源需要缓存静态资源可以缓存:js css 图片

http 缓存分为强制缓存和协商缓存强制缓存(客户端缓存)：浏览器本地根据服务器设置的过期时间来判断是否使用缓存，未过期则从本地缓存里拿资源，已过期则重新请求服务器获取最新资源。Cache-Control (response headers 中) 表示该资源，被再次请求时的缓存情况。`max-age:31536000` 单位是 s ，该资源被强制缓存 1 年`no-cache` 不使用强制缓存，但不妨碍使用协商缓存`no-store` 不使用缓存，每次都从服务器获取最新的资源`private` 只允许客户端使用缓存，不允许其他代理服务器进行缓存。`public` 客户端和代理服务器都可缓存。
关于 Expireshttp 1.0 ，设置缓存过期时间的由于本地时间和服务器时间可能不一致，会导致问题已被 Cache-Control 的 max-age 代替协商缓存(服务端缓存)：浏览器本地每次都向服务器发起请求，由服务器来告诉浏览器是从缓存里拿资源还是返回最新资源给浏览器使用 Last-Modified（Response Headers）和 If-Modified-Since（Request Headers）Last-Modified 服务端返回资源的最后修改时间 If-Modified-Since 再次请求时带着最后修改时间服务器根据时间判断资源是否被修改（如未被修改则返回 304，失败则返回新资源和新的缓存规则）Etag（Response Headers）和 If-None-Match（Request Headers）Etag 服务端返回的资源唯一标识（类似人的指纹，唯一，生成规则由服务器端决定，结果就是一个字符串）If-None-Match 再次请求时带着这个标识服务端根据资源和这个标识是否 match （成功则返回 304，失败则返回新资源和新的缓存规则）如果两者一起使用，则优先使用 Etag 规则。因为 Last-Modified 只能精确到秒级别。刷新操作对应不同的缓存策略正常操作：地址栏输入 url ，点击链接，前进后退等强制缓存有效，协商缓存有效手动刷新：F5 或者点击刷新按钮强制缓存失效，协商缓存有效强制刷新：ctrl + F5 强制缓存失效，协商缓存失效 http 缓存流程图

### cors

浏览器将请求分为简单请求和非简单请求

1. 简单请求

① 请求方法是以下三种之一：HEAD、GET、POST
② HTTP 头信息不超出以下几种字段：Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

2. 非简单请求

① 请求方法是以下三种之一：PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH

1.1 简单请求
① 请求头：添加一个 Origin 字段，
下面是一个例子，浏览器发现这次跨源 AJAX 请求是简单请求，就自动在头信息之中，添加一个 Origin 字段。
② 服务器判断 origin 是否在许可范围
上面的头信息中，Origin 字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

1. 不在许可范围内：正常的 HTTP 回应，响应头不会添加 Access-Control-Allow-Origin
   如果 Origin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含 Access-Control-Allow-Origin 字段（详见下文），就知道出错了，从而抛出一个错误，被 XMLHttpRequest 的 onerror 回调函数捕获。注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是 200。
2. origin 在许可范围内，响应头会添加 Access-Control-xxx
   如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。
   ccess-Control-Allow-Origin: http://api.bob.com
   Access-Control-Allow-Credentials: true
   Access-Control-Expose-Headers: FooBar
   Content-Type: text/html; charset=utf-8
   上面头信息之中，有三个与 CORS 请求相关的字段，都以 Access-Control-开头。
   Access-Control-Allow-Origin: http://api.bob.com (必须)：表明接受什么域名
   该字段是必须的。它的值要么是请求时 Origin 字段的值，要么是一个\*，表示接受任意域名的请求。
   Access-Control-Allow-Credentials: true
   该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie 不包括在 CORS 请求之中。设为 true，即表示服务器明确许可，Cookie 可以包含在请求中，一起发给服务器。这个值也只能设为 true，如果服务器不要浏览器发送 Cookie，删除该字段即可。
   Access-Control-Expose-Headers: FooBar
   该字段可选。CORS 请求时，XMLHttpRequest 对象的 getResponseHeader()方法只能拿到 6 个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在 Access-Control-Expose-Headers 里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回 FooBar 字段的值。
   2.2 非简单请求（请求方法是 PUT、DELTE 等）
   ① 预检请求(preflight)：OPTIONS+Origin 字段+Access-Control-xx
   非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT 或 DELETE，或者 Content-Type 字段的类型是 application/json。
