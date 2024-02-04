<template>
	<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		<el-table :data="goods" stripe style="text-align: center;">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column prop="imgs" label="图片" width="300">
				<template #default="scope">
					<img :src="'http://localhost:8080/' + scope.row.imgs" style="width: 230px;height: 100%;" />
				</template>
			</el-table-column>
			<el-table-column prop="goodsname" label="商品名称">
			</el-table-column>
			<el-table-column prop="price" label="单价" width="80">
			</el-table-column>
			<el-table-column prop="number" width="150" label="数量">
				<template #default="scope">
					<button @click="jian(scope.row)">-</button>
					{{scope.row.number}}
					<button @click="jia(scope.row)">+</button>
				</template>
			</el-table-column>
			<el-table-column label="总计" width="150">
				<template #default="scope">
					{{scope.row.price*scope.row.number}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="small" type='daner' @click="deleteCard(scope.row,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="float: right;">
			<el-button type="danger" @click="addOrders()">结算</el-button>
		</div>
	</div>
	</div>
</template>

<script>
	import Index from './UserTop.vue'
	import Axios from 'axios'
	import {
		ElMessageBox,
		ElMessage
	} from 'element-plus'
	import router from "../route/index.js"
	export default {
		name: 'Cart',
		components: {
			Index
		},
		data() {
			return {
				goods: [],
				orders: {},
				good: {},
				users: {}
			}
		},
		created() {
			this.getUsers();
			this.getAll();
		},
		methods: {
			jia(row) {
				row.number += 1;
			},
			jian(row) {
				if(row.number==1){
					ElMessage({
						message: '不能在减少了',
					});
					return;
				}
				row.number -= 1;
			},
			getUsers() {
				// 获取sessionstorage中的用户信息
				let str = sessionStorage.getItem('users')
				if (str != null) {
					//把字符串转换成对象 --- sessionStorage存的必须时字符串，所以取出来的也是字符串
					this.users = JSON.parse(str);
				}
			},
			deleteCard(obj, index) {
				ElMessageBox.confirm(
					'确认删除吗？', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
					Axios.post('/shopmng/api/card/deleteOne', {
						'cid': obj.cid
					}).then(res => {
						if (res.data.affectedRows == 1) {
							ElMessage({
								message: '删除成功',
								type: 'success',
							});
							this.getAll();
						} else {
							ElMessage({
								message: '删除失败',
							});
						}
					});

				})
			},
			getAll() {
				Axios.post('/shopmng/api/card/selectAll', {
					'uid': this.users.uid
				}).then(res => {
					this.goods = res.data;
				});
			},
			addOrders() {
				for (let i = 0; i < this.goods.length; i++) {
					this.orders[i] = {
						uid: this.users.uid,
						gid: this.goods[i].gid,
						money: this.goods[i].price * this.goods[i].number,
						num: this.goods[i].number
					}
					Axios.post('/shopmng/api/orders/insertOrders', this.orders[i]).then(res => {
						if (res.data.affectedRows > 0) {
							ElMessage({
								type: 'success',
								message: '订单已生成！',
							});
							this.show = false;
							sessionStorage.removeItem("goods");
						} else {
							ElMessage({
								type: 'info',
								message: '订单已生成失败',
							})
						}
					});
					this.good[i] = {
							id: this.goods[i].gid,
							number: this.goods[i].number
						},
					Axios.post('shopmng/api/goods/updateNumber', this.good[i]).then(res => {
						if (res.data.affectedRows > 0) {
							console.info("库存减少")
						}
					})
					Axios.post('/shopmng/api/card/deleteAll', {
						'uid': this.users.uid
					}).then(res => {
						this.getAll();
					});
				}
			}

		}
	}
</script>

<style>
</style>
