---
title: shell脚本常用语法
date: 2024-05-22
slug: shell-syntax
---


```yaml
- q: Parameter Expansion
- q: shell变量
- q: shell 命令行参数
- q: 特殊变量(环境var, 位置var, 预定义var, 自定义var) 怎么定义和使用var？ # 注意使用"$xxx"
- q: 数组
- q: 只有使用 `${array[@]}` 才会被作为多个元素，否则数组会被作为一个元素
- q: 基本操作符 (算法运算符, 关系运算符, 布尔运算符与逻辑运算符, 字符串运算符)
- q: 关系运算符 ()
- q: 逻辑运算符 Logical Operators (&&, &, ||, ;)
- q: 文件比较
- q: 双括号命令
- q: 判断
- q: 循环 (for...do...done)
- q: 替代
- q: 引用机制、let、vars、printf
- q: shell中使用main函数
- q: 巧用heredocs
- q: rewrite(>), append file(>>).
- q: How to execute shell in remote VPS locally? (How to execute shell inside vps remotely?)
```


## 基本的 shell 语法

```markdown
- 声明变量？
  - `直接声明`默认作为字符串处理
  - `declare声明`默认作为字符串处理，使用`-i`参数可以声明整数；
  - `let声明`在声明时进行算术运算；

- 算术计算
  - `expr命令`
  - `bc命令`
  - `浮点数计算`
  - `内置函数`
  - `脚本`
```

## shell 变量

```markdown
- 参数相关：
  - `$0 $1 $2 $3...` 保存当前程序或脚本的名称
  - `$#` 参数个数
  - `$@`和`$*` 返回参数列表
- PID 号
  - `$$` 当前进程的 PID 号
  - `$!` 最后一个进程的 PID 号
- 怎么判断执行是否成功？*用`$?`返回上一条命令是否成功执行。如果成功执行，将返回数字 0(true)，否则返回 1(false)*
- 如何获取函数的返回值
  - return 返回，用`echo $？`获取
  - echo 返回，用`$(func)`获取
```

## array

```shell
# 数组
array_var=(1 2 3 4 5 6)
array_var[0]='test1'
array_var[1]='test2'
echo $array_var # 只会打印第一个元素
echo ${array_var[0]}
echo ${array_var[$index]}
echo ${array_var[@]} # 打印出所有值 (方法1, 更常用)
echo ${array_var[*]} # 打印出所有值 (方法2, 输出结果为使用IFS的单个字符串)
echo ${!array_var[@]} # 数组索引列表 (方法1, 更常用)
echo ${!array_var[*]} # 数组索引列表 (方法2, 输出结果为使用IFS的单个字符串)
echo ${#array_var[*]} # 打印数组长度
unset array_var[2] # 删除数组下标为2的元素值(该下标不会被删除)
unset array_var # 删除数组
```

```shell
# 关联数组
declare -A fruits_value # 声明关联数组
fruits_value=([apple]='100dollars' [orange]='150 dollars')
fruits_value[banana]='50 dollars'
echo "Apple costs ${fruits_value[apple]}"
echo ${!fruits_value[@]} # 关联数组索引 (方法1, 更常用)
echo ${!fruits_value[*]} # 关联数组索引 (方法2, 输出结果为使用IFS的单个字符串)
```

## 数值比较

```shell
# 数值比较
[ n1 -eq n2 ] # 相等
[ n1 -ge n2 ] # 大于等于
[ n1 -gt n2 ] # 大于
[ n1 -le n2 ] # 小于等于
[ n1 -lt n2 ] # 小于
[ n1 -ne n2 ] # 不等于
```


## 文件

```shell
#
[ -e file ] # 是否存在
[ -d file ] # 是否存在并是一个目录
[ -f file ] # 是否存在并使一个文件
[ -r file ] # 是否存在并可读
[ -s file ] # 是否存在并非空
[ -w file ] # 是否存在并可写
[ -x file ] # 是否存在并可执行
[ -O file ] # 是否存在并属于当前用户
[ -G file ] # 是否存在并属于当前用户的默认组(不会检查用户的所有组)
[ file1 -nt file2 ] # file1是否比file2新
[ file1 -ot file2 ] # file1是否比file2旧
```


```shell
# 双括号命令
(( val++ ))
(( val-- ))
(( ++val ))
(( --val ))
(( !val ))
(( ~val )) # 按位求反
(( val ** 2 )) # 幂运算
(( val << 2 )) # 位左移
(( val >> 2 )) # 位右移
(( val & 2 )) # 按位与
(( val | 2 )) # 按位或
(( val && 2 )) # 逻辑与
```

```shell
# 字符串比较
# 大部分字符串比较可以用单中括号 [] (test命令)完成.
# 但仍建议使用双中括号 [[]] (高级字符串比较),
# 因为使用Bash中的一些特殊符号例如 > 时不需要转义.

[[ "$str1" = "$str2" ]] # 相等
[[ "$str1" == "$str2" ]] # 相等
[[ "$str1" != "$str2" ]] # 不相等
[[ "$str1" > "$str2" ]] # 字母序大于
[[ "$str1" < "$str2" ]] # 字母序小于
[[ -z "$str" ]] # 空字符串
[[ -n "$str" ]] # 非空字符串
[[ $USER == r* ]] # (正则表达式)模式匹配(高级字符串比较独有)
```




## 命令行参数

```shell

name="$0" # 脚本路径(调用时使用的路径)
first="$1"
second="$2"
tenth="${10}" # 10以后的参数需要用花括号
echo "$#" # 参数个数
echo "${!#}" # 最后一个参数, 当参数个数为零时, 返回的是脚本路径
echo "$@" # 以列表方式打印所有参数, 更常用
echo "$*" # 类似于$@, 但返回单一字符串, 输出基于IFS的第一个字符分隔的各个参数
```






运行命令时带有 env

```shell
# {name}={value} {program}
# 例如, 为sh运行脚本添加环境变量:
curl https://foo.bar/script.sh | TEST=1 sh
```
