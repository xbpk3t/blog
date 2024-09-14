---
title: linux常用命令
date: 2024-09-14
---


```yaml

- name: du
  commands:
    - ["du -sh * | sort -h", "disk usage, 查看文件夹下各文件大小，并排序"]
- name: df
  commands:
    - ["df -lh", "disk free"]
- name: cat
  commands:
    - ["cat <string> > <filename>", "cover file"] # write file
    - ["cat <string> >> <filename>", "append file"]
    - ["cat /dev/null > {cursor}", "用cat命令清空文件"]
    - ["cat <filename> | sort | uniq -c | sort -k1,1nr | head -10", "统计文件中出现次数最多的前10个单词"]
- name: type
  commands:
    - ["type <command>", "用来查看某个命令是否是系统自带命令"]


- name: systemctl
  commands:
    - ["systemctl start|stop|restart|status <service>", "比如 systemctl status crond 检查crond是否启动"]
    - ["systemctl restart <service>"]
    - ["systemctl enable <service>", "设置开机自启，比如systemctl enable docker"]
    - ["systemctl disable <service>"]
    - ["systemctl list-unit-files | grep enable", "查看所有的开机自启项，也可以 systemctl list-unit-files | grep <service> 来查看某个service是否开机自启"]
- name: open
  commands:
    - ["open -t <filename>", "使用默认编辑器打开文件"]
    - ["open -e <filename>", "使用“文本编辑器”打开文件"]
    - ["open -a <editor> <filename>", "使用“指定应用程序”打开文件，比如 open -a goland，使用goland打开文件"]


- name: vim
  commands:
    - ["vim --version", "查看 vim 版本"]



- name: history
  commands:
    - ["history -20 -1", "display the last 20 commands"]
    - ["history 1 20", "display the first 20 commands"]
    - ["history 1", "display all commands(from first to last)"]
    - ["history 10600", "display from n to last"]
    - ["history -E", "with timestamp format"]
    - ["history -i", "with timestamp format"]

```


```yaml
#- name: linux
#  commands:
#    - ["print -P %F{<color> '<text>'", "用来在console打印彩色输出 ZSH understands the colors black, red, green, yellow, blue, magenta, cyan and white by default! The -P option of the print command allows you to let zsh do prompt expansion and with this insert colour changing codes into the output."]
#    - ["ip=$(ifconfig en0 | grep 'inet .*'  | sed 's/^.*inet//g' | sed 's/ netmask.*//g') && echo $ip"]
#    - ["trzsz --dragfile ssh <root@ip>", "trzsz"]
#    - ['echo -e "$(cmd)"', "使用 `echo -e`+双引号，避免（换行符等）特殊字符问题（保证特殊字符不会丢失）"]
# echo -n, echo默认换行，使用echo -n 可以解决字符串被换行的问题

#    - ["sed -n '1w <output-file>' <input-file>", "把input-file的第一行写入output-file"]

# vmrss
# vmmap -summary <pid | process name>


#  xxx:
#    - ps
#    - dig
#    - kill
#    - alias
#    - unalias
#    - setenv
#    - groups
#    - whoami
#    - tar
#    - gzip
#    - zip
#    - ln
#    - curl
#    - transfer files (ffff, xxx, zzz)
#    - wget
#    - rsync
#    - scp
#    - sort (sort -t ':' -k 3, 以第三栏进行排序)
#    - uniq (cat+sort+uniq很常用，把文件排序之后，再去重)
#    - awk
#    - nmap(用来扫描局域网下的IP地址)
#    - read file (cat/head/tail/more/less)
```





## network 操作


```yaml
- name: iproute2
  commands:
    - ["ip link show", "显示出所有可用网络接口的列表"]
    - ["ip neigh", "查看内核的ARP表"]
    - ["ip addr show", "相当于net-tools中的ifconfig"]

```








