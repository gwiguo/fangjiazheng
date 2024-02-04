<template>
	<div>
		<Index></Index>
		<div style="width: 1300px;margin:0px auto;">
			<el-table :data="comments" style="width: 100%">
				<el-table-column label="序号" width="100">
					<template #default="scope">
						{{scope.$index+1}}
					</template>
				</el-table-column>
				<el-table-column label="用户名" width="150" prop='uname'>
				</el-table-column>
				<el-table-column label="商品名称" width="150" prop='goodsname'>
				</el-table-column>
				<el-table-column label="图片" width="250">
					<template #default="scope">
						<img :src="'http://localhost:8080/' + scope.row.imgs"
							style="width: 200px;height: 130px;" />
					</template>
				</el-table-column>
				<el-table-column label="评价内容" width="250" prop='content'>
				</el-table-column>
				<el-table-column label="评价时间" width="250" prop='ctime'>
				</el-table-column>
			</el-table>
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
		name: 'MyComments',
		components: {
			Index
		},
		data() {
			return {
				comments: []
			}
		},
		created() {
			this.getUsers();
			this.getComments();
		},
		methods: {
			getUsers() {
				// 获取sessionstorage中的用户信息
				let str = sessionStorage.getItem('users')
				if (str != null) {
					this.show = true; //欢迎可见
					//把字符串转换成对象 --- sessionStorage存的必须时字符串，所以取出来的也是字符串
					this.users = JSON.parse(str);
				}
			},
			getComments() {
				Axios.post('/shopmng/api/comments/selectMyComments', {
					'uid': this.users.uid
				}).then(res => {
					this.comments = res.data;
				});
			}
		}
	}
</script>

<style>
</style>
