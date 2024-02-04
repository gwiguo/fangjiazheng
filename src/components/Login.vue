<template>
	<!-- 登录的组件 -->
	<div style="width: 500px; margin: 0px auto;">
		
		<h1 align="center" style="color: black;"><el-button type="primary" @click="shouye()">返回商城</el-button></h1>
		<h1 align="center" style="color: black;">登录页面</h1>
		<span id="ts">{{msg}}</span>
		<el-form ref="regist" :model="users"  label-width="120px" class="demo-ruleForm" >
			<el-form-item label="角色" required>
				<el-radio v-model="users.role" :label="0">普通用户</el-radio>
				<el-radio v-model="users.role" :label="1">管理员</el-radio>
			</el-form-item>
			<el-form-item label="账号" required>
				<el-input v-model="users.uid"></el-input>
			</el-form-item>
			<el-form-item label="密码" required>
				<el-input v-model="users.upwd" type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="denglu()">登录</el-button>				
				<el-button type="primary" @click="zhuce()">注册</el-button>		
			</el-form-item>
			
		</el-form>
	</div>
</template>

<script>
	//引入页面需要的组件
	import Axios from 'axios' //axios模块
	import { ElMessage } from 'element-plus' //element-plus模块
	import router from "../route/index.js"//路由模块
	export default {
		name: 'Login',
		data() {
			return {
				//data和页面双向绑定的数据
				users:{
					role: 0
				},
				msg:''//提示信息
			}
		},
		created() {
				//页面载入时调用的函数
				this.getUsers();
				this.users.uid = '';
				this.users.upwd = '';
		},
		methods: {
			getUsers() {
				// 获取sessionstorage中的用户信息
				let str = sessionStorage.getItem('users')
				if (str != null) {
					this.show = true; //欢迎可见
					//把字符串转换成对象 --- sessionStorage存的必须时字符串，所以取出来的也是字符串
					this.users = JSON.parse(str);
				}
			},
			zhuce(){
				//跳转到注册页面
				router.push('/Regist')
			},
			shouye(){
				router.push('/')
			},
			denglu(){
				//发生Axios请求，进行登陆验证
				Axios.post('/shopmng/api/users/login',this.users).then(res=>{
					if(res.data.length==0){
						ElMessage.error('登录失败')
					}else{
						let usersObj = res.data[0];//返回的数据是一个数组，但是实际上登录就一个用户，所以[0]
						
						//想让他其他页面也好用 --- 存储在会话信息内  -- JSON.stringify把对象转换成string
						sessionStorage.setItem('users', JSON.stringify(usersObj))
						// alert("用户信息存入session"+JSON.stringify(usersObj));
						ElMessage({
						    message: '登录成功',
						    type: 'success',
						});
						
						
						if(JSON.stringify(this.users.role) == 0){
							//登录成功跳转到Notes页面
							
								router.push('/');
						}else if(JSON.stringify(this.users.role) == 1){
							
								router.push('/GoodsManage');
						}else{
							
						}
					}
				})
			},
		}
			
	}
</script>

<style>
	#ts{
		color: red;
	}
</style>
