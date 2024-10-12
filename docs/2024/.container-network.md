



## calico

### calico arch


calico 包括如下重要组件：Felix，etcd，BGP Client，BGP Route Reflector。下面分 别说明一下这些组件。

- Felix：主要负责路由配置以及ACLS规则的配置以及下发，它存在在每个node节点上。
- etcd：分布式键值存储，主要负责网络元数据一致性，确保Calico网络状态的准确性，可以与kubernetes共用；
- BGPClient（BIRD），主要负责把 Felix写入 kernel的路由信息分发到当前 Calico 网 络，确保 workload间的通信的有效性；
- BGPRoute Reflector（BIRD），大规模部署时使用，摒弃所有节点互联的mesh模式，通 过一个或者多个 BGPRoute Reflector 来完成集中式的路由分发

通过将整个互联网的可扩展IP网络原则压缩到数据中心级别，Calico在每一个计算节点利用Linuxkernel 实现了一个高效的 vRouter来负责数据转发，而每个vRouter通 过BGP协议负责把自己上运行的 workload的路由信息向整个Calico 网络内传播，

小规模部署可以直接互联，大规模下可通过指定的BGProute reflector 来完成。这样保证最终所有的workload之间的数据流量都是通过IP包的方式完成互联的。



### calico works?


1. 每个节点上都运行一个名为 calico-node 的代理程序，该程序负责虚拟网络的创建和管理。
2. Calico 使用 BGP（Border Gateway Protocol）协议来路由容器之间的流量，它利用节点上的路由表来确定流量的路径。
3. Calico 还支持网络策略，允许管理员定义网络访问控制规则，以确保容器之间的安全通信。


## flannel




```markdown

Flannel 实质上是一种“覆盖网络（overlay network）”，也就是将TCP数据包装在另 一种网络包里面进行路由转发和通信，目前已经支持UDP、VxLAN、AWS VPC和GCE路由等数据转发方式。

默认的节点间数据通信方式是UDP转发。

数据从源容器中发出后，经由所在主机的docker0虚拟网卡转发到flannel0虚拟网卡（先可以不经过docker0网卡，使用cni模式），这是个P2P的虚拟网卡，flanneld服务监听在网卡的另外一端。

Flannel 通过 Etcd服务维护了一张节点间的路由表，详细记录了各节点子网网段。

源主机的flanneld服务将原本的数据内容UDP封装后根据自己的路由表投递给目的节点的flanneld服务，数据到达以后被解包，然后直接进入目的节点的flannel0虚拟网卡，然后被转发到目的主机的docker0虚拟网卡，最后就像本机容器通信一下的有

docker0 路由到达目标容器。

flannel 在进行路由转发的基础上进行了封包解包的操作，这样浪费了CPU的计算资源。

```

1. 每个节点上都运行一个名为 flanneld 的代理程序，该程序负责创建和管理虚拟网络。
2. flanneld 为每个节点分配一个唯一的子网（称为 flannel 子网）。
3. 当容器创建时，flanneld 会为容器分配一个唯一的 IP 地址，并将其路由到 flannel 子网上的其他节点。


```markdown
Flannel 会在每一个宿主机上运行名为 flanneld 代理，其负责为宿主机预先分配一个Subnet 子网，并为 Pod 分配ip地址。Flannel 使用 Kubernetes 或 etcd 来存储网络配置、分配的子网和主机公共 ip 等信息，数据包则通过 VXLAN、UDP 或 host-gw 这些类型的后端机制进行转发。

对比三种网络，udp 主要是利用 tun 设备来模拟一个虚拟网络进行通信；vxlan 模式主要是利用 vxlan 实现一个三层的覆盖网络，利用 flannel1 这个 vtep 设备来进行封拆包，然后进行路由转发实现通信；而 host-gw 网络则更为直接，直接改变二层网络的路由信息，实现数据包的转发，从而省去中间层，通信效率更高。
```

pull机制，分配subnet子网，分为storage和backend两部分

