<template>
	<!-- 注册的组件 -->
	<div style="width: 500px; margin: 0px auto;">
		<h1 align="center" style="color: black;"><el-button type="primary" @click="shouye()">返回商城</el-button></h1>
		<h1 align="center" style="color: black;">注册页面</h1>
		<el-form ref="regist" :model="users" label-width="120px" class="demo-ruleForm">
			<el-form-item label="账号" required>
				<el-input v-model="users.uid" @blur='checkId'></el-input>
				<span id="ts">{{msg}}</span>
			</el-form-item>
			<el-form-item label="密码" required>
				<el-input v-model="users.upwd" type="password"></el-input>
			</el-form-item>
			<el-form-item label="电话" required>
				<el-input v-model="users.tel"></el-input>
			</el-form-item>
			<el-form-item label="姓名" required>
				<el-input v-model="users.uname"></el-input>
			</el-form-item>
			<el-form-item label="角色" required>
				<el-radio v-model="users.role" :label="0">普通用户</el-radio>
				<el-radio v-model="users.role" :label="1">管理员</el-radio>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="zhuce()">注册</el-button>
				<el-button type="primary" @click="denglu()">登录</el-button>

			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	import Axios from 'axios'
	import {
		ElMessage
	} from 'element-plus'
	import router from "../route/index.js"
	export default {
		name: 'Regist',
		data() {
			return {
				users: {
					role: 0
				},
				msg: ''
			}
		},
		methods: {
			checkId() { //检查账号是否重复的
				Axios.post('/shopmng/api/users/selectOne', this.users).then(res => {
					if (res.data.length == 0) {
						this.msg = '账号可用'
					} else {
						this.msg = '账号不可用'
					}
				});
			},
			zhuce() {
				//注册
				Axios.post('/shopmng/api/users/addUsers', this.users).then(res => {
					if (res.data.affectedRows == 1) {
						// alert('添加成功')
						ElMessage({
							message: '注册成功',
							type: 'success',
						})
					} else {
						//alert('添加失败')
						ElMessage.error('注册失败')
					}
				});
			},
			denglu() {
				router.push('/Login')
			},
			shouye(){
				router.push('/')
			},
		}
	}
</script>

<style>
	#ts {
		color: red;
	}
</style>
