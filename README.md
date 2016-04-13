# 小小相册
[www.xiaoweb.cn](http://www.xiaoweb.cn)

## 由来
在女儿满月时，想到将她的成长经历用照片保存起来，考虑到手机可能丢失或损坏，而这时也正在学习react native。所以决定用JAVASCRIPT写一个宝贝照片成长托管应用。
取名：#小小相册
小小相册 会有WEB WAP IOS 安卓 四个版本，全部由Javascript开发

当前是网站版
## 环境
 - nodejs (koajs)
 - react (reactjs)
 - mongodb
 - qiniu (七牛云存储)
 - webpack (开发环境)
 - babel (开发环境)

## 发布并同步CDN
`npm run-script build`

### 同步到CND
`npm run-script syncStatic`

## 编译发布文件
`npm run-script webpack`

# 关于
你可能对这个项目感兴趣,但clone下来发现无法运行？或者出现https连接不安全提示？
这是因为项目中关于隐私的config文件与ssl证书我并没有上传，至于为什么我想不用说明了吧！
如果你想运行自己的config，可以阅读代码,自己新建一个config。
如果你不想阅读代码，可以给我发[邮件](mailto://front-end@xiaoweb.cn),或者在这个[QQ群](http://jq.qq.com/?_wv=1027&k=ZWTWIS)中询问.


