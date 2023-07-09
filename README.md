# Jupiter

###开发指南
1. 只需要关注src/pages/目录
2. 如果需要增加新的应用，则在pages目录下增加一个新的目录  
eg: 增加一个user应用，则创建一个user的目录
3. 在对应的应用下创建相应的模块目录
4. 在模块目录下增加页面
5. 页面根据amis元数据来创建，参考src/pages/user/user_management/index.tsx
6. 在path2Compoment.tsx中增加页面组件

> amis: https://baidu.github.io/amis/zh-CN/docs/index

### 环境需求
#### node : V18+


### 服务启动
1. npm install 
2. npm start


### 注意事项
在执行npm start启动的时候,可能会出现
```azure
Module not found: Error: Can't resolve 'react-overlays/useRootClose' in xxx
```
则需要执行:
```azure
npm install react-overlays
```

