---
title: ssh协议
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