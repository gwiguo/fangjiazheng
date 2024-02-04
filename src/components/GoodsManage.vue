<template>
	<div>
		<Index></Index>
	
	<div style="width: 1300px;margin:0px auto;">
		<el-button style="margin-bottom: 20px;" type='danger' @click="showDialog">上架商品</el-button>
		<el-table :data="shangpin" style="width: 100%">
			<el-table-column label="序号" width="100">
				<template #default="scope">
					{{scope.$index+1}}
				</template>
			</el-table-column>
			<el-table-column label="图片" width="200">
				<template #default="scope">
					<img :src="'http://localhost:8080/' + scope.row.imgs"
						style="width: 200px;height: 130px;" />
				</template>
			</el-table-column>
			<el-table-column label="商品类型" width="100" prop='typename'>
			</el-table-column>
			<el-table-column label="商品名称" width="120" prop='goodsname'>
			</el-table-column>
			<el-table-column label="商品价格(元)" width="120" prop='price'>
			</el-table-column>
			<el-table-column label="生产日期" width="150" prop='productiondate'>
			</el-table-column>
			<el-table-column label="商品产地" width="100" prop='region'>
			</el-table-column>
			<el-table-column label="商品供应商" width="150" prop='suppliername'>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template #default="scope">
					<el-button size="small" type='daner' @click="deleteGoods(scope.row,scope.$index)">下架商品</el-button>
					<el-button size="small" type='daner' @click="updateGoods(scope.row)">修改商品</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 对话框 -->
		<el-dialog v-model="show" :type="type" :title="title" width="40%">
			<el-form :model="goods" :rules="rules" ref="goods">
				<el-form-item label="商品供应商" prop="sid" label-width="600">
					<el-select v-model="goods.sid" placeholder="请选择">
						<el-option v-for="(gys,index) in gongying" :label="gys.suppliername" :value="gys.id" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品类型" prop="type" label-width="600">
					<el-select v-model="goods.type" placeholder="请选择">
						<el-option v-for="(types,index) in categoryList" :label="types.typename" :value="types.id" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品名称" prop="goodsname" label-width="600">
					<el-input v-model="goods.goodsname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" prop="imgs" label-width="600">
					<el-input v-model="goods.imgs" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品价格(元)" prop="price" label-width="600">
					<el-input v-model="goods.price" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="生产日期(年-月-日)" prop="productiondate" label-width="600">
					<el-input v-model="goods.productiondate" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品库存" prop="number" label-width="600">
					<el-input v-model="goods.number" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品利润" prop="lirun" label-width="600">
					<el-input v-model="goods.lirun" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">取消</el-button>
					<el-button v-if="type == 'create'" type="primary" @click="addGoods('goods')">确定</el-button>
					<el-button v-if="type == 'update'" type="primary" @click="editGoods('goods')">修改</el-button>
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
		name: 'GoodsManage',
		components: {
			Index
		},
		data() {
			return {
				shangpin: [],
				categoryList: [],
				gongying: [],
				goods: {},
				show: false,
				type: '',
				title: '',
				rules: {
					sid: [{
						required: true,
						message: '请选择商品供应商',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择商品类型',
						trigger: 'blur'
					}],
					goodsname: [{
						required: true,
						message: '请填写商品名称',
						trigger: 'blur'
					}],
					imgs: [{
						required: true,
						message: '请填写商品图片',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请填写商品价格',
						trigger: 'blur'
					}],
					productiondate: [{
						required: true,
						message: '请填写生产日期',
						trigger: 'blur'
					}, {
						pattern: /\d{4}-\d{2}-\d{2}/,
						message: '请输入正确格式(yyyy-MM-dd)',
						trigger: 'blur'
					}],
					number: [{
						required: true,
						message: '请填写商品库存',
						trigger: 'blur'
					}],
					lirun: [{
						required: true,
						message: '请填写商品利润',
						trigger: 'blur'
					}],
				}
			}
		},
		created() {
			this.getGoods();
		},
		methods: {
			editGoods(goods) {
				this.$refs[goods].validate(valid => {
					if (valid) {
						Axios.post('shopmng/api/goods/updateInfo', this.goods).then(res => {
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
			updateGoods(val) {
				this.getGoodsType();
				this.getSupplier();
				this.show = true;
				this.title = "修改商品信息";
				this.type = "update";
				Axios.post('/shopmng/api/goods/selectOne', {
					'id': val.id
				}).then(res => {
					this.goods = res.data[0];
				});
			},
			addGoods(goods) {
				this.$refs[goods].validate(valid => {
					if (valid) {
						Axios.post('/shopmng/api/goods/add', this.goods).then(res => {
							console.log(res.data);
							if (res.data.affectedRows == 1) {
								ElMessage({
									message: '添加成功',
									type: 'success',
								});
								this.show = false;
								this.getGoods();
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
				this.getGoodsType();
				this.getSupplier();
				//单击时对话框可见
				this.show = true;
				this.title = "上架商品信息";
				this.type = "create";
				this.goods = {};
			},
			getSupplier() { //获取供应商
				Axios.post('/shopmng/api/supplier/selectAll').then(res => {
					this.gongying = res.data;
				});
			},
			getGoodsType() { //获取商品类型
				Axios.post('/shopmng/api/type/selectAll').then(res => {
					this.categoryList = res.data;
				});
			},
			getGoods() {
				Axios.post('/shopmng/api/goods/selectAll').then(res => {
					this.shangpin = res.data;
				});
			},
			deleteGoods(obj, index) {
				console.log(index);
				ElMessageBox.confirm(
					'确认删除吗？', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
					Axios.post('/shopmng/api/goods/deleteOne', {
						'id': obj.id
					}).then(res => {
						if (res.data.affectedRows == 1) {
							this.getGoods();
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
</style>
