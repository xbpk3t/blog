// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// import {left} from "@popperjs/core";
// const { remarkKroki } = await import('remark-kroki');
// import {remarkKroki} from 'remark-kroki';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Lucas Blog',
  tagline: 'just for the record',
  favicon: 'img/favicon.ico',
  staticDirectories: ['static'],

  // Set the production url of your site here
  url: 'https://blog.wrss.top',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'hxhac', // Usually your GitHub org/user name.
  // projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw', // docusaurus build 时忽略坏链
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        // docs: {
        //   routeBasePath: '/',
        //   sidebarCollapsible: false, // 默认展开所有侧边栏
        //   // sidebarPath: require.resolve('./sidebars.js'),
        //   // remarkPlugins: [
        //   //   [
        //   //     remarkKroki,
        //   //     {
        //   //       alias: ['plantuml'],
        //   //       server: 'https://kroki.io'
        //   //     }
        //   //   ]
        //   // ]
        // },
        docs: false,
        blog: {
          routeBasePath: '/',
          onUntruncatedBlogPosts: 'ignore',
          blogSidebarCount: "ALL",
          postsPerPage: 3,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-G0687BFERF',
          anonymizeIP: true,
        },
      }) satisfies Preset.Options,
    ],
  ],

  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
    // [
    //   '@docusaurus/plugin-ideal-image',
    //   {
    //     disableInDev: false,
    //   },
    // ],
    // 'docusaurus-plugin-sass',
    // [
    //   require.resolve('@easyops-cn/docusaurus-search-local'),
    //   {
    //     hashed: true,
    //     indexDocs: true,
    //     language: ['en', 'zh'],
    //     highlightSearchTermsOnTargetPage: true,
    //   }
    // ]
  ],
  themeConfig:
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Hacking',
        logo: {
          alt: 'Hacking',
          src: 'img/logo.svg',
        },
        hideOnScroll: false,
        // items: [
        //   // {to: '/docs/algo', label: 'Algo', position: "left", type: "docSidebar", sidebarId: "algo"},
        //   // {to: '/docs/arch', label: 'Arch', position: "left", type: "docSidebar", sidebarId: "arch"},
        //   // {to: '/docs/works', label: 'Works', position: "left", type: "docSidebar", sidebarId: "works"},
        //   // {to: '/docs/zzz', label: '📚 zzz', position: "left", type: "docSidebar", sidebarId: "zzz"},
        //   // {to: '/docs', label: 'zzz', position: "left", type: "docSidebar", sidebarId: "zzz"},
        //   // {to: '/blog/archive', label: '🌟 Blog', position: "right"},
        //   // {to: '/docs/diary', label: '🏝️ Diary', position: "right", type: "docSidebar", sidebarId: "diary"},
        //   // {
        //   //   href: 'https://github.com/hxhac',
        //   //   label: 'GitHub',
        //   //   position: 'right',
        //   // },
        // ],
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} Docs. Built with Docusaurus. Hosted by Github & Cloudflare.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "sql", "java"],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      giscus: {
        repo: 'hxhac/blog',
        repoId: 'R_kgDOMu21Og',
        category: 'General',
        categoryId: 'DIC_kwDOMu21Os4CiXzW',
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        config: {}
      },
    }) satisfies Preset.ThemeConfig,
};

module.exports = config;
