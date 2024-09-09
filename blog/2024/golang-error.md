---
title: golang错误处理
date: 2024-08-17
---



## 相关问题

```yaml
- topic: error处理
  url: https://github.com/golang/go/tree/master/src/errors
  qs:
    - q: "***处理 golang Error?***"
      u: https://mp.weixin.qq.com/s?__biz=MzAxMTA4Njc0OQ==&mid=2651453360&idx=1&sn=ec479badda69e92d0f1f52e4bc00358b
      x: 首先要分清楚Error, Exception和panic。go 源代码很多地方写 panic, 但是工程实践业务代码不要主动写 panic，理论上 panic 只存在于 server 启动阶段，比如 config 文件解析失败，端口监听失败等等，所有业务逻辑禁止主动 panic，所有异步的 goroutine 都要用 recover 去兜底处理。

    - q: panic
      u: https://www.hitzhangjie.pro/blog/2021-04-16-%E5%A6%82%E4%BD%95%E7%9C%8B%E5%BE%85gopanic%E5%8F%8A%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86/
      x: “异常+try-catch，本质上将当前操作的错误处理逻辑转换为了caller要解决的问题，并没有少写多少错误处理代码，反而，同一异常处理代码在多个try-catch中被拷贝，而且可读性更差了。错误发生地、错误处理地分散在不同地方，能说是可读性好吗？我不这么认为。”
      
    - q: 操作数据库时，比如 dao 层中遇到一个 sql.ErrNoRows 时，是否应该 wrap 这个 error，抛给上层；为什么？应该怎么做？请写出代码
      u: https://github.com/kevinyan815/gocookbook/issues/66
      x: 总结一下，错误处理的原则就是：错误只在逻辑的最外层处理一次，底层只返回错误。底层除了返回错误外，要对原始错误进行包装，增加错误信息、调用栈等这些有利于排查的上下文信息。

    - q: 不要直接return err，应该使用fmt.Errorf()自定义error，自己封装一个newError
      u: https://akavel.com/go-errors


---

    - q: 写一堆 `err != nil` 的问题
      x: 自定义错误记得要实现 error 接口

    - q: 怎么 wrapping 多个 errors？


    - q: golang的哨兵错误、自定义错误以及隐式错误三种
      u: https://golang.design/under-the-hood/zh-cn/part1basic/ch04errors/value/
      x: 推荐哨兵错误或者自定义错误，禁止Implicit Errors

    - q: errors.Join()使用场景
      x: 比如说对并发task的error的统一收集，类似ErrorGroup
      
    - q: 如果需要格式化错误，*应该用`fmt.Errorf(...)`代替`errors.New(fmt.Sprintf(...))`*；如果不需要格式化错误，直接`errors.New()`即可.

    - q: golang中用errors.New(), errors.Is() 怎么判断err是否相同？
      x: 需要注意errors.Is()判断err是否相同时，需要两个参数都是直接引用var声明的err，如果只是err的text相同，会返回false。这个应该是基本常识了。
              
```


:::tip
关于golang的错误处理，归根到底是三点：

- 分清楚什么情况下应该使用 Error, Exception, Panic
- golang 中怎么使用 Error?
- golang项目分层（比如经典的CLD三层）中怎么使用 Error?

:::


这两个问题在 ***[3种方式！Go Error处理最佳实践](https://mp.weixin.qq.com/s?__biz=MzAxMTA4Njc0OQ==&mid=2651453360&idx=1&sn=ec479badda69e92d0f1f52e4bc00358b)*** 中都有解答，以下内容也是对这篇文章的总结



## TLDR

以上问题的解答分别是：

golang 没有 exception，只有error和panic

***业务代码中不应该出现panic***，并且如果存在panic，应该主动recover处理（通常都是实现一个recover中间件，来catch所有的panic，不需要手动逐个处理）

golang 处理 error 则直接参考 [crunchy/errors.go at master · muesli/crunchy](https://github.com/muesli/crunchy/blob/master/errors.go)

相比于普通的pkg中的错误处理，***golang项目有了分层，所以唯一需要注意的就是在各层用 `errors.Wrap()` 对err进行包装（追加stack以及相应的错误提示），而非直接 `return err`***，以便形成 error tree，及时发现问题。正如 [Don’t return err in Go — akavel's digital garden](https://akavel.com/go-errors) 中提到的，也就是 ***“错误处理的原则就是：错误只在逻辑的最外层处理一次，底层只返回错误。底层除了返回错误外，要对原始错误进行包装，增加错误信息、调用栈等这些有利于排查的上下文信息。”***





## 前言


首先要想清楚，处理error的目的是什么？

处理error的目的是对corner case进行兜底，增加服务的健壮性

之所以需要想清楚这个问题，是因为很多人都容易把 error处理 和 logging 的目的搞混，认为error也是为了查看错误的，实际上error是用来解决错误的





## 怎么包装err?

[errors: add support for wrapping multiple errors · Issue #53435 · golang/go](https://github.com/golang/go/issues/53435) "We replace the term "error chain" with "error tree"." 所以应该是“错误树”而不是“错误链”，*因为golang1.20之后支持一次包装多个错误，于是错误之间可以建立 tree关系，而非之前的线性关系了*


```yaml
- type: Golang-Error-Handle
  repo:
	- url: https://github.com/hashicorp/go-multierror
	  des: 用来将多个error添加到MultiError中，并在需要时一起处理。可以避免传统handle error时的繁琐代码。
	- url: https://github.com/samber/oops
	  des: Error handling library with context, assertion, stack trace and source fragments

```

golang 1.20之前，我们需要通过类似 go-multierror 之类的mod来实现类似golang1.20的 `github.com/pkg/errors` 的 error tree，现在已经不需要了

所以可以看到有很多类似

- [Replace go-multierror with errors package in Go 1.20 · Issue #63686 · grafana/grafana](https://github.com/grafana/grafana/issues/63686)
- [Migrate from Hashicorps go-multierror to standard library multierror (Golang 1.20)](https://golang.ch/migrate-from-hashicorps-go-multierror-to-standard-library-multierror-golang-1-20/)

用 errors代替go-multierror的



wrapping multiple errors

[19 错误处理（下）：如何设计错误包？](https://learn.lianglianglee.com/%E4%B8%93%E6%A0%8F/Go%20%E8%AF%AD%E8%A8%80%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91%E5%AE%9E%E6%88%98/19%20%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86%EF%BC%88%E4%B8%8B%EF%BC%89%EF%BC%9A%E5%A6%82%E4%BD%95%E8%AE%BE%E8%AE%A1%E9%94%99%E8%AF%AF%E5%8C%85%EF%BC%9F.md)






[Go语言(golang)新发布的1.13中的Error Wrapping深度分析 | 飞雪无情的博客](https://www.flysnow.org/2019/09/06/go1.13-error-wrapping)

[Go错误处理：错误链使用指南 | Tony Bai](https://tonybai.com/2023/05/14/a-guide-of-using-go-error-chain/)

*[如何在 Golang 项目中处理好错误 | ZhengHe](https://zhenghe-md.github.io/blog/2020/10/05/Go-Error-Handling-Research/)*










## ref

- [Go错误处理最佳实践 - Mohuishou](https://lailin.xyz/post/go-training-03.html#error)








