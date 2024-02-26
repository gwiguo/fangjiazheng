<template>
	<div style="width: 100%;margin-bottom: 30px;background-color:#545c64">
		<div style="display:flex;width: 1300px;margin:0px auto;">
			<h1 style="flex:0 0 auto;margin-right:50px;font-size:24px;color:#fff;">批发市场农产品销售管理系统</h1>
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
				active-text-color="#ffd04b" style="width: 100%;">

				<el-menu-item index="1">
					<RouterLink to='/' style="text-decoration: none;color: white;">首页</RouterLink>
				</el-menu-item>
				<span class="box"></span>
				<el-menu-item index="2">
					<RouterLink to='/Goods' style="text-decoration: none;color: white;">商城</RouterLink>
				</el-menu-item>
				<span class="box"></span>
				<el-menu-item index="7" v-if='temp'>
					<RouterLink to='/Card' style="text-decoration: none;color: white;">我的购物车</RouterLink>
				</el-menu-item>
				<span class="box"></span>
				<el-menu-item index="8" v-if='temp'>
					<RouterLink to='/Myorders' style="text-decoration: none;color: white;">我的订单</RouterLink>
				</el-menu-item>
				<el-menu-item index="9" v-if='temp'>
					<RouterLink to='/MyComments' style="text-decoration: none;color: white;">我的评价</RouterLink>
				</el-menu-item>
				<span class="box"></span>

					<el-sub-menu index="3" v-if='temp'>
						<template #title>个人中心</template>
						<el-menu-item index="3-1">
							<RouterLink style="text-decoration: none;color: white;" to='/Myself'>个人信息</RouterLink>
						</el-menu-item>
						<el-menu-item index="3-2">
							<RouterLink style="text-decoration: none;color: white;" to='/Myorders'>我的订单</RouterLink>
						</el-menu-item>
						<el-menu-item index="3-3">
							<RouterLink style="text-decoration: none;color: white;" to='/Card'>我的购物车</RouterLink>
						</el-menu-item>
						<el-menu-item index="3-4">
							<RouterLink style="text-decoration: none;color: white;" to='/MyComments'>我的评价</RouterLink>
						</el-menu-item>
						<el-menu-item index="3-5">
							<span @click="zhuxiao">注销</span>
						</el-menu-item>
					</el-sub-menu>
					<span class="box" v-if='temp'></span>
					<el-menu-item index="5" v-if='!temp' >
						<RouterLink to='/Login' style="text-decoration: none;color: white;">登录</RouterLink>
					</el-menu-item>
					<span class="box1"></span>
					<el-menu-item index="6" v-if='!temp'>
						<RouterLink to='/Regist' style="text-decoration: none;color: white;">注册</RouterLink>
					</el-menu-item>

			</el-menu>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios'
	import {
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	import router from "../route/index.js"
	// import router from "route/index.js"
	export default { //js中 es6语法，模块 导出
		name: 'App',
		data() {
			return {
				user: {},
				drawer: true,
				show: false,
				temp:false
			}
		},
		created() {
			this.getUser();
		},
		methods: {
	
			getUser() {
	
				let str = sessionStorage.getItem('users');
				// alert(str)
				if (str != null) {
					this.show = true; //欢迎可见
					//把字符串转换成对象 --- sessionStorage存的必须时字符串，所以取出来的也是字符串
					this.user = JSON.parse(str);
					this.temp = true;
				}else{
					this.temp = false;
				}
			},
			zhuxiao(){
				ElMessageBox.confirm(
					'确认注销吗？', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
					sessionStorage.removeItem('users');
					router.push('/')
				
				})
			}
			
		}
	}
</script>

<style>
</style>
