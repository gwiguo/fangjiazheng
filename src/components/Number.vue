<template>
	<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		<div style="margin-bottom: 20px;">
			<el-input placeholder="请输入商品名称搜索" v-model="goodsname"></el-input>
		</div>
		<el-button type='danger' style="margin-bottom: 20px;" @click="addNumber">进货</el-button>
		<el-table :data="shangpin" style="width: 100%">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column label="商品名称" width="150" prop='goodsname'>
			</el-table-column>
			<el-table-column label="商品单价" width="150" prop='price'>
			</el-table-column>
			<el-table-column label="商品库存" width="150" prop='number'>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template #default="scope">
					<el-button size="small" type='daner' @click="updateNumber(scope.row)">修改商品库存</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 对话框 -->
		<el-dialog  v-model="show" :type="type" :title="title" width="40%" >
			<el-form :model="goods" :rules="rules" ref="goods">
				  <el-form-item label="商品名称" prop="goodsname" label-width="600">
				  	<el-select v-model="goods.goodsname" @change="getPrice" placeholder="请选择">
				  		<el-option v-for="(item,index) in shangpin" :label="item.goodsname" :value="item.goodsname" :key="index"></el-option>
				  	</el-select>
				  </el-form-item>
				  <el-form-item label="商品单价" prop="price" label-width="600">
				  	<el-input v-model="goods.price" disabled autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="商品库存" prop="number" label-width="600">
				  	<el-input v-model="goods.number" autocomplete="off"></el-input>
				  </el-form-item>
			    </el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">取消</el-button>
					<el-button v-if="type == 'create'" type="primary" @click="addNum('goods')">确定</el-button>
					<el-button v-if="type == 'update'" type="primary" @click="editNum('goods')">修改</el-button>
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
		name: 'Number',
		components: {
			Index
		},
		data() {
			return{
				shangpin: [],
				goodsname: '',
				goods: {},
				show: false,
				caigou: {},
				rules: {
					goodsname: [{
						required: true,
						message: '请选择商品名称',
						trigger: 'blur'
					}],
					number: [{
						required: true,
						message: '请填写商品库存',
						trigger: 'blur'
					}]
				}
			}
		},
		watch: {
			goodsname() {
				//根据goodsname的变化去后台查找匹配的商品
				Axios.post('/shopmng/api/goods/selectName', {
					goodsname: this.goodsname
				}).then(res => {
					this.shangpin = res.data;
				})
			}
		},
		created() {
			this.getGoods();
		},
		methods:{
			getPrice() {
				Axios.post('/shopmng/api/goods/selectPrice',{
					'goodsname': this.goods.goodsname
				}).then(res => {
					this.goods.price = res.data[0].price;
				});
			},
			editNum(goods) {
				this.$refs[goods].validate(valid => {
					if (valid) {
						Axios.post('shopmng/api/goods/editNumber', this.goods).then(res => {
							if (res.data.affectedRows > 0) {
								ElMessage({
									type: 'success',
									message: '修改成功',
								});
								this.show = false;
								this.getGoods();
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
			updateNumber(val) {
				this.show = true;
				this.title = "修改商品库存";
				this.type = "update";
				Axios.post('/shopmng/api/goods/selectOne', {
						'id': val.id
					}).then(res => {
					this.goods = res.data[0];
				});
			},
			getGoods() {
				Axios.post('/shopmng/api/goods/selectAll').then(res => {
					this.shangpin = res.data;
				});
			},
			addNumber() {
				//单击时对话框可见
				this.show = true;
				this.title = "添加商品库存";
				this.type = "create";
				this.goods.goodsname = '';
				this.goods.number = '';
			},
			addCaigou() {
				this.caigou.goodsname = this.goods.goodsname;
				this.caigou.price = this.goods.price;
				this.caigou.num = this.goods.number;
				this.caigou.money = this.goods.number*this.goods.price;
				Axios.post('/shopmng/api/caigou/add',this.caigou).then(res => {
					if (res.data.affectedRows == 1) {
						ElMessage({
							message: '已生成采购订单',
							type: 'success',
						});
					} else {
						ElMessage.error('操作失败')
					}
				});
			},
			addNum(goods) {
				this.$refs[goods].validate(valid => {
					if (valid) {
						Axios.post('/shopmng/api/goods/addNumber',this.goods).then(res => {
							if (res.data.affectedRows == 1) {
								ElMessage({
									message: '已加库存',
									type: 'success',
								});
								this.show = false;
								this.getGoods();
								this.addCaigou();
							} else {
								ElMessage.error('操作失败')
							}
						});
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
