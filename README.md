# git 历史生成工具

> 地址：[https://xiguaxigua.com/git-graph/](https://xiguaxigua.com/git-graph/)

输入指令，生成 git 历史图

![](https://cdn.jsdelivr.net/npm/figure-bed@0.0.63/images/1.png)

```js
g.dev = master.branch('dev')
g.dev.commit('dev commit 1')
master.merge('dev')
g.dev.delete()
```

![](https://cdn.jsdelivr.net/npm/figure-bed@0.0.63/images/2.png)

```js
g.dev = master.branch('dev')
g.dev.commit('dev commit 1')
master.commit('master commit 1')
master.merge('dev')
```

![](https://cdn.jsdelivr.net/npm/figure-bed@0.0.63/images/3.png)

```js
g.dev = master.branch('dev')
g.dev.commit('dev commit 1')
master.merge({ branch: 'dev', fastForward: true })
```

![](https://cdn.jsdelivr.net/npm/figure-bed@0.0.63/images/4.png)

```js
master.commit('release').tag('v1.0')
```

![](https://cdn.jsdelivr.net/npm/figure-bed@0.0.63/images/5.png)

```js
g.dev = master.branch({ name: 'dev', style: { label: { color: 'red' } } })
g.dev.commit('123')
```

![](https://cdn.jsdelivr.net/npm/figure-bed@0.0.63/images/6.png)

```js
master.commit({ subject: '123', dotText: '1' })
```

切换主题：[https://xiguaxigua.com/git-graph/?blackarrow=1](https://xiguaxigua.com/git-graph/?blackarrow=1)