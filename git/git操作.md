# git 操作指南
git的下载和安装
	windows的下载
创建远程个gitHub仓库
	打开gitHub网站
		https://github.com/
	注册gitHub会员
		点击Sign Up
		填写用户名，邮箱，密码。填写完成点击Create an account
		选择第一个免费，Unlimited public repositories for free.然后点击Continue
	创建新仓库
		点击顶部右侧头像图标按钮左边的加号
			new repository
		填写仓库名称
			Repository name
		填写仓库描述（可选）
			Description
	选择仓库是否公开
		public 公有的，大家都能看到
		private 私有的，仅自己可以看到
	初始化仓库的介绍文件
		Initialize this repository with a README
	点击创建
	获取创建好的仓库地址
		https地址
			https://github.com/用户名/仓库名.git
		SSH地址
			git@github.com:用户名/仓库名.git
git创建本地版本库
	打开windows菜单下安装好的git下的gitBush
	修改当前盘符和路径
		cd /盘符/目录
	创建新目录
		可以用windows下的方法创建
		git创建方法  mkdir 文件夹名称
	显示目录
		显示当前目录 pwd
	把当前目录设置为本地仓库
		git init
	设置当前公用的用户名和邮件地址
		git config --global user.name "gitHub上注册的用户名" 
		git config --global user.email “gitHub上注册时用的邮箱” 
	设置SSH的Key
		ssh-keygen -t rsa -C "gitHub上注册时用的邮箱" 
		Generating public/private rsa key pair.(/Users/your_user_directory/.ssh/id_rsa)直接敲回车
		Enter passphrase (empty for no passphrase):<enter a passphrase>  直接敲回车
		Enter same passphrase again:<enter passphrase again>直接敲回车
		生成类似于下面的内容
+--[ RSA 2032]----+  
|     .+   +      |  
|      ssssssss   |  
|        = * *    |  
|       o = +     |  
|     ssss .      |  
|     o oss       |  
|      o .sE      |  
|                 |  
|                 |  
+-----------------+  
		打开我的电脑--》用户---》当前登录Windows的用户名文件夹----》.ssh文件夹-----》用记事本打开id_rsa.pub文件----》复制里面的内容
		打开gitHub官网，登陆，选择进入创建的项目，选择右边的settings选项
		选择Deploy keys
			点击add deploy key 添加key
		title填写用户名称+SSHkey，然后把刚才复制的内容直接粘贴到key里面，不要敲任何其他的按钮，点选Allow write access。然后点击add key。创建完成SSH的Key了
上传项目到仓库中
	创建一个文件
		在刚才新建的本地仓库中创建一个文件，例如:ReadMe.txt
		在gitBush窗口中输入：git add ReadMe.txt
	告诉git要提交到仓库，并且添加注释
		git commit -m "注释内容"
	连接gitHub仓库地址
		git remote add origin 刚才复制的地址
	上传到gitHub服务器
		git push -u origin master
	取回远程仓库的变化，并与本地分支合并
		git pull origin master
	错误提示
		Permission denied (publickey).  
fatal: The remote end hung up unexpectedly 
			这是没有权限，如果上一步中git创建版本库中设置ssh的key没有完成或者错误。
				cd ~/.ssh 
				rm id_rsa*
				设置SSH的Key
		failed to push some refs to git
			这是因为gitHub创建时可能创建了README.md，但是版本没有合并
				git pull --rebase origin master
				然后做后续的操作就可以了
		remote origin already exists
			创建连接时提示，这是因为已经有了仓库，需要先删除远程仓库，git remote rm origin
		git push时报错fatal: Could not read from remote repository.
			设置的地址应该为https的，需要修改一下
				git remote set-url origin XXX 
从gitHub仓库下载项目到本地仓库
	自己创建的项目库
		git clone git@github.com:用户名/仓库名.git
	别人创建好的项目
		点击右上角的Fork，表示先复制到自己的仓库里
		git clone git@github.com:用户名/仓库名.git
git所有命令
	一、新建代码库
		# 在当前目录新建一个Git代码库
			$ git init
		# 新建一个目录，将其初始化为Git代码库
			$ git init [project-name]
		# 下载一个项目和它的整个代码历史
			$ git clone [url]
	二、配置
		Git的设置文件为.gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。
		# 显示当前的Git配置
			$ git config --list
		# 编辑Git配置文件
			$ git config -e [--global]
		# 设置提交代码时的用户信息
			$ git config [--global] user.name "[name]"
			$ git config [--global] user.email "[email address]"
	三、增加/删除文件
		# 添加指定文件到暂存区
			$ git add [file1] [file2] ...
		# 添加指定目录到暂存区，包括子目录
			$ git add [dir]
		# 添加当前目录的所有文件到暂存区
			$ git add .
		# 添加每个变化前，都会要求确认
			# 对于同一个文件的多处变化，可以实现分次提交
			$ git add -p
		# 删除工作区文件，并且将这次删除放入暂存区
			$ git rm [file1] [file2] ...
		# 停止追踪指定文件，但该文件会保留在工作区
			$ git rm --cached [file]
		# 改名文件，并且将这个改名放入暂存区
			$ git mv [file-original] [file-renamed]
	四、代码提交
		# 提交暂存区到仓库区
			$ git commit -m [message]
		# 提交暂存区的指定文件到仓库区
			$ git commit [file1] [file2] ... -m [message]
		# 提交工作区自上次commit之后的变化，直接到仓库区
			$ git commit -a
		# 提交时显示所有diff信息
			$ git commit -v
		# 使用一次新的commit，替代上一次提交
			# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
			$ git commit --amend -m [message]
		# 重做上一次commit，并包括指定文件的新变化
			$ git commit --amend [file1] [file2] ...
	五、分支
		# 列出所有本地分支
			$ git branch
		# 列出所有远程分支
			$ git branch -r
		# 列出所有本地分支和远程分支
			$ git branch -a
		# 新建一个分支，但依然停留在当前分支
			$ git branch [branch-name]
		# 新建一个分支，并切换到该分支
			$ git checkout -b [branch]
		# 新建一个分支，指向指定commit
			$ git branch [branch] [commit]
		# 新建一个分支，与指定的远程分支建立追踪关系
			$ git branch --track [branch] [remote-branch]
		# 切换到指定分支，并更新工作区
			$ git checkout [branch-name]
		# 切换到上一个分支
			$ git checkout -
		# 建立追踪关系，在现有分支与指定的远程分支之间
			$ git branch --set-upstream [branch] [remote-branch]
		# 合并指定分支到当前分支
			$ git merge [branch]
		# 选择一个commit，合并进当前分支
			$ git cherry-pick [commit]
		# 删除分支
			$ git branch -d [branch-name]
		# 删除远程分支
			$ git push origin --delete [branch-name]
			$ git branch -dr [remote/branch]
	六、标签
		# 列出所有tag
			$ git tag
		# 新建一个tag在当前commit
			$ git tag [tag]
		# 新建一个tag在指定commit
			$ git tag [tag] [commit]
		# 删除本地tag
			$ git tag -d [tag]
		# 删除远程tag
			$ git push origin :refs/tags/[tagName]
		# 查看tag信息
			$ git show [tag]
		# 提交指定tag
			$ git push [remote] [tag]
		# 提交所有tag
			$ git push [remote] --tags
		# 新建一个分支，指向某个tag
			$ git checkout -b [branch] [tag]
	七、查看信息
		# 显示有变更的文件
			$ git status
		# 显示当前分支的版本历史
			$ git log
		# 显示commit历史，以及每次commit发生变更的文件
			$ git log --stat
		# 搜索提交历史，根据关键词
			$ git log -S [keyword]
		# 显示某个commit之后的所有变动，每个commit占据一行
			$ git log [tag] HEAD --pretty=format:%s
		# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
			$ git log [tag] HEAD --grep feature
		# 显示某个文件的版本历史，包括文件改名
			$ git log --follow [file]
			$ git whatchanged [file]
		# 显示指定文件相关的每一次diff
			$ git log -p [file]
		# 显示过去5次提交
			$ git log -5 --pretty --oneline
		# 显示所有提交过的用户，按提交次数排序
			$ git shortlog -sn
		# 显示指定文件是什么人在什么时间修改过
			$ git blame [file]
		# 显示暂存区和工作区的代码差异
			$ git diff
		# 显示暂存区和上一个commit的差异
			$ git diff --cached [file]
		# 显示工作区与当前分支最新commit之间的差异
			$ git diff HEAD
		# 显示两次提交之间的差异
			$ git diff [first-branch]...[second-branch]
		# 显示今天你写了多少行代码
			$ git diff --shortstat "@{0 day ago}"
		# 显示某次提交的元数据和内容变化
			$ git show [commit]
		# 显示某次提交发生变化的文件
			$ git show --name-only [commit]
		# 显示某次提交时，某个文件的内容
			$ git show [commit]:[filename]
		# 显示当前分支的最近几次提交
			$ git reflog
		# 从本地master拉取代码更新当前分支：branch 一般为master
			$ git rebase [branch]
	八、远程同步
		$ git remote update  --更新远程仓储
		# 下载远程仓库的所有变动
			$ git fetch [remote]
		# 显示所有远程仓库
			$ git remote -v
		# 显示某个远程仓库的信息
			$ git remote show [remote]
		# 增加一个新的远程仓库，并命名
			$ git remote add [shortname] [url]
		# 取回远程仓库的变化，并与本地分支合并
			$ git pull [remote] [branch]
		# 上传本地指定分支到远程仓库
			$ git push [remote] [branch]
		# 强行推送当前分支到远程仓库，即使有冲突
			$ git push [remote] --force
		# 推送所有分支到远程仓库
			$ git push [remote] --all
	九、撤销
		# 恢复暂存区的指定文件到工作区
			$ git checkout [file]
		# 恢复某个commit的指定文件到暂存区和工作区
			$ git checkout [commit] [file]
		# 恢复暂存区的所有文件到工作区
			$ git checkout .
		# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
			$ git reset [file]
		# 重置暂存区与工作区，与上一次commit保持一致
			$ git reset --hard
		# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
			$ git reset [commit]
		# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
			$ git reset --hard [commit]
		# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
			$ git reset --keep [commit]
		# 新建一个commit，用来撤销指定commit
			# 后者的所有变化都将被前者抵消，并且应用到当前分支
			$ git revert [commit]
		# 暂时将未提交的变化移除，稍后再移入
			$ git stash
			$ git stash pop
	十、其他
		# 生成一个可供发布的压缩包
			$ git archive