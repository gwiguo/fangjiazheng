<template>
	<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		利润总额：<input v-model="zongshu" disabled style="margin-bottom: 20px;height: 25px;width: 120px;"/>
		<el-table :data="orders" style="width: 100%">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column label="用户名" width="150" prop='uname'>
			</el-table-column>
			<el-table-column label="商品名称" width="150" prop='goodsname'>
			</el-table-column>
			<el-table-column label="商品单价" width="100" prop='price'>
			</el-table-column>
			<el-table-column label="数量" width="100" prop='num'>
			</el-table-column>
			<el-table-column label="订单总额" width="100" prop='money'>
			</el-table-column>
			<el-table-column label="利润率(%)" width="100" >
				<template #default="scope">
					{{scope.row.lirun}}%
				</template>
			</el-table-column>
			<el-table-column label="利润" width="100" >
				<template #default="scope">
					{{scope.row.lirun/100*scope.row.money}}
				</template>
			</el-table-column>
		</el-table>
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
		name: 'Lirun',
		components: {
			Index
		},
		data() {
			return{
				orders: [],
				zongshu: 0
			}
		},
		created() {
			this.getOrders();
		},
		methods:{
			getOrders() {
				Axios.post('/shopmng/api/orders/selectOrdes').then(res => {
					this.orders = res.data;
					for (let i = 0; i < this.orders.length; i++) {
						this.zongshu += this.orders[i].lirun/100*this.orders[i].money;
					}
				});
			},
		}
	}
</script>

<style>
</style>
