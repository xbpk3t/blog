---
title: linux性能监控命令
---

## monitor 操作

```yaml

- name: sar
  commands:
    - ["sar <type> <type-param> <interval> <count>", "只有type参数必填，其他可选. 类型: 比如CPU、内存、网络. 类型参数: 有的类型带有参数，有的没有。这里的DEV，代表的是监控网卡信息. 时间间隔，表示多少秒采样一次数据，这里的1就是1秒. 次数，表示采样的次数。比如时间间隔是3，采样次数是4，那么sar命令将会阻塞12秒钟"]
    - ["sar -u", "CPU利用率"]
    - ["sar -q", "CPU负载"]
    - ["sar -I", "CPU中断"]
    - ["sar -w", "CPU上下文切换"]
    - ["sar -r", "内存利用率"]
    - ["sar -S", "swap交换分区"]
    - ["sar -v", "内核使用情况"]
    - ["sar -B", "内存分页"]
    - ["sar -d", "相当于iostat"]


- name: iperf3
  commands:
    - ["iperf3 -c 192.168.30.2", "测试 TCP 吞吐量"]
    - ["", "测试 UDP 吞吐量"]
    - ["iperf3 -c 192.168.0.120 -P 30 -t 60", "测试多线程 TCP 吞吐量"]
    - ["iperf3 -u -c 192.168.1.1 -b 5M -P 30 -t 60", "测试多线程 UDP 吞吐量"]
    - ["iperf3 -c 192.168.0.120 -d -t 60", "进行上下行带宽（TCP双向传输）"]
    - ["iperf3 -u -c 192.168.1.1 -b 100M -d -t 60", "测试上下行带宽（UDP双向传输）"]

- name: netstat
  des: 显示网络连接，路由表和网络接口信息
- name: iostat
  des: 用来查看 Linux 的 IO 负载情况
- name: vmstat
  des: 实时显示网络流量和包数
- name: numastat
```


