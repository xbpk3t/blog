---
title: 信息源管理1（rss）
date: 2024-05-22
slug: feed-manage-1
---



## [2023/10/14] rss 基本认知和心态

[重新开始使用 RSS 阅读器 | Reorx’s Forge](https://reorx.com/blog/reinitiate-rss-reader/)

看完这篇文章，说说想法：

这篇文章说的使用 rss 之后反而导致信息焦虑，是很普遍的情况，之前看过几篇类似的帖子讨论这个话题。我也曾经深有体会。

**究其原因，还是对 rss 的认知有问题，从而导致心态有问题。**

我们使用 rss 就是为了自定义 feed，从各种推荐算法、翻炒、猎奇吸流量的垃圾场走出来，从信息茧房里走出来。

rss 的本质还是信息聚合工具。

我最多的时候用 rss 订阅了 500 多个 feed，其中视频 feed 大概将近 300 个？其他基本都是各种技术博客的 feed，以及乱七八糟的各种东西。总之很乱。

订阅数量多导致，基本上每次打开 ttrss 都会有新 feed，看完之后，刷新一下又有新 feed。这种情况下，能不焦虑吗？

***就像推石头的西西弗斯，甚至比他更惨，西西弗斯没得选，刷 feed 可是自找的，还是打着高效的目的和名头，做着折磨傻逼的事情。***

所以就在 MALI 项目 里搞了个 Combine multiple RSS feeds 的服务，直接在后台管理所有 feed，类似功能很好实现，看了一下开发时参考的几个类似功能的网站都已经关站了，估计这种工具型网站也很难有什么营收。可以自定义不同 rss 分类 的发布时间，我默认都设置为晚上 8 点。



这样就不会再有信息焦虑了，因为其他时间也不会有 feed 刷新出来。

甚至用了一段时间之后，晚上 8 点我都懒得刷，出门跑跑步，或者逛逛街。通常都要晚上洗完澡，临睡觉前，把 feed 随便刷刷。没空看的直接保存到 chrome 书签，或者直接打个 star 标记（根据 feed 类型决定，如果要花很长时间看的，或者需要反复看的通常就存到 chrome 书签，长文本但是不需要反复看的，总之是移动端能直接处理掉的就 star 掉，看完移除 star），有空的时候再看。这么处理之后，才感觉 rss 工具对自己确实是有正向作用的。

:::tip

***实际上，获取信息和摄取食物无异，直接使用 ttrss 等工具默认的刷新频率就像是小孩子吃零食，零食就在手边，根本停不下来，但是零食能顶正餐吗？不仅顶不了，到了真正要吃正餐的时候，反而吃不下。聚合 rss 之后，就像是吃正餐，每天到点了就有一顿大餐，直接点 5、6 个菜，直接吃到顶，不会焦虑，节省时间，还更有营养，吃不了就放冰箱里保鲜，想吃的时候拿出来吃。***

:::



---

另外，还想说的一点是，**并不是所有内容都适合做成 feed**，这点是最近才意识到的。也曾经在很长时间里，都对我造成很大的困扰，因为我知道有很多 geek 都在想着 All-In-One，把所有的信息都聚合到 rss 里，只通过 rss 获取所有需要的信息。我曾经也有同样的需求，我给 rsshub 提过不少 PR，也自己写过不止一个类似 rsshub 的项目，目的就是把自己需要的内容做成 rss。在完成这些东西的一瞬间，会觉得世界清静了，但是这个真的是一个很蠢的行为。

甚至我在很长的一段时间里，注销掉了很多主流平台的账号，一年多的时间，完全依靠订阅 rss 来维持之前需要在多个内容平台获取的内容。

这么做是没错的，**信息入口确实应该尽可能地精简，但是，有没有一种可能，不应该少到只有一个信息入口？不应该 All-In-One？**

两方面原因：

- 人是需要通过 xxx 交互，来产生多巴胺的。rss 的 feed 流会提供一种不同的爽感，但是不同于直接在网站上与人互动获得那种爽感。
- 即使是技术博客，相当部分的博客也不适合直接通过 rss 订阅，为什么？两点原因，首先，每个 coder 都有自己近期工作内容的侧重点，谁都不是全才，什么都会，也不需要什么都会。可能是因为之前某段时间的工作内容，所以订阅了该领域的博主，但是现在已经不需要学习相关内容了，也不需要学习这么深入的内容，这种情况再订阅就很蠢。另外，直接看博主的 `Archive页面` 能够获得上下文，可以从中看到该博主为什么要写这篇文章，这点博主通常是不会提及的。直接使用网页查看 blog，有助于我们更加理解内容。

总之，就是订阅的 rss 数量不要太多，实际上相当部分的内容并不适合做成 feed。另外就是不要太把这玩意当回事，就不会产生焦虑。





## [2024/2/14] feeds-merge + BriefCake + Gmail

:::tip

我对现在feeds-merge + briefcake + gmail来实现feed流的做法非常满意。

所以整理一下，在废弃掉ttrss之后的各种尝试。

:::


feeds-merge是最简单的，直接把之前MALI上的代码复制过来搞了个gh-actions [91go/feeds-merge](https://github.com/91go/feeds-merge)

真正麻烦的是rss-reader

一开始就是想着找个serverless providers把ttrss+rsshub部署上去

rsshub直接用官方提供的服务了，ttrss又太重了，所以就打算换成miniflux

> I've used ttrss for several years, but i'm a little tired of ttrss, which is too heavy and too slow. so I switched my rss-service to miniflux, but miniflux always occurs error when update feeds. And I can't get used to the miniflux layout. So I decided to use gmail as my rss-service.


那很简单嘛，对比了一下，选定了fly.io或者railway，因为fly.io不能自动更新image，所以使用railway

在railway上部署miniflux的过程不多说，非常简单，直接在supabase起一个pgsql实例，用docker image来启动miniflux即可

先是用了一段时间miniflux自带的UI

但是miniflux自带的UI又太丑了，所以就找了找custom UI的miniflux，找到了materialflux和reminiflux，

[reminiflux/reminiflux](https://github.com/reminiflux/reminiflux) 好用很多，布局比另一个漂亮，并且可以直接部署到gh-pages，只需要把miniflux token写入即可。也不需要操心什么token泄漏的问题，token是写到browser本地的，reminiflux直接读取。

但是用了几天之后发现问题还挺多的，相比于之前部署在VPS上的miniflux，部署在railway上之后，太慢了。每次打开页面，都要等半天才能刷新，并且 POLLING_FREQUENCY 默认60min，只能通过env来修改，不能直接修改，我就懒得搞了。并且相比ttrss，miniflux fetch rss时更严格，经常超时导致失败。所以就打算想想还有没有其他更好的方式。

现在想来，当时没有发觉的是，并不完全是feeds refresh interval的问题，而是feeds切换成这种方式之后，本身每天的feeds就没几条。其实就没必要miniflux这种rss-reader服务了。这是当时潜意识里已经意识到，但是实际上并不知道的。

再之后就想着，是不是换成之前用过的inoreader, feedbin或者feedly之类服务也还行？所以都试用了一下，实话说，比我之前印象中的还要垃圾，几乎是完全不可用的状态，拉取很慢、UI布局也有问题、快捷键不好用、页面操作响应也很慢(这几个都是PHP实现的，可以理解)等等。所以就想着还有没有其他方法。

再之后看到了 [skatkov/miniflux-email-client: Miniflux client that deliveres updates to email.](https://github.com/skatkov/miniflux-email-client)，想到直接用blogtrottr不就行了吗？

所以就直接用feeds-merge + blogtrottr + gmail，但是发现几个问题

blogtrottr send mail有real-time和interval digest几种hourly之类的几种模式。但是不管是使用real-time还是digest，都会有重复feed，比如说如果用"24hourly"，那就是昨天已经发过的feed，今天还会发。如果用 "hourly"，则重复更多，上个小时发过的，这个小时还会重复。

也就是说blogtrottr没有去重机制。

除此之外，两者还是各有缺点，real-time mode会发送上百条feed，导致gmail网页直接OOM，导致非常卡。

如果用digest模式，blogtrottr又不支持仅title模式，不仅会有上面的重复feed，并且还有很多我只想看title，完全不想看正文的feed，直接全文拉下来，就很烦。



这部分是当时的一些想法：

> Now I use blogtrottr to achieve rss2newsletter, and send digest to gmail. But one problem is that the schedule of blogtrottr is very unstable. For example, the schedule is set to 4 hours, but in fact it maybe more than 10 hours and the mail will not be sent, which is very stupid.

> So I need to remove all of these middle-service, directly send the digest of feed to gmail by github actions.


所以在用blogtrottr+gmail期间，我想到要不要直接基于gh-actions搞一个类似miniflux的服务，可以直接用reminiflux的UI，基于gh-actions cache来做feeds管理。

之前也玩了玩osmos之类几个gh-actions driven rss-reader，但是都有各种问题，比如不支持三栏布局（UI很丑）、不能fetch到所有feed（这点真的很迷，实话说这个就是基础功能有问题）、直接部署在gh-pages上（没有私密性）。总之是不好用。

所以换句话说就是想搞一个 better osmos

也是受到这个repo的启发 [firefart/rss_fetcher: golang program to send RSS feeds per E-Mail](https://github.com/firefart/rss_fetcher)

可以直接像这个repo一样，搞一个rss.db，直接放到gh-actions cache里，来做持久化。当时想着可以直接用BoltDB或者LevelDB来作为kvdb使用。

但是又觉得搞这玩意又得花点时间，可能最后也没什么产出。就懒得搞了。所以当时就写了这个。



:::danger

懒得搞了，现在直接用blogtrottr+gmail也还行，凑活着也能用。

在rss上面已经浪费太多时间了，实话说真的是时候去做“杠杆更高”的事情了，天天在这些鸡毛蒜皮的事情上打转，最后收获的也只能是鸡毛蒜皮。

把精力收回到真正重要的事情吧。

:::



再之后还是觉得blogtrottr太难用了，就搜了下其他类似服务，发现了briefcake，试用了一段时间，确实不错，支持only title模式，也没有上面说的blogtrottr的那些问题。不知不觉都用了一个多月了，觉得有必要写篇blog来总结一下整个过程。

以上是主线，还有一些分支任务，比如说：

中间还折腾过直接用ts来merge-feeds，实现完之后部署到，还是遇到docusaurus dependency conflicts的问题，知道解决不了。

但是搞这个也不是徒劳无获，发现不需要之前那么多gh-actions把feeds从yaml转HTML，再转RSS。直接在一个ci里用个HTML template从yaml转rss就可以了。


---

最后，复盘一下整个过程。

上面啰里八嗦写了一堆东西，实际上整个更换工具的过程，也花了我很长的时间。这篇blog也是之前整个操作的5篇shorthand捏合而成。

之所以耗费这么多时间的原因，还是因为目标不明确。另外，还存在一个限制。

之前思维上一直囿于“rss必须跨平台，必须要找到ReadKit或者NetNewsWire上支持的服务(比如fever或者google reader API之类的)”的限制，所以前面才一直想搞个类miniflux服务。之后发现其实并不是一定需要ReadKit这样的，难道mail不才是真正cross-platform的工具吗？所以卸载掉ReadKit了，刹那天地宽。

至于后面囿于Blogtrottr，也是因为我之前搜过类似blogtrottr的服务和开源项目，也试用了不少，花了不少时间，但是确实没有找到更好用的，所以潜意识就认为确实没有其他工具了。

总之，无论如何，虽然走了很多弯路，花了不少时间，还是找到了好用的工具链，来替代之前的ttrss，还是很不错。


## [2024/6/1]

```yaml
- url: https://github.com/reminiflux/reminiflux
  des: Alternative web frontend for miniflux. 相当于miniflux的ttrss UI，但是不支持Three-Column展示，可用性就比较差 "Support for three-column layout"

- url: https://github.com/HenryQW/Awesome-TTRSS
  des: ttrss

- url: https://github.com/miniflux/v2

- url: https://github.com/AboutRSS/ALL-about-RSS

```


feeds-merge + BriefCake + gmail 这套用了半年多了，没有丝毫不适，唯一的问题在于，感觉还是ttrss那种三栏布局更爽

并且也想把BriefCake踢掉，不想用什么第三方服务





### asmr

<details>
<summary>asmr</summary>


之前订阅了大量xxx的博主，但是其实并没有怎么看过，ytb也不给我推荐了

```yaml

#- url: https://www.youtube.com/@IchigoAudios/videos
#- url: https://www.youtube.com/@izumiaudio/videos
#- url: https://www.youtube.com/@kayleyasmrvis/videos
#- url: https://www.youtube.com/@LeyLeyVA/videos
#- url: https://www.youtube.com/@lovelylylyaudio/videos
#- url: https://www.youtube.com/@MoonBerryAudio/videos
#- url: https://www.youtube.com/@mommykinsASMR/videos
#- url: https://www.youtube.com/@PlushieASMR/videos
#- url: https://www.youtube.com/@OpheliaASMR/videos
#- url: https://www.youtube.com/@NoceurASMR/videos
#- url: https://www.youtube.com/@TheEggsmr/videos
#- url: https://www.youtube.com/@DarkDreamsASMR/videos
#- url: https://www.youtube.com/@VaevahAsmr222/videos
#- url: https://www.youtube.com/@WholesomeGirlfriendASMR/videos
#- url: https://www.youtube.com/@XartyVA/videos
#- url: https://www.youtube.com/@YandereASMR/videos
#- url: https://www.youtube.com/@Yubi/videos
#- url: https://www.youtube.com/@SolarGirlASMR/videos
#- url: https://www.youtube.com/@SoraVT./videos/videos
#- url: https://www.youtube.com/@springasmr4032/videos
#- url: https://www.youtube.com/@SquishyFroggieAudios/videos
#- url: https://www.youtube.com/@SunflowerASMR12/videos
#- url: https://www.youtube.com/@WishfulAudio/videos
#- url: https://www.youtube.com/@taylorsaudios/videos
#- url: https://www.youtube.com/@memoriaasmr/videos
#- url: https://www.youtube.com/@MileenaMachina/videos
#- url: https://www.youtube.com/@MemekoASMR/videos
#- url: https://www.youtube.com/@MamaYunyaa/videos
#- url: https://www.youtube.com/@JIASMR/videos/videos
#- url: https://www.youtube.com/@HalO.YUUSHA04/videos
#- url: https://www.youtube.com/@theworldofelisabethasmr/videos
#
#- url: https://www.youtube.com/@alexasmrtalks/videos
#- url: https://www.youtube.com/@AliSMR/videos
#- url: https://www.youtube.com/@alkielasmr/videos
#- url: https://www.youtube.com/@amethyst_audio2772/videos
#- url: https://www.youtube.com/@AnniePantsASMR/videos

```


```yaml
- url: https://www.youtube.com/@kasmr_/videos
- url: https://www.youtube.com/@LatteASMR
- url: https://www.youtube.com/@laurineasmr

- url: https://www.youtube.com/@yishaa520/videos

- url: https://www.youtube.com/@YarifyASMR

- url: https://www.youtube.com/@hypnosisblacktea
  des: 【催眠红茶】

- url: https://www.youtube.com/@asysam/videos
  des: 【川音ASMR】

- url: https://www.youtube.com/@YiZhenZhen
  des: 【易枕枕】

- url: https://www.youtube.com/@niconicokino/videos
  des:


- url: https://www.youtube.com/@user-cm6kn4tt4l
- url: https://www.youtube.com/@haru_tyann
- url: https://www.youtube.com/@ASMR-xh5dm
  des: 【中文ASMR】


- url: https://www.youtube.com/@user-wl7fx9qt7x
  des: 【筑雨未晴】

- url: https://www.youtube.com/@shenshi-sound
  des: 【绅士音声 ASMR】

#- url: https://www.youtube.com/@asmrsleepingroom3092/videos
#  des: 【青橙ASMR】质量还不错，停更两三年了

- url: https://www.youtube.com/@1_top/videos
  des: 【顾业】主要是搬运桥桥、小熊等几个博主，也停更快一年了

- url: https://www.youtube.com/@%EB%9D%BC%EB%B2%A4/videos

- url: https://www.youtube.com/@auddkasmr
  des: 【Irene】

- url: https://www.youtube.com/@RoseASMR/videos
- url: https://www.youtube.com/@skyeASMR
- url: https://www.youtube.com/@SleepySlugASMR
- url: https://www.youtube.com/@softseraphinaasmr
- url: https://www.youtube.com/@starryeyedasmr5187
- url: https://www.youtube.com/@ritaglitchASMR
- url: https://www.youtube.com/@QuietCreative
- url: https://www.youtube.com/@pomeko_ASMR./videos
- url: https://www.youtube.com/@ScottishMurmurs


- url: https://www.youtube.com/@soramsori/videos
- url: https://www.youtube.com/@FloraRodgersOfficial/videos

- url: https://www.youtube.com/@-gASMR-/videos
- url: https://www.youtube.com/@GibiASMR/videos
- url: https://www.youtube.com/@GwenGwizASMR
- url: https://www.youtube.com/@honeybelleasmr/videos
- url: https://www.youtube.com/@LunaBloomASMR/videos
- url: https://www.youtube.com/@MaimyASMR
- url: https://www.youtube.com/@MalASMR
- url: https://www.youtube.com/@NatalnyaASMR
- url: https://www.youtube.com/@pillowdearASMR
- url: https://www.youtube.com/@themashakata



- url: https://www.youtube.com/@asmrcham
- url: https://www.youtube.com/@asmreira3911
- url: https://www.youtube.com/@ASMRMaddy/videos
- url: https://www.youtube.com/@asmronuri/videos
- url: https://www.youtube.com/@ASMRSummer/videos
- url: https://www.youtube.com/@asmrtangzi/videos
- url: https://www.youtube.com/@asmreira3911/videos
- url: https://www.youtube.com/@asmrglow/videos
- url: https://www.youtube.com/@asmrbyj/videos
- url: https://www.youtube.com/@BENE_ASMR/videos
- url: https://www.youtube.com/@catplantASMR/videos
- url: https://www.youtube.com/@cherielorraine/videos
- url: https://www.youtube.com/@cloudcrystalasmr/videos




- url: https://space.bilibili.com/341854982/video

- url: https://space.bilibili.com/450790015/video

- url: https://space.bilibili.com/44070158/video

```


```yaml

# rsq

- url: https://www.youtube.com/@Leezypiano/videos
- url: https://www.youtube.com/@OL_Kasumi/videos

- url: https://www.youtube.com/@ARAYHOPE/videos


---

# massage

- url: https://www.youtube.com/@BoneCrackers/videos
- url: https://www.youtube.com/@VietnamHailong/videos

- url: https://www.youtube.com/@sjrelaxtv/videos
- url: https://www.youtube.com/@LynaHairASMR/videos
- url: https://www.youtube.com/@asmr-jp/videos
  des: 【JAPANESE ASMR MASSAGE】

- url: https://www.youtube.com/@esteASMR/videos



```

</details>







<details>
<summary>asmr</summary>

```yaml

- type: asmr
  urls:
    - name: ASMRGAY
      url: https://www.asmrgay.com/

# 低语

# [芝恩㱏 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E8%8A%9D%E6%81%A9%E3%B1%8F)
# [是喵宝呀 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%98%AF%E5%96%B5%E5%AE%9D%E5%91%80)
# [喵西早点睡 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E5%96%B5%E8%A5%BF%E6%97%A9%E7%82%B9%E7%9D%A1)
# [奶油米子 | ASMR基佬中心](https://www.asmrgay.com/asmr6/%E5%A5%B6%E6%B2%B9%E7%B1%B3%E5%AD%90)
# [婉儿 | ASMR基佬中心](https://www.asmrgay.com/asmr6/%E5%A9%89%E5%84%BF)
# [离二烟烟 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E7%A6%BB%E4%BA%8C%E7%83%9F%E7%83%9F)
# [Flora圆圆 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/Flora%E5%9C%86%E5%9C%86)
# [桥桥超温柔 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%A1%A5%E6%A1%A5%E8%B6%85%E6%B8%A9%E6%9F%94)

# [雾心宝贝 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E9%9B%BE%E5%BF%83%E5%AE%9D%E8%B4%9D)
# [小元 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E5%B0%8F%E5%85%83)
# [Rainnight雨 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/Rainnight%E9%9B%A8)
# [大宝 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E5%A4%A7%E5%AE%9D)

# [小爱 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E5%B0%8F%E7%88%B1)

# [一朵轩轩 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E4%B8%80%E6%9C%B5%E8%BD%A9%E8%BD%A9)

# [bitchery | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/bitchery)

# [凌晨三点钟 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E5%87%8C%E6%99%A8%E4%B8%89%E7%82%B9%E9%92%9F)

# [猫耳sugar | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E7%8C%AB%E8%80%B3sugar)

# [暴躁啊御 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%9A%B4%E8%BA%81%E5%95%8A%E5%BE%A1)

# [奈兔sama | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E5%A5%88%E5%85%94sama)

# *[杭白芷 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%9D%AD%E7%99%BD%E8%8A%B7)*

# [温柔的尔耳 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%B8%A9%E6%9F%94%E7%9A%84%E5%B0%94%E8%80%B3)

# [痴痴的小瑶儿 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E7%97%B4%E7%97%B4%E7%9A%84%E5%B0%8F%E7%91%B6%E5%84%BF)

# [奶乎乎的花妖 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E5%A5%B6%E4%B9%8E%E4%B9%8E%E7%9A%84%E8%8A%B1%E5%A6%96)

# [林晓蜜 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%9E%97%E6%99%93%E8%9C%9C)

# [桃夭 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%A1%83%E5%A4%AD)

# [Rain | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/Rain)

# [Miss哈尼 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/Miss%E5%93%88%E5%B0%BC)

# [P站ASMR录音 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/P%E7%AB%99ASMR%E5%BD%95%E9%9F%B3)

# [林暮色 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%9E%97%E6%9A%AE%E8%89%B2)

# [无名音声社 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%97%A0%E5%90%8D%E9%9F%B3%E5%A3%B0%E7%A4%BE)

# [蛇蛇助眠 | ASMR基佬中心](https://www.asmrgay.com/asmr6/%E8%9B%87%E8%9B%87%E5%8A%A9%E7%9C%A0)

# [闪亮银 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E9%97%AA%E4%BA%AE%E9%93%B6)

# [桑九学姐 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E6%A1%91%E4%B9%9D%E5%AD%A6%E5%A7%90)

# [说人话的吊 | ASMR基佬中心](https://www.asmrgay.com/asmr/%E4%B8%AD%E6%96%87%E9%9F%B3%E5%A3%B0/%E8%AF%B4%E4%BA%BA%E8%AF%9D%E7%9A%84%E5%90%8A)

# [池喵 | ASMR基佬中心](https://www.asmrgay.com/asmr6/%E6%B1%A0%E5%96%B5) 很骚


```

</details>






