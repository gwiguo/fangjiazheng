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
				<el-table-column label="图片" width="230">
					<template #default="scope">
						<img :src="'http://localhost:8080/' + scope.row.imgs"
							style="width: 200px;height: 130px;" />
					</template>
				</el-table-column>
				<el-table-column label="商品名称" width="150" prop='goodsname'>
				</el-table-column>
				<el-table-column label="用户名" width="150" prop='uname'>
				</el-table-column>
				<el-table-column label="电话" width="150" prop='tel'>
				</el-table-column>
				<el-table-column label="商品单价" width="100" prop='price'>
				</el-table-column>
				<el-table-column label="数量" width="100" prop='num'>
				</el-table-column>
				<el-table-column label="订单总额" width="100" prop='money'>
				</el-table-column>
				<el-table-column label="操作" min-width="100">
					<template #default="scope">
						<el-button size="small" type='daner' v-if="scope.row.pingjia != 1"
							@click="addComments(scope.row)">评价此订单</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 对话框 -->
			<el-dialog v-model="show" title="评价" width="40%">
				<el-form :model="comments" :rules="rules" ref="comments">
					<el-form-item label="评价此商品" prop="content" label-width="600">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="comments.content">
						</el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="show = false">取消</el-button>
						<el-button type="primary" @click="addContent('comments')">确定</el-button>
					</span>
				</template>
			</el-dialog>
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
		name: 'Myorders',
		components: {
			Index
		},
		data() {
			return {
				orders: [],
				order: {},
				comments: {},
				show: false,
				rules: {
					content: [{
						required: true,
						message: '请填写评价',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.getUsers();
			this.getOrders();
		},
		methods: {
			getUsers() {
				// 获取sessionstorage中的用户信息
				let str = sessionStorage.getItem('users')
				if (str != null) {
					//把字符串转换成对象 --- sessionStorage存的必须时字符串，所以取出来的也是字符串
					this.users = JSON.parse(str);
					return
				}
			},
			getOrders() {
				Axios.post('/shopmng/api/orders/selectMyOrdes', {
					'uid': this.users.uid
				}).then(res => {
					this.orders = res.data;
				});
			},
			addComments(val) {
				Axios.post('/shopmng/api/orders/selectOne', {
					'oid': val.oid
				}).then(res => {
					this.order = res.data[0];
					this.show = true;
					this.comments.gid = this.order.id;
					this.comments.oid = this.order.oid;
					this.comments.uid = this.order.uid;
				});
			},
			addContent(comments) {
				this.$refs[comments].validate(valid => {
					if (valid) {
						this.comments.content = this.comments.content;
						Axios.post('/shopmng/api/comments/insertComments', this.comments).then(res => {
							if (res.data.affectedRows > 0) {
								ElMessage({
									type: 'success',
									message: '评论成功！',
								});
								this.show = false;
								this.updatePingjia();
								this.getOrders();
							} else {
								ElMessage({
									type: 'info',
									message: '评论失败',
								})
							}
						});
					} else {
						return false
					}
				})
			},
			updatePingjia() {
				Axios.post('/shopmng/api/orders/updatePingjia', {
					'oid': this.comments.oid
				}).then(res => {
					this.orders = res.data;
				});
			}
		}
	}
</script>

<style>
</style>
