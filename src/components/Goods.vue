<template>
	<div>
		<Index></Index>


		<div style="width: 1300px;margin: 0px auto;">


			<!-- 首页 -->
			<div style="width: 1300px;">
				<div style="margin-top: 15px; width: 100%;margin: 0px auto; text-align: center;">
					<el-input placeholder="请输入商品名称搜索" v-model="goodsname">
					</el-input>
					<div class="leixing">
						<span class="lx">商品类型：</span>
						<el-button class="lx_item" round type="info" plain @click="getGoods()">全部</el-button>&nbsp;
						<el-button round type="danger" plain v-for="types in categoryList" :key='types'
							@click="showByType(types)">
							{{types.typename}}
						</el-button>
					</div>
					<div class="leixing lx">
						<span class="lx">价格：</span>
						<el-button round type="danger" plain @click="showByPriceS()">从低到高</el-button>&nbsp;
						<el-button round type="danger" plain @click="showByPriceJ()">从高到低</el-button>
					</div>
				</div>

				<div>
					<!-- <h1>商品信息</h1> -->
					<div v-for="(goods,index) in goodsList" :key="index" style="float: left;margin: 10px 32px;">
						<img :src="'http://localhost:8080/' + goods.imgs"
							style="width: 260px;height: 130px;" /><br /><br />
						<el-link type="danger" @click="getxiangqing(goods)">{{goods.goodsname}}</el-link>&nbsp;
						<el-link type="danger" @click="getxiangqing(goods)">{{goods.price}}(元)</el-link>
						&nbsp;&nbsp;&nbsp;
						<el-link type="info" @click="getxiangqing(goods)">评价</el-link>
					</div>
				</div>
				<!-- 对话框 -->
				<el-dialog v-model="show" title="商品详情" width="700px">
					<el-form :model="goods">
						<img :src="'http://localhost:8080/' + goods.imgs"
							style="win-width:700px; width: 80%;height: 260px;margin-left: 10%;" />

						<el-form-item label="商品类型:" label-width="600">
							{{goods.typename}}
						</el-form-item>
						<el-form-item label="商品名称:" label-width="600">
							{{goods.goodsname}}
						</el-form-item>
						<el-form-item label="商品价格:" label-width="600">
							{{goods.price}}元/份
						</el-form-item>
						<el-form-item label="商品生产日期:" label-width="600">
							{{goods.productiondate}}
						</el-form-item>
						<el-form-item label="商品产地:" label-width="600">
							{{goods.region}}
						</el-form-item>
						<el-button type="danger" @click="addCard(goods)">加入购物车</el-button>

					</el-form>
					<h4>评价信息</h4>
					<div v-if="showPingjia">
						<el-table :data="pingjia" style="width: 100%">
							<el-table-column label="序号" width="100">
								<template #default="scope">
									{{scope.$index+1}}
								</template>
							</el-table-column>
							<el-table-column label="商品评价" width="100" prop='content'>
							</el-table-column>
							<el-table-column label="商品时间" width="280" prop='ctime'>
							</el-table-column>
						</el-table>
					</div>
				</el-dialog>
			</div>
		</div>

	</div>
</template>

<script>
	import Index from './UserTop.vue'
	import Axios from 'axios'
	import {
		ElMessage
	} from 'element-plus' //element-plus模块
	import router from "../route/index.js"
	export default {
		name: 'Notes',
		components: {
			Index
		},
		data() {
			return {
				goodsname: '',
				categoryList: [],
				goodsList: [],
				goodsLunbo: [],
				goods: {},
				show: false,
				list: [],
				// cardList: [],
				showPingjia: false,
				pingjia: [],
				users: {},
				card: {}
			}
		},
		created() {
			this.getUsers();
			this.getGoodsType();
			this.getGoods();
		},
		watch: {
			goodsname() {
				//根据goodsname的变化去后台查找匹配的商品
				Axios.post('/shopmng/api/goods/selectName', {
					goodsname: this.goodsname
				}).then(res => {
					this.goodsList = res.data;
				})
			}
		},
		methods: {
			getUsers() {
				// 获取sessionstorage中的用户信息
				let str = sessionStorage.getItem('users')
				if (str != null) {
					//把字符串转换成对象 --- sessionStorage存的必须时字符串，所以取出来的也是字符串
					this.users = JSON.parse(str);
				}
			},
			addCard(val) {
				let str = sessionStorage.getItem('users')
				if (str == null) {
					//把字符串转换成对象 --- sessionStorage存的必须时字符串，所以取出来的也是字符串
					ElMessage.error('请先登录');
					router.push('/Login')
					return;
				}
				this.card.gid = val.id;
				this.card.uid = this.users.uid;
				Axios.post('/shopmng/api/card/add', this.card).then(res => {
					if (res.data.affectedRows == 1) {
						ElMessage({
							message: '添加成功，请在购物车查看!',
							type: 'success',
						});
					} else {
						ElMessage.error('添加失败')
					}
				});
			},
			getxiangqing(goods) {
				this.show = true;
				Axios.post('/shopmng/api/goods/selectById', {
					'id': goods.id
				}).then(res => {
					console.log(res.data);
					this.list = res.data;
					this.goods = res.data[0];
				});
				this.getpingjia(goods);
			},
			getpingjia(goods) {
				this.showPingjia = true;
				Axios.post('/shopmng/api/comments/selectById', {
					'gid': goods.id
				}).then(res => {
					this.pingjia = res.data;
				});
			},
			getGoodsType() { //获取商品类型
				Axios.post('/shopmng/api/type/selectAll').then(res => {
					this.categoryList = res.data;
				});

			},
			getGoods() {
				Axios.post('/shopmng/api/goods/selectAll').then(res => {
					this.goodsList = res.data;
					this.goodsLunbo = res.data;
				});
			},
			showByType(types) {
				Axios.post('/shopmng/api/goods/selectType', {
					type: types.id
				}).then(res => {
					this.goodsList = res.data;
				});
			},
			showByPriceS() {
				Axios.post('/shopmng/api/goods/selectPriceS').then(res => {
					this.goodsList = res.data;
					console.info(JSON.stringify(this.goodsList))
				});
			},
			showByPriceJ() {
				Axios.post('/shopmng/api/goods/selectPriceJ').then(res => {
					this.goodsList = res.data;
				});
			}
		}
	}
</script>

<style>
	.leixing {
		margin-top: 20px;
		margin-left: 10px;
		clear: both;
		text-align: left;
	}

	.lx {
		font-size: 15px;
		padding-right: 20px;
		margin-bottom: 20px;
	}

	.lx_item {
		font-size: 14px;
		padding: 0px 10px;
		cursor: pointer;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}
</style>
