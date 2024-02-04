<template>
	<div>
		<Index></Index>

		<!-- 首页 -->
		<div style="width: 1400px;margin: 0px auto;">


			<div style="margin-top: 15px; width: 80%;margin: 0px auto; text-align: center;">
				<el-input placeholder="请输入商品名称搜索" v-model="goodsname">
				</el-input>

			</div>
			<div class="lunbo" style="margin-top: 30px;">
				<!-- 轮播 -->
				<div class="focusPic">
					<div class="focus-ctrl" id="focus-ctrl">
						<ul class="focus-ctrl-wrap">
							<li class="current" @mouseenter="changeBanner($event,0)"><i class="item">占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位</i></li>
							<li class="" @mouseenter="changeBanner($event,1)"><i class="item">占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位</i></li>
							<li class="" @mouseenter="changeBanner($event,2)"><i class="item">占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位</i></li>
							<li class="" @mouseenter="changeBanner($event,3)"><i class="item">占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位</i></li>
							<li class="" @mouseenter="changeBanner($event,4)"><i class="item">占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位</i></li>
							<li class="" @mouseenter="changeBanner($event,5)"><i class="item">占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位占位</i></li>
						</ul>
					</div>
					<div class="focus-filter">
						<img class="pic"
							src="../assets/li.jpg" alt="">
					</div>
					<div class="focus-pic" id="focus-slide">
						<div class="slide-wrap">
							<ul class="pics">
								<li style="display: none;">
									<a vlocation="banner"
										href="https://pconline.pcvideo.com.cn/video-32761.html" target="_blank"
										class="SensorLink"><img loading="lazy"
											src="../assets/li.jpg"
											alt="" width="100%" loaded="true"></a>
									<i class="label-original"></i>
								</li>
								<li style="display: none;">
									<a vlocation="banner"
										href="https://pconline.pcvideo.com.cn/video-32749.html" target="_blank"
										class="SensorLink"><img loading="lazy"
											src="../assets/pingguo.jpg"
											alt="" width="100%" loaded="true"></a>
									<i class="label-original"></i>
								</li>
								<li style="display: none;">
									<a vlocation="banner"
										href="https://pconline.pcvideo.com.cn/video-32618.html" target="_blank"
										class="SensorLink"><img loading="lazy"
											src="../assets/jirou.jpg"
											alt="" width="100%" loaded="true"></a>
									<i class="label-original"></i>
								</li>
								<li style="display: list-item;">
									<a vlocation="banner"
										href="https://pconline.pcvideo.com.cn/video-32643.html" target="_blank"
										class="SensorLink"><img loading="lazy"
											src="../assets/yizi.jpg"
											alt="" width="100%" loaded="true"></a>
									<i class="label-original"></i>
								</li>
								<li style="display: none;">
									<a vlocation="banner"
										href="//pconline.pcvideo.com.cn/video-32615.html" target="_blank"
										class="SensorLink"><img loading="lazy"
											src="../assets/niujianzi.jpg"
											alt="" width="100%" loaded="true"></a>
									<i class="label-original"></i>
								</li>
								<li style="display: none;">
									<a vlocation="banner"
										href="https://pconline.pcvideo.com.cn/video-32495.html" target="_blank"
										class="SensorLink"><img loading="lazy"
											src="../assets/peigen.jpg"
											alt="" width="100%" loaded="true"></a>
									<i class="label-original"></i>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h1 style="text-align: center;">商品信息</h1>
				<div v-for="(goods, index) in goodsList" @click="getxiangqing(goods)" :key="index" style="float: left;margin: 10px 32px;cursor: pointer;">
					<img :src="'http://localhost:8080/' + goods.imgs" style="width: 260px;height: 130px;" /><br /><br />
					<el-link type="danger">{{ goods.goodsname }}</el-link>&nbsp;
					<el-link type="danger">{{ goods.price }}(元)</el-link>&nbsp;&nbsp;&nbsp;
					<el-link type="info">评价</el-link>
				</div>
			</div>
			<!-- 对话框 -->
			<el-dialog v-model="show" title="商品详情" width="700px">
				<el-form :model="goods">
					<img :src="'http://localhost:8080/' + goods.imgs"
						style="win-width:700px; width: 80%;height: 260px;margin-left: 10%;" />

					<el-form-item label="商品类型:" label-width="600">
						{{ goods.typename }}
					</el-form-item>
					<el-form-item label="商品名称:" label-width="600">
						{{ goods.goodsname }}
					</el-form-item>
					<el-form-item label="商品价格:" label-width="600">
						{{ goods.price }}元/份
					</el-form-item>
					<el-form-item label="商品生产日期:" label-width="600">
						{{ goods.productiondate }}
					</el-form-item>
					<el-form-item label="商品产地:" label-width="600">
						{{ goods.region }}
					</el-form-item>
					<el-button type="danger" @click="addCard(goods)">加入购物车</el-button>

				</el-form>
				<h4>评价信息</h4>
				<div v-if="showPingjia">
					<el-table :data="pingjia" style="width: 100%">
						<el-table-column label="序号" width="100">
							<template #default="scope">
								{{ scope.$index + 1 }}
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
		},
    changeBanner(e,i){
      [...document.querySelectorAll(".focus-ctrl-wrap > li")].forEach(li=>{
        li.setAttribute("class","")
      });
      [...document.querySelectorAll(".pics li")].forEach(li=>{
        li.style.display = "none"
      })

      
      e.target.setAttribute("class","current")
      document.querySelectorAll(".pics li")[i].style.display = 'list-item'
      document.querySelector(".focus-filter .pic").src = document.querySelectorAll(".pics li img")[i].src
    }
	}
}
</script>

<style>.leixing {
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
}</style>
<style>
.focusPic {
    position: relative;
    height: 520px;
    margin-bottom: 20px;
    overflow: hidden;
}

.focus-ctrl {
    /* position: absolute; */
    right: 0;
    top: 0;
    z-index: 2;
    width: 476px;
    height: 520px;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    -ms-backdrop-filter: blur(50px);
    -moz-backdrop-filter: blur(50px);
    padding-top: 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.3);
}

.focus-ctrl::after,
.focus-ctrl::before {
    content: '';
    position: absolute;

}

.focus-ctrl::after{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
}
.focus-ctrl::before {
    width: 100%;
    height: 520px;
    background-image: linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
    left: 0;
    top: 0;
}

.focus-ctrl {
    position: relative;
    z-index: 9;
    float: right;
}

.focus-ctrl li {
    display: flex;
    align-items: center;
}

.focus-ctrl li {
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    opacity: .7;
    padding: 0 30px;
    box-sizing: border-box;
}

.focus-ctrl .item {
    height: 72px;
    line-height: 72px;
    overflow: hidden;
    font-style: normal;
}

.focus-ctrl .current {
    background-image: linear-gradient(270deg, #ffffff00 0%, #ffffff26 50%, #ffffff00 100%);
    height: 120px;
    font-size: 20px;
    color: #FFFFFF;
    opacity: 1;
}
.focus-ctrl .current .item {
    line-height: 36px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all
}
.focus-ctrl-wrap{
    position: relative;
    z-index: 1;
}
.focus-pic {
    position: relative;
    width: 924px;
    height: 100%;
    float: left;
}
.focus-pic .pics a{
    display: block;
    position: relative;
    overflow: hidden;
}
.focus-pic .pics a::after{
    content: '';
    position: absolute;
    width: 100px;
    height: 520px;
    background-image: linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
    right: 0;
    top: 0;
}
.focus-pic .pics img{
    width: 100%;
    height: 520px;
    object-fit: cover;
}

.focus-filter {
    /* float: right; */
    width: 476px;
    overflow: hidden;
    height: 520px;
    position: absolute;
    right: 0;
    top: 0;
}

.focus-filter .pic {
    margin-left: -224px;
    height: 100%;
}

.focus-filter .cur {
    display: block;
}
ul{
  display: block;
  list-style-type: disc;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
</style>
