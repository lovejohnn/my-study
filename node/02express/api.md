# 我爱电影网 API 接口文档规范



## 简介

> 本接口提供给前端数据展示





## 注意事项

1. 规定所有的请求协议都是 https
2. 所有post请求的接口，必须在请求头里面携带 token 验证
3. 所有的错误的状态码，详见【全局状态码】



## 全局状态码

>  公众号每次调用接口时，可能获得正确或错误的返回码，开发者可以根据返回码信息调试接口，排查错误。 



**全局返回码说明如下：** 

| 返回码 | 说明                             |
| ------ | -------------------------------- |
| -1     | 系统繁忙，此时请开发者稍候再试   |
| 0      | 请求成功                         |
| 40001  | 无效的token                      |
| 400012 | 电影列表接口获取失败，内部错误！ |
| 400013 | 用户名或密码为空                 |
|        |                                  |
|        |                                  |
|        |                                  |
|        |                                  |

# 1.  电影列表接口

**接口地址：**<http://localhost:9090/movie/lst> 

**返回格式：**json

**请求方式：**http get

**请求示例：**<http://localhost:9090/movie/lst> 

**接口备注：**



请求参数说明： 暂无（分页）



返回参数说明： 

| 名称      | 类型   | 说明                   |
| --------- | ------ | ---------------------- |
| errorCode | int    | 状态码                 |
| reason    | string | 接口说明               |
| result    | array  | 成功的状态下才有此字段 |

JSON返回示例： 

```
{
	"reason": "请求成功",
	"errorCode": "0",
	"result": [{
			"_id": "5d5df8d081c1751ec8d77621", // 主键id
			"title": "无间道3", // 名称
			"director": "无间道",  // 导演
			"actors": "无间道", // 演员
			"catename": "动作", // 电影分类
			"infos": "无间道无间道无间道无间道无间道无间道", // 电影描述
			"imgUrl": "uploads\\movieimg-1566439632203.jpg", // 图片
			"__v": 0
		},
		{
			"_id": "5d5dfa4e113c7a1358a05848",
			"title": "撒的发生",
			"director": "撒的发生",
			"actors": "阿斯顿发的是",
			"catename": "动作",
			"infos": "撒的发生",
			"imgUrl": "uploads\\movieimg-1566440014092.jpg",
			"__v": 0
		},
		{
			"_id": "5d5dfa91b5a06927440e3492",
			"title": "撒的发生大",
			"director": "撒的发生",
			"actors": "撒的发生大",
			"catename": "娱乐",
			"infos": "撒的发生",
			"imgUrl": "uploads\\movieimg-1566440160578.jpg",
			"__v": 0
		},
		{
			"_id": "5d5dfae0bfeec816f84b9619",
			"title": "撒的发大水",
			"director": "时所发生的",
			"actors": "撒的发生大",
			"catename": "动作",
			"infos": "撒的发大水",
			"imgUrl": "uploads\\movieimg-1566440160578.jpg",
			"__v": 0
		},
		{
			"_id": "5d5e0f801c27d92e14258d83",
			"title": "暗战2",
			"director": "暗战",
			"actors": "暗战",
			"catename": "娱乐",
			"infos": "暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战暗战",
			"imgUrl": "uploads\\movieimg-1566445440435.jpg",
			"__v": 0
		},
		{
			"_id": "5d5e0fef315e781b9855fd13",
			"title": "暗战78",
			"director": "暗战78",
			"actors": "暗战78",
			"catename": "惊悚",
			"infos": "暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78暗战78",
			"imgUrl": "uploads\\movieimg-1566445551217.jpg",
			"__v": 0
		},
		{
			"_id": "5d5e17e669cbea3388aac8fa",
			"title": "寒战",
			"director": "寒战",
			"actors": "寒战寒战",
			"catename": "科幻电影",
			"infos": "寒战寒战寒战寒战",
			"imgUrl": "uploads\\movieimg-1566447590793.jpg",
			"__v": 0
		},
		{
			"_id": "5d5e18398866931d0836d265",
			"title": "寒战3",
			"director": "寒战3寒战3",
			"actors": "寒战3寒战3寒战3寒战3",
			"catename": "恐怖",
			"infos": "寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3寒战3",
			"imgUrl": "uploads\\movieimg-1566447673472.jpg",
			"__v": 0
		},
		{
			"_id": "5d5e278b5e88fe16888e95b3",
			"title": "少年派奇幻漂流",
			"director": "李安",
			"actors": "李安-李杰",
			"catename": "娱乐",
			"infos": "少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流少年派奇幻漂流",
			"imgUrl": "uploads\\movieimg-1566451595456.jpg",
			"__v": 0
		}
	]
}
```



错误返回示例：

```
{
	"reason": "请求失败，联系管理员",
	"errorCode": "400012"
}
```

 

# 2. 注册接口

**接口地址：**http://localhost:9090/api/register 

**返回格式：**json

**请求方式：**http **post**

**请求示例：** 使用 postman 请求

**接口备注：**



请求参数说明：

| 参数名称 | 类型   | 是否必须 | 说明   |
| -------- | ------ | -------- | ------ |
| username | string | 必须     | 用户名 |
| password | string | 必须     | 密码   |
|          |        |          |        |

返回参数说明： 

| 名称      | 类型    | 说明                   |
| --------- | ------- | ---------------------- |
| errorCode | int     | 状态码                 |
| errorMsg  | string  | 接口说明               |
| result    | obeject | 成功的状态下才有此字段 |

JSON成功返回示例： 

```
{
    "errorCode": 0,
    "errorMsg": "register success",
    "result": {
        "id": 1,
        "username": "liming"
    }
}
```

JSON失败返回示例：

```
{
    "errorCode": 400013,
    "errorMsg": "invalide username or password, can not null"
}
```



# 3. 登录接口

**接口地址：**http://localhost:9090/api/login

**返回格式：**json

**请求方式：**http **post**

**请求示例：** 使用 postman 请求

**接口备注：**



请求参数说明：

| 参数名称 | 类型   | 是否必须 | 说明   |
| -------- | ------ | -------- | ------ |
| username | string | 必须     | 用户名 |
| password | string | 必须     | 密码   |
|          |        |          |        |

返回参数说明： 

| 名称      | 类型    | 说明                   |
| --------- | ------- | ---------------------- |
| errorCode | int     | 状态码                 |
| errorMsg  | string  | 接口说明               |
| result    | obeject | 成功的状态下才有此字段 |

JSON成功返回示例： 

```
{
    "errorCode": 0,
    "errorMsg": "login success",
    "result": {
        "token": "lorem"
    }
}
```

JSON 登录失败返回示例：

```
{
    "errorCode": 400015,
    "errorMsg": "login failure"
}
```

JSON 用户名或者密码为空 失败返回示例：

```
{
    "errorCode": 400013,
    "errorMsg": "invalide username or password, can not null"
}
```



# 4. 评论接口

