### remix-h5-vue-tpl：vue 项目模版

### 食用指南

### 项目启动
```
npm install

npm run build
```

### 模版使用
* 下载zip包，放到新创建的项目目录中
  
### 项目使用
```
//接口调用
this.$request.post('login', param).then(res => {}).catch(err => {})

//toast插件
this.$toast(msg)

//loading组件
用法：this.$loading.show(content) && this.$loading.hide()
param： 
    content： type（string）
示例：
    若不需传入文字，则不用传入参数，直接`this.$loading.show()`,
    否则`this.$loading.show('加载中...')`

//尺寸按照设计图还原即可
```