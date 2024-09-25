---
title: flomo批量删除脚本
slug: /2024/flomo-batch-delete
keywords: [flomo, 批量删除, js]
description: 用来实现flomo批量删除的js脚本
last_update:
  date:  2024-09-24
---



## tldr



```js
const scrollToBottom = (c) => {
  const element = document.querySelector(c);
  console.log(element);
  element.scrollTop = element.scrollHeight;
}

const isScrolledToBottom = () => {
  const element = document.querySelector('.end');
  return element ? element.getBoundingClientRect().bottom <= window.innerHeight : false;
};

function scrollAndCheck() {
  scrollToBottom('.memos');

  if (!isScrolledToBottom()) {
    console.log('No element with class "end" was found, continue scrolling...');
    setTimeout(scrollAndCheck, 1000); // 每秒检查一次
  } else {
    console.log('页面已下滑到最底部！');
    var elements = document.querySelectorAll('.item.danger');

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].textContent.includes('删除')) {
        elements[i].click();
      }
    }
  }
}

scrollAndCheck();
```


直接在 chrome console 中使用即可

搜了一下目前网上还没人写，所以随手写个分享出来。本来想顺手写个油猴脚本，但是懒得搞了。直接存在 alfred snippet 里了，用起来还算方便。




## why this?


:::tip

为啥我需要这个脚本，需要从

- flomo在我的工具链中起到什么作用？
- 日常使用 flomo 的 workflow?

这两个问题说起

:::

***当便签工具/网络剪贴板使用，所以有定期全部清空的需求。之前一直用微信的“文件传输助手”作为该定位的工具，但是终究是不方便，就想起来几年前用过的flomo。***

然后就发现flomo不支持批量删除，然后就找了找其他的类似定位的工具，

首先想到的就是 memos，但是其 maintainer 明确说了 [不会支持批删功能](https://github.com/usememos/memos/issues/1489)。

找了一圈最后还是决定自己写个js脚本实现这个feat

对我来说，flomo的优势大概以下几点：

- UI漂亮：这种“卡片式”UI跟我对该工具的定位完全契合。我用flomo来记录一些零碎的想法和事情，通常也就10来个字，不需要适合长文的笔记型软件。
- 不会跑路
- 支持多端同步：在外用APP记录，到家之后在web端把这些record集中处理掉。

所以，综上来说，其他类似定位的工具就不符合我的需求了

- Memos同样不支持批量删除，还需要 self-hosted
- Monolog妙想 和 Migi 只有APP，不支持多端同步
- Thino 是 Obsidian的插件
- 印象笔记等笔记类APP，上面说了，太重了，我不需要这种写长文的软件，并且这些笔记类APP普遍UI很粗糙，不好用。

---

:::tip

至于日常使用 flomo 的 workflow

1. 外出随手记录想法
2. 到家之后把所有的record复制到scratch（默认“从旧到新”展示）
3. 批量删除所有record
4. 把弄到scratch的东西逐项处理掉

:::









