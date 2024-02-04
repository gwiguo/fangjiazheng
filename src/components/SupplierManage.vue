<template>
	<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		<el-button  type='danger' @click="showDialog">添加供应商</el-button>
		<el-table :data="gongying" style="width: 100%">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column label="地区" width="150" prop='region'>
			</el-table-column>
			<el-table-column label="供应商" width="150" prop='suppliername'>
			</el-table-column>
			<el-table-column label="电话" width="150" prop='tel'>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template #default="scope">
					<el-button size="small" type='daner' @click="deleteSupplier(scope.row,scope.$index)">删除</el-button>
					<el-button size="small" type='daner' @click="updateSupplier(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 对话框 -->
		<el-dialog  v-model="show" :type="type" :title="title" width="40%" >
			<el-form :model="xinxi" :rules="rules" ref="xinxi">
				  <el-form-item label="地区" prop="region" label-width="600">
				  	<el-input v-model="xinxi.region" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="供应商" prop="suppliername" label-width="600">
				  	<el-input v-model="xinxi.suppliername" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="电话" prop="tel" label-width="600">
				  	<el-input v-model="xinxi.tel" autocomplete="off"></el-input>
				  </el-form-item>
			    </el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">取消</el-button>
					<el-button v-if="type == 'create'" type="primary" @click="addSupplier('xinxi')">确定</el-button>
					<el-button v-if="type == 'update'" type="primary" @click="editSupplier('xinxi')">修改</el-button>
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
		name: 'SupplierManage',
		components: {
			Index
		},
		data() {
			return{
				gongying: [],
				xinxi: {},
				show: false,
				type: '',
				title: '',
				rules: {
					region: [{
						required: true,
						message: '请填写地区',
						trigger: 'blur'
					}],
					suppliername: [{
						required: true,
						message: '请填写供应商',
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
			this.getSupplier();
		},
		methods:{
			getSupplier() {
				Axios.post('/shopmng/api/supplier/selectAll').then(res => {
					this.gongying = res.data;
				});
			},
			deleteSupplier(obj, index) {
				ElMessageBox.confirm(
					'确认删除吗？', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
				  Axios.post('/shopmng/api/supplier/deleteOne', {
						'id': obj.id
					}).then(res => {
				    if (res.data.affectedRows == 1) {
				    	this.gongying.splice(index, 1);
						this.getSupplier();
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
			updateSupplier(obj) {
				this.show = true;
				this.title = "修改供应商信息";
				this.type = "update";
				Axios.post('/shopmng/api/supplier/selectOne', {
						'id': obj.id
					}).then(res => {
					this.xinxi = res.data[0];
				});
			},
			showDialog() {
				//单击时对话框可见
				this.show = true;
				this.title = "添加供应商";
				this.type = "create";
				this.xinxi.region = '';
				this.xinxi.suppliername = '';
				this.xinxi.tel = '';
			},
			addSupplier(xinxi){
				this.$refs[xinxi].validate(valid => {
					if (valid) {
						Axios.post('/shopmng/api/supplier/add', this.xinxi).then(res => {
							if (res.data.affectedRows == 1) {
								ElMessage({
									message: '添加成功',
									type: 'success',
								});
								this.show = false;
								this.getSupplier();
							} else {
								ElMessage.error('添加失败')
							}
						});
					} else {
						return false
					}
				})
			},
			editSupplier(xinxi) {
				this.$refs[xinxi].validate(valid => {
					if (valid) {
						Axios.post('shopmng/api/supplier/updateInfo', this.xinxi).then(res => {
							if (res.data.affectedRows > 0) {
								ElMessage({
									type: 'success',
									message: '修改成功',
								});
								this.show = false;
								this.getSupplier();
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
		}
	}
</script>

<style>
</style>
