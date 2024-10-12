---
title: 为什么在CI中应该用pre-commit代替linters?
date:  2024-07-31
---



## super-linter


各种linters让人挑花了眼，找个主流的linter，随便加几个feats就又是个新linter，都没啥意思

其实只需要照着super-liner就ok了，一个ALL-In-One的linter，集成了各种主流语言和工具的linter


```yaml title="linters"
- url: https://github.com/koalaman/shellcheck

- url: https://github.com/adrienverge/yamllint
  des: yamllint

- url: https://github.com/ansible/ansible-lint
  des: 自动修复 lint 时查出的 fail. "ansible-lint --write"
```

***super-linter既帮我们筛选了各种语言和服务的主流linter，并且提供了更易用的使用方法***




以markdownlint为例，之前我需要自己维护上面这些repo

但是使用super-linter之后，只需要 super-linter -> markdownlint-cli -> markdownlint 就可以了，完全没必要再维护（或者star）这些repo了



```yaml title="markdownlint"
- url: https://github.com/DavidAnson/markdownlint
  des: Markdownlint not support MDX, but it works actually, strangely enough.
- url: https://github.com/igorshubovych/markdownlint-cli
  des: Markdownlint Tool that docs using.

```

上面举了个确定了使用markdownlint，但是linter cli和action还分为两个repo，很难维护的问题。

下面则是技术选型的问题，同样是 scan secrets 的需求，有各种工具可以选择，那么哪个更好用呢？

如果看super-linter的话，就一目了然了，直接选择gitleaks就完事了，其他的几种都是特定场景下的选择，并不主流。这就super-linter的用处，用来筛选主流linters。


```yaml title="scan secrets"
- url: https://github.com/gitleaks/gitleaks
  des:

- url: https://github.com/trufflesecurity/trufflehog
  des: 与gitleaks颇为互补的一个secrets scan工具，不同于gitleaks这种专注于扫描本地git repo代码的工具，trufflehog的feats在于scan远程repo，还支持扫描S3、Postman、Docker等服务中的secrets。trufflehog既是cli，也是CI

- url: https://github.com/thoughtworks/talisman
  des: gitleaks本身就可以配置为pre-commit，为啥还需要tailsman呢?

- url: https://github.com/byt3hx/jsleak
  des: 跟gitleaks还不太一样，jsleak只支持scan网站，也就是mlc和site sucker之间的区别（本地扫描和扫描网站）

```



***但是比较可惜的是，super-lint与pre-commit目前没有集成***

所以对我来说，***我对super-lint的定位是，一个更好的 awesome-linters，用来查看各种主流linter***





## pre-commit

### 为什么推荐用pre-commit代替linters作为CI


> ***pre-commit 是各种 linter 和 ci 之间的 mediator，或者说“支点”***


在使用pre-commit之前，我需要在本地配置一套所有linter的cli，在commit之前先自己预跑一下，保证没有问题之后，再commit，这是在本地。在remote呢，则需要在CI里（按照本地linter）再配置一套，保证local和remote的linter保持一致。

可以看到，这就引入了维护成本，无论想改local还是remote，对端都要修改。就很麻烦。

如果使用pre-commit就不需要这么麻烦了，配置之后，无论local和remote都可以共用一套配置。

***除此之外，pre-commit还支持跨CI，所有workflow都集成到pre-commit了，无论换什么CI，只需要加一个 `pre-commit run --all-files` 就可以了。***

众所周知，各种CI的workflow的写法是不同的，所以必然带来维护成本。***之前没用pre-commit的时候，我需要维持自己常用的github actions和gitlab CI两套用来发布golang的workflow，就很麻烦。我现在直接用 Taskfile + Pre-commit 就完全解决掉这个问题了。***


---

总结一下，使用pre-commit代替linter+CI的好处在于：

- 减少维护成本，“配置一次，多处使用”，不需要在local和remote再配置了
- 跨CI使用，同样减少维护成本



### 用 pre-commit 代替 husky


上面从更宏观的角度出发，解释了为啥pre-commit相比之下是更好的解决方案

下面从微观角度出发聊聊

下面是一个经典的“前端项目pre-commit”的stack：husky + commitlint + lint-staged


```yaml
# - url: https://github.com/standard/standard
# - url: https://github.com/eslint/eslint
# - url: https://github.com/prettier/prettier

- url: https://github.com/typicode/husky

- url: https://github.com/lint-staged/lint-staged
  des: Run linters on git staged files. 也就是在pre-commit时执行Linter，但是需要注意两点，仅针对staged代码，而不是整个项目，另外，依托于项目的package.json，所以仅适配js项目。

- url: https://github.com/conventional-changelog/commitlint
  des: 给 husky 生成 commit-msg

# [Cz工具集使用介绍 - 规范Git提交说明 - 掘金](https://juejin.cn/post/6844903831893966856)
- url: https://github.com/commitizen/cz-cli
  des: 也是commit-msg，基于commitizen实现的，可以搭配husky使用，所以同样是适用于js项目，不适用于其他语言的项目。

```




但是其他语言的各种项目则没有这么完备的pre-commit方案可以选择，能怎么办呢?

毫无疑问的，不如所有语言（包括js）都统一用pre-commit好了，不是吗?

***pre-commit是比husky更通用也更强大的选择***


### 目前在用的一些pre-commit hooks

```yaml

- url: https://github.com/jorisroovers/gitlint
  des: git commit msg linter.
  cmd:
# - c: gitlint install-hook
#   x: 使用gitlint时，必须先用这个命令生成.git/hooks/commit-msg，才能正常使用
# - c: gitlint uninstall-hook

- url: https://github.com/pre-commit-ci/pre-commit-ci-config
- url: https://github.com/igorshubovych/markdownlint-cli
- url: https://github.com/adrienverge/yamllint
- url: https://github.com/gitleaks/gitleaks
- url: https://github.com/antonbabenko/pre-commit-terraform
- url: https://github.com/golangci/golangci-lint
- url: https://github.com/lietu/go-pre-commit

```



### 类似pre-commit的一些工具


[Comparing Code Quality Meta Tools - House Absolute(ly Pointless)](https://blog.urth.org/2020/05/08/comparing-code-quality-meta-tools/)


```yaml

- url: https://github.com/evilmartians/lefthook
  des: golang实现，其实就是local模式的pre-commit

- url: https://github.com/sds/overcommit

- url: https://github.com/houseabsolute/precious
  des: ??? rust实现，但是没什么人用

```

对 lefthook 有点兴趣，但是这几个的生态目前来说，跟pre-commit还是没法比



### reviewdog


```yaml
- url: https://github.com/reviewdog/reviewdog
```

整理gh.yml时看到之前用过的reviewdog，想到其实reviewdog和pre-commit虽说在各自官方des是完全不同的，一个是用来Code Review的，一个是自定义git hooks操作，***但是实际上从功能上来说，二者没啥区别，都可以集成各种linter，也都支持在开发环境、CI中使用（包括在PR时触发）***




但是为啥后来没有继续使用reviewdog，而是转用pre-commit了呢？

reviewdog提供了.reviewdog.yml和CI两种方式来执行rules，我们可以像pre-commit一样，在开发环境和CI都复用.reviewdog.yml（也可以使用各种acts来优化体验），但是需要注意的是：

- reviewdog的配置文件.reviewdog.yml只支持local mode，不支持像pre-commit那样的remote mode，***这里需要注意的是如果只支持local mode的话，这些cli的version就无法通过git来管理了（并且CI里也需要逐个手动安装这些cli），给团队开发带来很多麻烦***
- reviewdog的核心还是CI，可以看到其官方提供了 [public-reviewdog-github-actions](https://github.com/reviewdog/reviewdog#public-reviewdog-github-actions) 这些acts，但是其生态还是远不如pre-commit






当然，虽然二者的功能很相似，但是归根到底定位还是不同的

reviewdog的独特feats（或者说作为Code Review工具的feat）是code suggest（也就是在PR和MR操作时，直接在VCS中提示有问题的代码），用户体验更友好。

pre-commit虽然也能在PR和MR时实现类似操作，但是用户体验一定是不如reviewdog的。

但是基于上述的两点原因，个人认为还是pre-commit的易用性和通用性更好。


## 总结

***上面啰里八嗦一堆，总之一句话，pre-commit是真正可以做到“一次配置，到处使用”的工具，不需要在local和remote再配置了，也不需要考虑“跨CI”的问题，主打一个省心。***







