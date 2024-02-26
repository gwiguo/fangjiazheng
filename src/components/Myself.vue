<template>
	<!-- 修改个人信息组件 -->
	<div style="width: 500px; margin: 0px auto">
		<h1 align="center" style="color: black">修改个人信息</h1>
		<el-form :rules="rules" ref="users" :model="users" label-width="120px" class="demo-ruleForm">
			<el-form-item label="账号" prop="uid">
				<el-input v-model="users.uid" @blur="checkId" disabled></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="upwd">
				<el-input v-model="users.upwd" type="password"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="tel">
				<el-input v-model="users.tel"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="uname">
				<el-input v-model="users.uname"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="update('users')">修改信息</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import Axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import router from "../route/index.js";
export default {
	name: "Myself",
	data() {
		return {
			users: {},
			bks: [],
			rules: {
				uid: [
					{
						required: true,
						message: "请填写账号",
						trigger: "blur"
					}
				],
				upwd: [
					{
						required: true,
						message: "请填写密码",
						trigger: "blur"
					}
				],
				tel: [
					{
						required: true,
						message: "请填写电话",
						trigger: "blur"
					}
				],
				uname: [
					{
						required: true,
						message: "请填写姓名",
						trigger: "blur"
					}
				]
			}
		};
	},
	created() {
		this.getUsers();
	},
	methods: {
		getUsers() {
			let str = sessionStorage.getItem("users");
			if (str != null) {
				this.show = true; //欢迎可见
				//把字符串转换成对象 --- sessionStorage存的必须时字符串，所以取出来的也是字符串
				this.users = JSON.parse(str);
			}
		},
		update(users) {
			this.$refs[users].validate(valid => {
				if (valid) {
					console.log(this.users);
					Axios.post("shopmng/api/users/updateInfo", this.users).then(res => {
						if (res.data.affectedRows > 0) {
							ElMessage({
								type: "success",
								message: "修改成功"
							});

							router.push("/Login");
						} else {
							ElMessage({
								type: "info",
								message: "修改失败"
							});
						}
					});
				} else {
					return false;
				}
			});
		}
	}
};
</script>

<style></style>
