---
date:  2024-09-14
title: regex
slug: /2024/regex
---




***[Regex Cheat Sheet](https://www.rexegg.com/regex-quickstart.php)***



```yaml
- q: 多行修饰符
- q: 量词（重复次数）
  x: "*, +, ?, {}"
- q: 特殊单字符（简写字符集）
  x: \d, \D, \w, \W, \s, \S
- q: 空白符（其他项）
  x: \f, \n, \r, \t, \v
- q: 特殊运算符
  x: 锚点(^, $), 范围(转义运算符\, 或运算符|, 点运算符., 特征标群(...), be[^ou]r), , 不保存子组
- q: 模式修正符
  x: 忽略大小写i (?i), 全局搜索g, 多行匹配m, 惰性匹配(在量词后加上 ? 将使得相关匹配项变成惰性模式, 正则默认贪婪匹配), 具名捕获
- q: 断言（零宽度断言）
- q: unicode
  x: emoji, 汉字
- q: 常用regex
  x: |
    - \\D只保留数字
    - \s.*  以空格开始的所有字符
    - [u4e00-\u9fa5] 选择所有汉字
    - [^\u4e00-\u9fa5]^[-,.?:;'\"!'] 选择所有非汉字，但是不包括-,.?:;'"!'这些标点符号
    - ^((?!abc).)*admin((?!abc).)*$ 包含 admin 且不包含 abc。

#      x: 正向断言 `(?=)`, 正向否定断言 `(?!)`, 反向断言 `(?<=)`, 反向否定断言 `(?<!)
```








## 正则表达式

:::tip
注意两点：

- 正则只列举语法没用，一定要把具体使用列出来
- 简单的字符使用不列举，只列举出贪婪模式/惰性模式/环视断言之类比较复杂的内容

:::


- [learn-regex/README-cn.md at master · ziishaned/learn-regex](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)
- [正则表达式手册](https://tool.oschina.net/uploads/apidocs/jquery/regexp.html)




## 基础

```markdown

量词（重复次数）

- `*` * 0n
- `+` + 1n
- `?` ? 01 表示可以不出现，比如`an?`可以匹配到`a`和`an`
- `{}运算符` 用来限定一个或一组字符可以重复出现的次数 `be{2}r` 用来匹配 beer `be{3,}r`表示至少出现 3 次
- {m,n} 出现 m 到 n 次


---

特殊单字符（简写字符集）

- \d 数字[0-9]
- \D 非数字

- \w 字母数字下划线[a-zA-Z0-9_]
- \W 非字符数字下划线

- \s 所有空格字符串[\t\n\f\r\p{Z}]
- \S 匹配除了空格以外的字符

---

空白符（其他项）

- . 任意字符（换行除外）
- \f 换页符
- \n 换行符
- \r 回车符
- \t 制表符
- \v 垂直制表符


```



## 特殊运算符


```markdown

锚点

- `^号`: 开头，插入符，表示开始匹配字符串，只匹配行首
- `$号`: 结尾，结束符，只匹配（该字符串）行尾的字符

范围

- `转义运算符\` 匹配`特殊字符{ } [ ] / \ + * . $ ^ | ？`时，用来转义这些特殊字符
- `或运算符|` 表示或者（比如用`(\*|\.)`匹配`(*) Asterisk.`中的`*`和`.`）
- `点运算符.` 匹配任意*单个字符*，但不匹配换行符
- `特征标群(...)` () 被视为一个整体 `(?:):非捕获分组`
- `be[^ou]r` 不能是括号中的任意单个字符，反选匹配出`bear beor beer beur`中的

```


或运算符

```js
// \d{15}|\d{18}
//
// \d{18}|\d{15}
```



不保存子组

```js
// \d{15}(\d{3})?
// \d{15}(?:\d{3})?
```

```js

// 非获取匹配 (non-capturing)
// 非获取匹配是获取匹配的反面，在使用括号 () 的情况下，非获取匹配并不会作为匹配项返回
// (也不能用于后向引用).
//   非获取匹配通常是为了使一个由多个字符组成的匹配项能够加上量词，却又不希望该匹配项会作为捕获的结果返回。
// 非获取匹配使用 (?:).

'1234'.match(/^(\d)(\d)(\d)(\d)$/)
// ["1234", "1", "2", "3", "4"]
'1234'.match(/^(?:\d)(?:\d)(?:\d)(?:\d)$/)
// ["1234"]
'1234'.match(/^(?:\d)(\d)(\d)(?:\d)$/)
// ["1234", "2", "3"]
'1234'.match(/^(\d)(?:\d){2}(\d)$/)
// ["1234", "1", "4"]
```


分组引用


```js
// 忽略大小写 + 分组引用
// (?i)cat \1
```

```js
// 正则表达式内引用从 \1 开始索引 (因为 \0 是 ASCII 里的空字符 NUL)

'12'.match(/^(\d)\1$/)
// null
'11'.match(/^(\d)\1$/)
// ["11", "1"]

// $& 引用整个匹配到的字符串，可以用以下函数转义所有特殊字符。
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

```

替换时引用

```js

替换时引用在replace的第二个参数里使用, 从$1开始索引.
'1234'.replace(/^(\d)(\d)(\d)(\d)$/g, '[$$]') // $$ 用于代表原本的 $
// [$]
'1234'.replace(/^(\d)(\d)(\d)(\d)$/g, '[$1][$2][$3][$4]')
// [1][2][3][4]
'1234'.replace(/^(\d)(\d)(\d)(\d)$/, '[$&]')
// [1234]
'1234'.replace(/^(?:\d)(\d)(\d)(\d)$/, '[$1][$2][$3][$4]') // 第一个数字为非获取匹配
// [2][3][4][$4] 只匹配到 3 个，$4不存在
```


给正则添加注释

```js
// 正则还可以通过 (?#xxx) 的形式添加注释
// (\w+)(?#word) \1(?#word repeat again)
```


## 模式修正符

```markdown
- `忽略大小写i` ignore
- `全局搜索g` global
- `多行修饰符m` multiline
- `贪婪匹配(默认)`和`惰性匹配？` 正则默认贪婪匹配，用`.*?r`惰性匹配出`ber beer beeer`中的`ber`
- 独占模式

```

惰性模式

```js
// 惰性模式
// 在量词后加上 ? 将使得相关匹配项变成非贪婪模式，
// 在非贪婪模式下匹配将尽可能匹配短内容，这会返回更多匹配项：
'12345'.match(/\d+/g)
// ["12345"]
'12345'.match(/\d+?/g)
// ["1", "2", "3", "4", "5"]
```

多行匹配

```js
// 多行匹配
// m 标志位代表多行匹配，^和$将用于匹配任意行的开头和结尾，而不再是整个字符串的开头和结尾。
'1\n2\n3'.match(/^\d+$/g)
// null
'1\n2\n3'.match(/^\d+$/mg)
// ["1", "2", "3"]
```

具名捕获

```js
// 具名捕获
const text = `
[name1](url1)
[name2](url2)
`
for (const { groups } of text.matchAll(/\[(?<name>\S+)\]\((?<url>\S+)\)/g)) {
  console.log(groups.name)
  console.log(groups.url)
}
```

忽略大小写

```js
// 如果用正则匹配，实现部分区分大小写，另一部分不区分大小写，这该如何操作呢？就比如说我现在想要，the cat 中的 the 不区分大小写，cat 区分大小写。
// ((?i)the) cat
// the cat
// The cat
// THE cat
// thE cat

// (?i)cat
// cat CAT caT

```


## 断言（零宽度断言）

```markdown
- `正向先行断言?= 存在` 比如用`\d+(?=PM)`匹配出`Date: 4 Aug 3PM`中的`3`
- `负向先行断言?! 排除` 用`(?<=\$)\d+`匹配出`Product Code: 1064 Price: $5`中的`5`
- `正向后发断言?<= 存在` 用`(?<!\$)\d+`匹配出上面的`1064`
- `负向后发断言?<! 排除`
```


正向断言

```js
// 非获取匹配经常能代替正向断言。
// (?=)

// 正向断言
'Hello World'.match(/Hello(?= World)/g)
// ["Hello"]
// 非获取匹配
'Hello World'.match(/Hello(?: World)/g)
// ["Hello World"]
// 正向断言做不到，因为断言之后的内容不可能同时是" My "和"World"
'Hello My World'.match(/Hello(?= My )World/g)
// null
// 非获取匹配能做到，因为它是匹配
'Hello My World'.match(/Hello(?: My )World/g)
// ["Hello My World"]
```


正向否定断言

```js
// (?!)
'Hello Kitty'.match(/Hello(?! World)/g)
// ["Hello"]
'Hello World'.match(/Hello(?! World)/g)
// null
// 这是一句废话，因为断言之后的内容只能是" Kitty", 必然不可能是" World", 可以直接去掉断言部分。
'Hello Kitty'.match(/Hello(?! World) Kitty/g)
// ["Hello Kitty"]
```


反向断言

```js

// (?<=)
// 和正向断言一样，非获取匹配经常能代替反向断言。

// 反向断言
'Hello World'.match(/(?<=Hello )World/g)
// ["World"]
// 非获取匹配
'Hello World'.match(/(?:Hello )World/g)
// ["Hello World"]
// 反向断言做不到，因为断言之前的内容不可能同时是"Hello"和" My "
'Hello My World'.match(/Hello(?<= My )World/g)
// null
// 非获取匹配能做到
'Hello My World'.match(/Hello(?: My )World/g)
// ["Hello My World"]
```


反向否定断言

```js
// 反向否定断言 (Negative lookbehind assertion)
// (?<!)

'Hello World'.match(/(?<!Hello )World/g)
// null
'Goodbye World'.match(/(?<!Hello )World/g)
// ["World"]
// 这是一句废话，因为断言前面只能是"Goodbye ", 必然不可能是"Hello ", 可以直接去掉断言部分。
'Goodbye World'.match(/Goodbye (?<!Hello )World/g)
// ["Goodbye World"]
```


```js
// 零宽断言/环视断言
//
// (?<!\d)\d{6}(?!\d)
//
// (?<!\w)
```




## unicode

```markdown

正则匹配 unicode

emoji
/\p{Emoji}/u

汉字
/\p{Han}/u
等价于
/\p{Script=Han}/u

字
/\p{General_Category=Letter}/u
该模式不匹配数字和各种语言使用的标点符号。
```



