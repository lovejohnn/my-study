# git 操作指南

### 提交本地仓库
	git add *
	git commit -m ' '
### 查看状态
	git status
### 分支
	git branch
	git checkout -b feature_x
	git checkout master
	git branch -D feature_x
### 合并
	git diff
	git merge
### 冲突解决
	手动解决
### 推送远程仓库
	git push origin master
### 同步远程仓库
	git pull origin master
	git fetch origin master
### 查看 log 
	git log
	git reflog
### 打标签
	git tag 1.0.0
	git tag
	git checkout 1.0.0
### 替换工作区中的内容
	git reset --hard 
	git checkout -- <fileName>
### 忽略列表
	添加忽略的配置文件.gitignore
	通过vim .gitignore来创建文件