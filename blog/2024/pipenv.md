---
title: pipenv
date: 2024-09-14
---


```yaml
- c: pipenv install
  x: 安装虚拟环境或者第三方库，如果没有pipenv环境，就会创建环境
- c: pipenv install <service>
  x: 如果已经有pipenv环境，则直接安装拓展包。比如 pipenv install scrapy。也可以直接安装多个pkg，比如 pipenv install flask flask-wtf
- c: pipenv shell
  x: 激活虚拟环境
- c: pipenv lock
  x: 锁定并生成Pipfile.lock文件
- c: pipenv lock -r
  x: 生成requirements.txt文件
- c: pipenv uninstall --all
  x: 卸载全部包并从Pipfile中移除
- c: pipenv lock -r --dev > requirements.txt
  x: 生成requirements.txt文件
- c: pipenv install -r requirements.txt
  x: 在pipenv下通过requirements.txt安装拓展包
- c: pipenv open <xxx>
  x: 在浏览器中查看对应拓展包
- c: pipenv graph
  x: 显示当前依赖关系图信息
- c: pipenv check
  x: 检查安全漏洞
- c: pipenv update
  x: 升级所有拓展
- c: pipenv update <pkg>
  x: 升级某个拓展
```