
## 问题

- [x] 复制项目, 省去写大量CSS的时间.

- [x] .next 是干嘛的?
  - 好像是来自 next.js, 是所有网页编译的结果.
  - 用来做服务器渲染的!!!!

- [x] lodash/fp
```js
import { has, map } from 'lodash/fp'; // functional programming
```

- [x] arr.map() 才能够获取 index, 其他写法会有问题



- [ ] 清理代码, 主要是API部分.


- [ ] 添加登陆验证

- [ ] 添加 CRUD 帖子

- [ ] 添加 CRUD 评论

- [ ] 考虑升级一下 react 版本

- [ ] 如何在使用 next 的时候定位代码?

- [ ] 如何去掉 next?
  - server.js 里面用到了 next, 这里启用一个 server 来获取数据, 可是谁调用它的呢?
  - downside https://www.reddit.com/r/reactjs/comments/8evy5d/what_are_the_downsides_to_nextjs/

- [ ] 这种代码组织方式好像不太流行, 跟 create-react-app 对比一下?! 是因为 redux 吗?


- [ ] React 路由怎么做?


- [ ] 修改代码结构, 研究一下什么代码结构更合理.
- 这不是主要矛盾, 没有性能上的提升!


- [ ] 为什么 create-react-app 会完全清空terminal, 而本文件只会把内容推上去.


- 直接从 styles 里面导入 tags! 这很方便啊!