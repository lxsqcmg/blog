module.exports = {
  title: "木子李的松",
  description: "lxs的个人技术站",
  base: "/blog/",

  // 主题配置
  themeConfig: {
    // 导航栏连接
    nav: [
      {
        text: "前端框架文档",
        items: [
          { text: "基础理论", link: "/frameDoc/mianshi/" },
          { text: "HTML", link: "/frameDoc/html/" },
          { text: "CSS", link: "/frameDoc/css/css.md" },
          { text: "JavaScript", link: "/frameDoc/javaScript/" },
          { text: "TypeScript", link: "/frameDoc/typeScript/" },
          // { text: "Vue", link: "/frameDoc/vue2/vue2.md" },
          { text: "Vue3", link: "/frameDoc/vue3/" },
          // { text: "React", link: "/frameDoc/react/react.md" },
        ],
      },
      {
        text: "服务端文档",
        items: [{ text: "NodeJS", link: "/serverDoc/nodeJS/" }],
      },
      {
        text: "打包工具",
        items: [{ text: "Webpack", link: "/packTool/webpack/" }],
      },
      {
        text: "实用工具",
        items: [
          { text: "Git", link: "/practicalTool/git/git.md" },
          { text: "nodeJS版本控制", link: "/practicalTool/nodeJS/nodeJS.md" },
        ],
      },
      {
        text: "杂项",
        items: [
          {
            text: "学习",
            items: [
              { text: "英语", link: "/study/english/english.md" },
            ],
          },
          {
            text: "书籍",
            items: [
              { text: "书籍", link: "/study/books/books.md" },
            ],
          },
          {
            text: "资源",
            items: [
              { text: "资源", link: "/study/other/other.md" },
            ],
          },
        ],
      },
      {
        text: "Github",
        link: "https://github.com/lxsqcmg/blog",
        target: "_blank",
      },
    ],

    // 侧边栏
    sidebar: {
      /**
       * 前端框架文档
       */
      // 基础理论
      "/frameDoc/mianshi/": ["", "Vue", "http", "ajax", "browser", "React"],
      // html
      "/frameDoc/html/": ["", "form", "table"],
      // CSS
      "/frameDoc/css/": ["css"],
      // javaScript
      "/frameDoc/javaScript/": ["","Map","Set","Symbol"],
      // typeScript
      "/frameDoc/typeScript/": [""],
      // vue2
      // "/frameDoc/vue2/": ["vue2"],
      // vue3
      "/frameDoc/vue3/": [""],
      // react
      // "/frameDoc/react/": ["react"],

      /**
       * 服务端文档
       */
      // nodeJS
      "/serverDoc/nodeJS/": ["", "nodeJS"],

      /**
       * 打包工具
       */
      // webpack
      "/packTool/webpack/": [
        "",
        "source.md",
        "install.md",
        "start.md",
        "static.md",
        "core.md",
        "advanced.md",
        "case.md",
        "optimization.md",
        "loader.md",
        "plugin.md",
      ],

      /**
       * 实用工具
       */
      // git
      "/practicalTool/git/": ["git"],
      // nodeJS版本控制
      "/practicalTool/nodeJS/": ["nodeJS"],


      /**
       * 杂项
       */
      // 英语
      "/study/english/": ["english"],
      //书籍
      "/study/books/": ["books"],
      // 资源
      "/study/other/": ["other"]

      
    },

    // 侧边栏嵌套最大深度
    sidebarDepth: 3,

    // 侧边栏显示所有页面链接
    // displayAllHeaders: true,

    // 页面滚动
    smoothScroll: true,
  },
};
