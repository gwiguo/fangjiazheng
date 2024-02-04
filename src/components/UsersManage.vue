<template>
	<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		<div class="dingbu">
			<input class="sousuo" type="text" placeholder="搜索  账号" v-model="uid" />&nbsp;
			<el-button size="medium" type="danger" @click="search()">确定</el-button>
			<el-button type='danger' @click="showDialog">添加新用户</el-button>
		</div>
		<el-table :data="yonghu" style="width: 100%">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column label="用户名" width="150" prop='uname'>
			</el-table-column>
			<el-table-column label="账号" width="150" prop='uid'>
			</el-table-column>
			<el-table-column label="电话" width="150" prop='tel'>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template #default="scope">
					<el-button size="small" type='daner' @click="deleteUsers(scope.row,scope.$index)">删除</el-button>
					<el-button size="small" type='daner' @click="updateUsers(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 对话框 -->
		<el-dialog  v-model="show" :type="type" :title="title" width="40%" >
			<el-form :model="users" :rules="rules" ref="users">
				  <el-form-item label="账号" prop="uid" label-width="80">
				  	<el-input v-model="users.uid" @blur='checkId' autocomplete="off" :disabled="type == 'update'"></el-input>
				  	<span id="ts">{{msg}}</span>
				  </el-form-item>
			      <el-form-item label="姓名" prop="uname" label-width="600">
					<el-input v-model="users.uname" autocomplete="off"></el-input>
			      </el-form-item>
				  <el-form-item label="电话" prop="tel" label-width="600">
				  	<el-input v-model="users.tel" autocomplete="off"></el-input>
				  </el-form-item>
			    </el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">取消</el-button>
					<el-button v-if="type == 'create'" type="primary" @click="addUsers('users')">确定</el-button>
					<el-button v-if="type == 'update'" type="primary" @click="editUsers('users')">修改</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
	</div>
</template>

<script>
	import Index from './AdminTop.vue'
	import Axios from 'axios'
	import {
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	import router from "../route/index.js"
	export default{
		name: 'UsersManage',
		components: {
			Index
		},
		data() {
			return{
				yonghu: [],
				users: {
					upwd: '111',
				},
				uid: '',
				show: false,
				type: '',
				title: '',
				msg: '',
				rules: {
					uid: [{
						required: true,
						message: '请填写账号',
						trigger: 'blur'
					}],
					uname: [{
						required: true,
						message: '请填写姓名',
						trigger: 'blur'
					}],
					tel: [{
						required: true,
						message: '请填写电话',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.getUsers();
		},
		methods:{
			checkId() { //检查账号是否重复的
				Axios.post('/shopmng/api/users/selectOne', this.users).then(res => {
					if (res.data.length == 0) {
						this.msg = '账号可用'
					} else {
						this.msg = '账号不可用'
					}
				});
			},
			getUsers() {
				Axios.post('/shopmng/api/users/select').then(res => {
					this.yonghu = res.data;
				});
			},
			deleteUsers(obj, index) {
				ElMessageBox.confirm(
					'确认删除吗？', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
				  Axios.post('/shopmng/api/users/deleteOne', {
						'uid': obj.uid
					}).then(res => {
				    if (res.data.affectedRows == 1) {
						this.getUsers();
				    	ElMessage({
				    		message: '删除成功',
				    		type: 'success',
				    	});
				    } else {
				    	ElMessage({
				    		message: '删除失败',
				    	});
				    }
				  });
				
				})
			},
			showDialog() {
				//单击时对话框可见
				this.show = true;
				this.title = "添加用户";
				this.type = "create";
				this.users.uid = '';
				this.users.uname = '';
				this.users.tel = '';
			},
			search() {
				Axios.post('/shopmng/api/users/selectOne', {
						'uid': this.uid
					}).then(res => {
					this.yonghu = res.data;
				});
			},
			updateUsers(obj) {
				this.show = true;
				this.title = "修改用户";
				this.type = "update";
				Axios.post('/shopmng/api/users/selectOne', {
						'uid': obj.uid
					}).then(res => {
					console.log(JSON.stringify(res.data));
					this.users = res.data[0];
				});
			},
			addUsers(users){
				this.$refs[users].validate(valid => {
					if (valid) {
						Axios.post('/shopmng/api/users/addUsersYh', this.users).then(res => {
							if (res.data.affectedRows == 1) {
								ElMessage({
									message: '添加成功',
									type: 'success',
								});
								this.show = false;
								this.getUsers();
							} else {
								ElMessage.error('添加失败')
							}
						});
					} else {
						return false
					}
				})
			},
			editUsers(users) {
				this.$refs[users].validate(valid => {
					if (valid) {
						Axios.post('shopmng/api/users/updateInfo', this.users).then(res => {
							if (res.data.affectedRows > 0) {
								ElMessage({
									type: 'success',
									message: '修改成功',
								});
								this.show = false;
								this.getUsers();
							} else {
								ElMessage({
									type: 'info',
									message: '修改失败',
								})
							}
						})
					} else {
						return false
					}
				})
			}
		}
	}
</script>

<style>
	#ts {
		color: red;
	}
	.sousuo {
		height: 25px;
		width: 35%;
	}
	.dingbu {
		margin-bottom: 20px;
	}
	.tianjia {
		float: right;
	}
</style>
