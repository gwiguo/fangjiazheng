<template>
	<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		<el-table :data="orders" style="width: 100%">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column label="用户名" width="150" prop='uname'>
			</el-table-column>
			<el-table-column label="电话" width="150" prop='tel'>
			</el-table-column>
			<el-table-column label="商品名称" width="150" prop='goodsname'>
			</el-table-column>
			<el-table-column label="商品单价" width="100" prop='price'>
			</el-table-column>
			<el-table-column label="数量" width="100" prop='num'>
			</el-table-column>
			<el-table-column label="订单总额" width="100" prop='money'>
			</el-table-column>
			<el-table-column label="操作" min-width="200">
				<template #default="scope">
					<el-button size="small" type='daner' @click="deleteOrders(scope.row,scope.$index)">删除订单</el-button>
					<el-button size="small" type='daner' @click="updateOrders(scope.row)">修改订单</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 对话框 -->
		<el-dialog v-model="show" title="修改订单信息" width="40%">
			<el-form :model="order" :rules="rules" ref="order">
				<el-form-item label="用户名" label-width="600">
					<el-input v-model="order.uname" disabled autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="600">
					<el-input v-model="order.tel" disabled autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品名称" label-width="600">
					<el-input v-model="order.goodsname" disabled autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品单价" label-width="600">
					<el-input v-model="order.price" disabled autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="数量" prop="num" label-width="600">
					<el-input v-model="order.num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="价格" prop="money" label-width="600">
					<el-input v-model="order.money" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">取消</el-button>
					<el-button type="primary" @click="editOrder('order')">修改</el-button>
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
		name: 'OrdersManage',
		components: {
			Index
		},
		data() {
			return{
				orders: [],
				show: false,
				order: {},
				rules: {
					num: [{
						required: true,
						message: '请填写数量',
						trigger: 'blur'
					}],
					money: [{
						required: true,
						message: '请填写价格',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.getOrders();
		},
		methods:{
			getOrders() {
				Axios.post('/shopmng/api/orders/selectOrdes').then(res => {
					this.orders = res.data;
				});
			},
			deleteOrders(obj, index) {
				ElMessageBox.confirm(
					'确认删除吗？', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
					Axios.post('/shopmng/api/orders/deleteOne', {
						'oid': obj.oid
					}).then(res => {
						if (res.data.affectedRows == 1) {
							this.orders.splice(index, 1);
							this.getOrders();
							ElMessage({
								message: '删除成功',
								type: 'success',
							})
						} else {
							ElMessage({
								message: '删除失败',
							});
						}
					});
			
				})
			},
			updateOrders(obj) {
				this.show = true;
				Axios.post('/shopmng/api/orders/selectOne', {
					'oid': obj.oid
				}).then(res => {
					this.order = res.data[0];
				});
			},
			editOrder(order) {
				this.$refs[order].validate(valid => {
					if (valid) {
						console.log(JSON.stringify(this.order));
						Axios.post('shopmng/api/orders/updateInfo', this.order).then(res => {
							if (res.data.affectedRows > 0) {
								ElMessage({
									type: 'success',
									message: '修改成功',
								});
								this.show = false;
								this.getOrders();
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
