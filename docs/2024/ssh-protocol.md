---
title: ssh协议
date:  2024-09-14
---



## ssh 相关命令

```yaml
- name: ssh-keygen
  commands:
    - ["ssh-keygen -t ed25519 -C <identifier|comment|email>", "默认使用 rsa 算法生成key，但是建议使用 ed25519算法，更安全更快。使用 -C 来标识，比如说github就标识gh，我通常直接把 identifier 和 passphrase密码 设置为相同的，防止忘掉。产生公钥与私钥对，其中id_rsa 私钥，保留不动即可，后续 ssh 命令会自动读取此文件。id_rsa.pub 公钥，此文件需要被保存至目标服务器，用作验证。"]
    # ssh-keygen -t ed25519 -f my_github_ed25519  -C "me@github"
    # ssh-keygen -t ed25519 -f my_gitee_ed25519   -C "me@gitee" # 我在 Gitee
    # ssh-keygen -t ed25519 -f my_gitlab_ed25519  -C "me@gitlab" # 我在 GitLab
    # ssh-keygen -t ed25519 -f my_company_ed25519 -C "email@example.com" # 我在企业
    - ["ssh-copy-id -i <~/.ssh/id_rsa.pub> <user>@<ip>", "上传公钥到目标服务器（将本机的公钥复制到远程机器的authorized_keys文件中），相当于 pbcopy命令。⚠️ 复制之后最好在服务端验证一下。"]
    - ["chmod 755 ~/.ssh && chmod 644 ~/.ssh/known_hosts && chmod 600 ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa.pub", "⚠️ 在 客户端 设置权限。修改 known_hosts文件 的权限。修改 私钥和公钥 的权限。"]

```






## 怎么用 ssh 连接服务器？


```shell

# 产生公钥与私钥对
# id_rsa 私钥，保留不动即可，后续 ssh 命令会自动读取此文件。
# id_rsa.pub 公钥，此文件需要被保存至目标服务器，用作验证。
ssh-keygen

# ⚠️ 默认使用 rsa 算法生成key，但是建议使用 ed25519算法，更安全更快
ssh-keygen -t ed25519
# ⚠️ 使用 -C 来标识，比如说github就标识gh，我通常直接把 标识 和 passphrase密码 设置为相同的，防止忘掉
# ssh-keygen -t {rsa} -b {4096} -C "{comment|email}"
ssh-keygen -t ed25519 -C "xxx"
# ssh-keygen -t ed25519 -f my_github_ed25519  -C "me@github"
# ssh-keygen -t ed25519 -f my_gitee_ed25519   -C "me@gitee" # 我在 Gitee
# ssh-keygen -t ed25519 -f my_gitlab_ed25519  -C "me@gitlab" # 我在 GitLab
# ssh-keygen -t ed25519 -f my_company_ed25519 -C "email@example.com" # 我在企业

```

将常用 SSH 信息写进全局配置文件，省得连接时配置。

编辑 ~/.ssh/config 文件：

```shell

# 关于别名
# Host 是别名，HostName 是真正的域名。
# 得益于别名，你可以直接以别名访问地址。例如：
# 无别名： git clone git@github.com:torvalds/linux.git
# 有别名： git clone github:torvalds/linux.git
# 本例中使用与域名一致的别名，以免错误的配置导致登录不上。

# 关于代理
# SOCKS 代理格式： ProxyCommand connect -S localhost:1080  %h %p
# HTTP 代理格式： ProxyCommand connect -H localhost:1080  %h %p
## SSH 代理依赖外部程序，这里使用了 Git for Windows 同捆的 connect.exe。
## Linux 下使用该代理方式需要额外安装 connect-proxy。

# 我在 GitHub
Host github.com
  Hostname github.com
#  ProxyCommand connect -H localhost:1080  %h %p
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/my_github_ed25519

# 我在 GitLab
Host gitlab.com
  Hostname gitlab.com
#  ProxyCommand connect -H localhost:1080  %h %p
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/my_gitlab_ed25519

# 我在 Gitee
Host gitee.com
  Hostname gitee.com
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/my_gitee_ed25519

# 我在企业
Host example.com
  Hostname example.com
  Port 22
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/my_company_ed25519

# Private 192.168.2.125
Host iPhone
HostName  192.168.2.125
User root
IdentityFile ~/.ssh/id_rsa_Theos125

# Private gitlab.v6h5.
Host gitlab.v6h5.cn
HostName  gitlab.v6h5.
User git
IdentityFile ~/.ssh/id_rsa_qinbaowan


```

如果你懒得在每台机器上都配置一遍，把 ~/.ssh 下的文件放在安全的地方拷走即可。


```shell
# 上传公钥 到目标服务器
# 相当于 pbcopy命令
# 将本机的公钥复制到远程机器的authorized_keys文件中
# ⚠️ 复制之后最好在服务端验证一下
ssh-copy-id <user>@<ip>
# 指定 pub
ssh-copy-id -i <~/.ssh/id_rsa.pub> <user>@<ip>

# 尝试使用密钥登录
# 设置 ~/.ssh/config 后，就不需要 ssh <user>@<ip> ，可以直接
# 使用ssh config配置文件来管理ssh连接
ssh <Host>


```


以上是一种配置方法，也可以

不手动维护每个私钥，直接通配为：

这种情况下会自动把密钥保存到 apple 的 keychain 中

```shell

Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
  IdentityFile ~/.ssh/id_rsa # Keep any old key files if you want


```

然后将私钥添加到 ssh agent：

```shell

ssh-add -K ~/.ssh/id_ed25519

```

当然，这种方法配置方便，但是使用时不如上面的方案方便。


---

登录时可能会存在以下问题：

- 权限问题

```shell
# ⚠️ 在 客户端 设置权限
# 修改 known_hosts文件 的权限
# 修改 私钥和公钥 的权限
chmod 755 ~/.ssh && chmod 644 ~/.ssh/known_hosts && chmod 600 ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa.pub

```

- 可能禁用了“公钥验证模式”，按照以下配置进行修改

```shell

RSAAuthentication yes               # 是否可用RSA密钥对验证
PubkeyAuthentication yes            # 是否可用公钥方式验证
PasswordAuthentication no           # 是否可用密码验证（可用于限制密码登录）
PermitRootLogin prohibit-password   # 是否可用密码登录root用户（可用于限制密码登录）

```


---

保持 ssh 服务连接不断开的方法

也就是配置 心跳连接，**直接在客户端配置即可，不需要在服务端配置**

客户端也不需要在 `/etc/ssh/ssh_config` 进行全局配置，直接在 `~/.ssh/config` 配置当前用户生效即可

```shell

Host *
 ServerAliveInterval 60
 ServerAliveCountMax 3

# ClientAliveInterval 指定了服务器端向客户端请求消息 的时间间隔，默认是 0 ，不发送。ClientAliveInterval 60 表示每分钟发送一次，然后客户端响应，这样就保持长连接了
# ClientAliveCountMax 表示服务器发出请求后客户端没有响应的次数达到一定值，就自动断开，使用默认值 3 即可

```


修改配置后注意

```shell
service sshd restart
```



---


怎么整理多个 vps 密钥和登录命令？

:::tip
最好还是用堡垒机或者跳板机

没有的话，或者自己的服务器，目前最方便的还是直接把 vps 登录命令做成 alfred 的 snip

:::

- [quantumsheep/sshs: Terminal user interface for SSH](https://github.com/quantumsheep/sshs) 实际上还是需要自己把 vps 信息在 `~/.ssh/config` 维护，迁移时还需要多迁移一份文件。



## 跳板机

ProxyCommand

ProxyJump

```shell

# 使用ProxyCommand或者ProxyJump
vim ~/.ssh/config

# ProxyCommand
Host X
    HostName 10.251.252.53
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa

Host xfljump
    HostName 10.249.69.128
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ProxyCommand ssh X -W %h:%p

# ProxyJump
Host xfljump
    HostName 10.249.69.128
    User root
    ProxyJump root@10.251.252.53


```
