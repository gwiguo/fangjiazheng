import { createWebHistory, createRouter } from 'vue-router'

const history = createWebHistory()

const router = createRouter({
  history,
  routes: [
	  
	  {
	  		 path: '/Admin',
	  		 name:'Admin',
	  		 component: () => import('@/components/Admin'),
	  },
	  {
	  		 path: '/UsersManage',
	  		 name:'UsersManage',
	  		 component: () => import('@/components/UsersManage'),
	  },
	  {
	  		 path: '/Goods',
	  		 name:'Goods',
	  		 component: () => import('@/components/Goods'),
	  },
	  
	  {
	  		 path: '/GoodsManage',
	  		 name:'GoodsManage',
	  		 component: () => import('@/components/GoodsManage'),
	  },
	  {
	  		 path: '/TypeManage',
	  		 name:'TypeManage',
	  		 component: () => import('@/components/TypeManage'),
	  },
	  {
	  		 path: '/Card',
	  		 name:'Card',
	  		 component: () => import('@/components/Card'),
	  },
	  {
	  		 path: '/Myorders',
	  		 name:'Myorders',
	  		 component: () => import('@/components/Myorders'),
	  },
	  {
	  		 path: '/OrdersManage',
	  		 name:'OrdersManage',
	  		 component: () => import('@/components/OrdersManage'),
	  },
	  {
	  		 path: '/MyComments',
	  		 name:'MyComments',
	  		 component: () => import('@/components/MyComments'),
	  },
	  {
	  		 path: '/SupplierManage',
	  		 name:'SupplierManage',
	  		 component: () => import('@/components/SupplierManage'),
	  },
	  
	  {
	  		 path: '/Number',
	  		 name:'Number',
	  		 component: () => import('@/components/Number'),
	  },
	  {
	  		 path: '/Caigou',
	  		 name:'Caigou',
	  		 component: () => import('@/components/Caigou'),
	  },
	  {
	  		 path: '/Myself',
	  		 name:'Myself',
	  		 component: () => import('@/components/Myself'),
	  },
	  {
	  		 path: '/',
	  		 name:'Notes',
	  		 component: () => import('@/components/Notes')
	  },
	  {
	  		 path: '/Lirun',
	  		 name:'Lirun',
	  		 component: () => import('@/components/Lirun')
	  },
	  {
	  		 path: '/Login',
	  		 name:'Login',
	  		 component: () => import('@/components/Login'),
	  },
	  {
	  		 path: '/Regist',
	  		 name:'Regist',
	  		 component: () => import('@/components/Regist'),
	  },
		
	   
  ]
})

export default router
