# Git基本用法

## 1. 克隆

```
git clone 远程地址
```

## 2. 工作区

**描述：**工作区就是你windows系统的项目文件所在地

**工作区---工作区**

将修改过的`还没有放入`暂存区的`所有`文件恢复：

```
git checkout .   //只是对原有的文件恢复，新建的文件不行
git restore .   //只是对原有的文件恢复，新建的文件不行
```

将修改过的`还没有放入`暂存区的`单个`文件恢复：

```
git checkout 文件名    //文件名通过 git status 查看

git restore 文件名     //文件名通过 git status 查看
```

**工作区---暂存区**

将`已经放入`暂存区的`所有`文件撤销：

```
git reset HEAD -- .

git restore --staged .
```

将`已经放入`暂存区的`单个`文件撤销：

```
git reset HEAD -- 文件名   // 文件名通过 git status 查看

git restore --staged 文件名  // 文件名通过 git status 查看
```

**工作区---本地仓库**

将`已经放入`本地仓库的`所有`文件回滚到以前的某一个版本：

```
git reset --hard HEAD^  // 回滚到上一个版本

git reset --hard HEAD^^  // 回滚到上上个版本（上两个）

git reset --hard HEAD~100 // 回滚到前100个版本

git reset --hard 版本号   //版本号通过git log 或 git reflog查看   (不保留已修改内容) 
git reset --soft 版本号   //版本号通过git log 或 git reflog查看   (保留已修改内容)
```

将`已经放入`本地仓库的`单个`文件回滚到以前的某一个版本:

```
你还是直接利用插件来对比版本，直接复制过去吧！插件名：Git History
```

将`已经回滚`的本地仓库的`所有`文件恢复到以前的某一个版本：

```
git reset --hard 版本号   //版本号通过git log 或 git reflog查看   (不保留已修改内容) 

git reset --soft 版本号   //版本号通过git log 或 git reflog查看   (保留已修改内容)
```

## 3. 暂存区

将所有文件提交到暂存区

```
git add .
```

将单个文件提交到暂存区

```
git add 文件名  //文件名通过 git status 查看
```

## 4. 本地仓库

提交：

```
git commit -m "文件描述"
```

## 5.  远程仓库

推送：

```
git push
```

## 6. 拉取 （从远程仓库拉取）

```
git pull
```

## 7. 查看状态

```
git status // 只显示改动的文件名

git diff // 查看所有文件详细改动

git diff 文件名 // 查看单个文件的详细改动
```

## 8. 查看历史版本（日志）

```
git log  // 按 q 退出   （详细版）

git log -–pretty=oneline （简洁版）

git reflog  // 获取版本号（可以查看已经回滚过的）
```

## 9. 分支合并

查看分支

```
git branch
```

新建分支，例如新建`dev`分支

```
git branch dev
```

切换分支

```
git checkout dev
```

将`dev`分支合并分支到`master`主分支

```
1. 切换到主分支
git checkout master

2. 把分支代码merge到主分支
git merge dev

3. 提交
git push
```

将`master`分支合并分支到`dev`主分支

```
1. 切换到dev分支
git checkout dev

2. 把主分支代码merge到dev分支
git merge master

3. 提交
git push
```

删除`dev`分支

```
git branch -d dev
```

## 10. 储藏

"暂存" 可以获取你工作目录的中间状态（也就是你修改过的文件和暂存的变更），并将它保存到一个未完结变更的堆栈中，随时可以重新应用。

储藏

```
git stash
```

查看储藏

```
git stash list
```

应用最近的储藏

```
git stash apply
```

应用更早的储藏

```
git stash apply stash@{2}
```

应用并删除储藏

```
git stash pop
```

## 将远程设置为上游分支
```git
git push --set-upstream origin gh-pages
```

## 代码提交规范

- **feat**：提交新功能
- **fix**：修复了bug
- **docs**：只修改了文档
- **style**：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- **refactor**：代码重构，既没修复bug也没有添加新功能
- **perf**：性能优化，提高性能的代码更改
- **test**：添加或修改代码测试
- **chore**：对构建流程或辅助工具和依赖库（如文档生成等）的更改