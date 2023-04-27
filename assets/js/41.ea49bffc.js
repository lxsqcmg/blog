(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{354:function(s,a,e){"use strict";e.r(a);var t=e(14),n=Object(t.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"git基本用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git基本用法"}},[s._v("#")]),s._v(" Git基本用法")]),s._v(" "),a("h2",{attrs:{id:"_1-克隆"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-克隆"}},[s._v("#")]),s._v(" 1. 克隆")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git clone 远程地址\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"_2-工作区"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-工作区"}},[s._v("#")]),s._v(" 2. 工作区")]),s._v(" "),a("p",[s._v("**描述：**工作区就是你windows系统的项目文件所在地")]),s._v(" "),a("p",[a("strong",[s._v("工作区---工作区")])]),s._v(" "),a("p",[s._v("将修改过的"),a("code",[s._v("还没有放入")]),s._v("暂存区的"),a("code",[s._v("所有")]),s._v("文件恢复：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git checkout .   //只是对原有的文件恢复，新建的文件不行\ngit restore .   //只是对原有的文件恢复，新建的文件不行\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("将修改过的"),a("code",[s._v("还没有放入")]),s._v("暂存区的"),a("code",[s._v("单个")]),s._v("文件恢复：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git checkout 文件名    //文件名通过 git status 查看\n\ngit restore 文件名     //文件名通过 git status 查看\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("工作区---暂存区")])]),s._v(" "),a("p",[s._v("将"),a("code",[s._v("已经放入")]),s._v("暂存区的"),a("code",[s._v("所有")]),s._v("文件撤销：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git reset HEAD -- .\n\ngit restore --staged .\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("将"),a("code",[s._v("已经放入")]),s._v("暂存区的"),a("code",[s._v("单个")]),s._v("文件撤销：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git reset HEAD -- 文件名   // 文件名通过 git status 查看\n\ngit restore --staged 文件名  // 文件名通过 git status 查看\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[a("strong",[s._v("工作区---本地仓库")])]),s._v(" "),a("p",[s._v("将"),a("code",[s._v("已经放入")]),s._v("本地仓库的"),a("code",[s._v("所有")]),s._v("文件回滚到以前的某一个版本：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git reset --hard HEAD^  // 回滚到上一个版本\n\ngit reset --hard HEAD^^  // 回滚到上上个版本（上两个）\n\ngit reset --hard HEAD~100 // 回滚到前100个版本\n\ngit reset --hard 版本号   //版本号通过git log 或 git reflog查看   (不保留已修改内容) \ngit reset --soft 版本号   //版本号通过git log 或 git reflog查看   (保留已修改内容)\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("将"),a("code",[s._v("已经放入")]),s._v("本地仓库的"),a("code",[s._v("单个")]),s._v("文件回滚到以前的某一个版本:")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("你还是直接利用插件来对比版本，直接复制过去吧！插件名：Git History\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("将"),a("code",[s._v("已经回滚")]),s._v("的本地仓库的"),a("code",[s._v("所有")]),s._v("文件恢复到以前的某一个版本：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git reset --hard 版本号   //版本号通过git log 或 git reflog查看   (不保留已修改内容) \n\ngit reset --soft 版本号   //版本号通过git log 或 git reflog查看   (保留已修改内容)\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h2",{attrs:{id:"_3-暂存区"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-暂存区"}},[s._v("#")]),s._v(" 3. 暂存区")]),s._v(" "),a("p",[s._v("将所有文件提交到暂存区")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git add .\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("将单个文件提交到暂存区")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git add 文件名  //文件名通过 git status 查看\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"_4-本地仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-本地仓库"}},[s._v("#")]),s._v(" 4. 本地仓库")]),s._v(" "),a("p",[s._v("提交：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('git commit -m "文件描述"\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"_5-远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-远程仓库"}},[s._v("#")]),s._v(" 5.  远程仓库")]),s._v(" "),a("p",[s._v("推送：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git push\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"_6-拉取-从远程仓库拉取"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-拉取-从远程仓库拉取"}},[s._v("#")]),s._v(" 6. 拉取 （从远程仓库拉取）")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git pull\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"_7-查看状态"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-查看状态"}},[s._v("#")]),s._v(" 7. 查看状态")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git status // 只显示改动的文件名\n\ngit diff // 查看所有文件详细改动\n\ngit diff 文件名 // 查看单个文件的详细改动\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h2",{attrs:{id:"_8-查看历史版本-日志"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-查看历史版本-日志"}},[s._v("#")]),s._v(" 8. 查看历史版本（日志）")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git log  // 按 q 退出   （详细版）\n\ngit log -–pretty=oneline （简洁版）\n\ngit reflog  // 获取版本号（可以查看已经回滚过的）\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h2",{attrs:{id:"_9-分支合并"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_9-分支合并"}},[s._v("#")]),s._v(" 9. 分支合并")]),s._v(" "),a("p",[s._v("查看分支")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git branch\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("新建分支，例如新建"),a("code",[s._v("dev")]),s._v("分支")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git branch dev\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("切换分支")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git checkout dev\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("将"),a("code",[s._v("dev")]),s._v("分支合并分支到"),a("code",[s._v("master")]),s._v("主分支")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("1. 切换到主分支\ngit checkout master\n\n2. 把分支代码merge到主分支\ngit merge dev\n\n3. 提交\ngit push\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("将"),a("code",[s._v("master")]),s._v("分支合并分支到"),a("code",[s._v("dev")]),s._v("主分支")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("1. 切换到dev分支\ngit checkout dev\n\n2. 把主分支代码merge到dev分支\ngit merge master\n\n3. 提交\ngit push\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("删除"),a("code",[s._v("dev")]),s._v("分支")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git branch -d dev\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"_10-储藏"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-储藏"}},[s._v("#")]),s._v(" 10. 储藏")]),s._v(" "),a("p",[s._v('"暂存" 可以获取你工作目录的中间状态（也就是你修改过的文件和暂存的变更），并将它保存到一个未完结变更的堆栈中，随时可以重新应用。')]),s._v(" "),a("p",[s._v("储藏")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git stash\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("查看储藏")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git stash list\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("应用最近的储藏")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git stash apply\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("应用更早的储藏")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git stash apply stash@{2}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("应用并删除储藏")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("git stash pop\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"将远程设置为上游分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#将远程设置为上游分支"}},[s._v("#")]),s._v(" 将远程设置为上游分支")]),s._v(" "),a("div",{staticClass:"language-git line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-git"}},[a("code",[s._v("git push --set-upstream origin gh-pages\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h2",{attrs:{id:"代码提交规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码提交规范"}},[s._v("#")]),s._v(" 代码提交规范")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("feat")]),s._v("：提交新功能")]),s._v(" "),a("li",[a("strong",[s._v("fix")]),s._v("：修复了bug")]),s._v(" "),a("li",[a("strong",[s._v("docs")]),s._v("：只修改了文档")]),s._v(" "),a("li",[a("strong",[s._v("style")]),s._v("：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）")]),s._v(" "),a("li",[a("strong",[s._v("refactor")]),s._v("：代码重构，既没修复bug也没有添加新功能")]),s._v(" "),a("li",[a("strong",[s._v("perf")]),s._v("：性能优化，提高性能的代码更改")]),s._v(" "),a("li",[a("strong",[s._v("test")]),s._v("：添加或修改代码测试")]),s._v(" "),a("li",[a("strong",[s._v("chore")]),s._v("：对构建流程或辅助工具和依赖库（如文档生成等）的更改")])])])}),[],!1,null,null,null);a.default=n.exports}}]);