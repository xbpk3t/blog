---
title: tcpdump
date:  2024-09-14
---


```yaml
- name: tcpdump
  des: used to capture packet
  commands:
    - ["tcpdump -i eth0 -vnn host <host>", "抓取包含172.16.1.122的数据包  tcpdump -i eth0 -vnn host 172.16.1.122"]
    - ["tcpdump -i eth0 -vnn net <segment>", "抓取包含172.16.1.0/24网段的数据包  tcpdump -i eth0 -vnn net 172.16.1.0/24"]
    - ["tcpdump -i eth0 -vnn port <port>", "抓取包含端口22的数据包  tcpdump -i eth0 -vnn port 22"]
    - ["tcpdump -i eth0 -vnn <protocol>", "抓取指定协议的数据包，protocol可以设置为udp, icmp, arp, ip"]
    - ["tcpdump -i eth0 -vnn src host 172.16.1.122", "抓取源ip是172.16.1.122数据包"]
    - ["tcpdump -i eth0 -vnn dst host 172.16.1.122", "抓取目的ip是172.16.1.122数据包"]
    - ["tcpdump -i eth0 -A 'tcp && port 80'"]
```

