<template>
<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		<div style="margin-bottom: 20px;">
			<el-input placeholder="请输入商品名称搜索" v-model="goodsname"></el-input>
		</div>
		<el-table :data="caigou" style="width: 100%">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column label="商品名称" width="150" prop='goodsname'>
			</el-table-column>
			<el-table-column label="商品单价" width="150" prop='price'>
			</el-table-column>
			<el-table-column label="商品数量" width="150" prop='num'>
			</el-table-column>
			<el-table-column label="订单总额" width="150" prop='money'>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template #default="scope">
					<el-button size="small" type='daner' @click="deleteCaigou(scope.row,scope.$index)">删除订单</el-button>
					<el-button size="small" type='daner' @click="updateCaigou(scope.row)">修改订单</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 对话框 -->
		<el-dialog v-model="show" title="修改订单信息" width="40%">
			<el-form :model="caigous" :rules="rules" ref="caigous">
				<el-form-item label="商品名称" prop="goodsname" label-width="600">
					<el-input v-model="caigous.goodsname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品单价" prop="price" label-width="600">
					<el-input v-model="caigous.price" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品数量" prop="num" label-width="600">
					<el-input v-model="caigous.num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="订单总额" prop="money" label-width="600">
					<el-input v-model="caigous.money" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">取消</el-button>
					<el-button type="primary" @click="editCaigou('caigous')">修改</el-button>
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
		name: 'Caigou',
		components: {
			Index
		},
		data() {
			return {
				caigou: [],
				caigous: {},
				show: false,
				goodsname: '',
				rules: {
					goodsname: [{
						required: true,
						message: '请填写商品名称',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请填写商品单价',
						trigger: 'blur'
					}],
					num: [{
						required: true,
						message: '请填写商品数量',
						trigger: 'blur'
					}],
					money: [{
						required: true,
						message: '请填写订单总额',
						trigger: 'blur'
					}]
				}
			}
		},
		watch: {
			goodsname() {
				//根据goodsname的变化去后台查找匹配的商品
				Axios.post('/shopmng/api/caigou/selectName', {
					goodsname: this.goodsname
				}).then(res => {
					this.caigou = res.data;
				})
			}
		},
		created() {
			this.getCaigou();
		},
		methods: {
			getCaigou() {
				Axios.post('/shopmng/api/caigou/selectAll').then(res => {
					this.caigou = res.data;
				});
			},
			deleteCaigou(obj, index) {
				ElMessageBox.confirm(
					'确认删除吗？', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
					Axios.post('/shopmng/api/caigou/deleteOne', {
						'cid': obj.cid
					}).then(res => {
						if (res.data.affectedRows == 1) {
							ElMessage({
								message: '删除成功',
								type: 'success',
							});
							this.getCaigou();
						} else {
							ElMessage({
								message: '删除失败',
							});
						}
					});

				})
			},
			updateCaigou(obj) {
				this.show = true;
				Axios.post('/shopmng/api/caigou/selectOne', {
					'cid': obj.cid
				}).then(res => {
					this.caigous = res.data[0];
				});
			},
			editCaigou(caigous) {
				this.$refs[caigous].validate(valid => {
					if (valid) {
						Axios.post('shopmng/api/caigou/updateInfo', this.caigous).then(res => {
							if (res.data.affectedRows > 0) {
								ElMessage({
									type: 'success',
									message: '修改成功',
								});
								this.show = false;
								this.getCaigou();
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
</style>
