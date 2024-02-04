<template>
	<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		<div class="dingbu">
			<input class="sousuo" type="text" placeholder="搜索  商品类型" v-model="typename" />&nbsp;
			<el-button size="medium" type="danger" @click="search()">确定</el-button>
			<el-button type='danger' @click="showDialog">添加商品类型</el-button>
		</div>
		<el-table :data="leixing" style="width: 100%">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column label="商品类型" width="150" prop='typename'>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template #default="scope">
					<el-button size="small" type='daner' @click="deleteType(scope.row,scope.$index)">删除</el-button>
					<el-button size="small" type='daner' @click="updateType(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 对话框 -->
		<el-dialog  v-model="show" :type="type" :title="title" width="40%" >
			<el-form :model="types" :rules="rules" ref="types">
				  <el-form-item label="商品类型" prop="typename" label-width="600">
				  	<el-input v-model="types.typename" autocomplete="off"></el-input>
				  </el-form-item>
			    </el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">取消</el-button>
					<el-button v-if="type == 'create'" type="primary" @click="addType('types')">确定</el-button>
					<el-button v-if="type == 'update'" type="primary" @click="editType('types')">修改</el-button>
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
	export default {
		name: 'TypeManage',
		components: {
			Index
		},
		data() {
			return{
				leixing: [],
				typename: '',
				types: {},
				show: false,
				type: '',
				title: '',
				rules: {
					typename: [{
						required: true,
						message: '请填写商品类型',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.getType();
		},
		methods:{
			editType(types) {
				this.$refs[types].validate(valid => {
					if (valid) {
						Axios.post('shopmng/api/type/updateInfo', this.types).then(res => {
							if (res.data.affectedRows > 0) {
								ElMessage({
									type: 'success',
									message: '修改成功',
								});
								this.show = false;
								this.getType();
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
			},
			updateType(obj) {
				this.show = true;
				this.title = "修改商品类型";
				this.type = "update";
				Axios.post('/shopmng/api/type/selectOne', {
						'id': obj.id
					}).then(res => {
					this.types = res.data[0];
				});
			},
			addType(types){
				this.$refs[types].validate(valid => {
					if (valid) {
						Axios.post('/shopmng/api/type/add', {
							'typename': this.types.typename
						}).then(res => {
							if (res.data.affectedRows == 1) {
								ElMessage({
									message: '添加成功',
									type: 'success',
								});
								this.show = false;
								this.getType();
							} else {
								ElMessage.error('添加失败')
							}
						});
					} else {
						return false
					}
				})
			},
			showDialog() {
				//单击时对话框可见
				this.show = true;
				this.title = "添加商品类型";
				this.type = "create";
				this.types.typename = '';
			},
			search() {
				Axios.post('/shopmng/api/type/selectName', {
						'typename': this.typename
					}).then(res => {
					this.leixing = res.data;
				});
			},
			getType() {
				Axios.post('/shopmng/api/type/selectAll').then(res => {
					this.leixing = res.data;
				});
			},
			deleteType(obj, index) {
				ElMessageBox.confirm(
					'确认删除吗？', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
				  Axios.post('/shopmng/api/type/deleteOne', {
						'id': obj.id
					}).then(res => {
				    if (res.data.affectedRows == 1) {
						this.getType();
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
			}
		}
	}
</script>

<style>
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
