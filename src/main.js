import { createApp } from 'vue'
import App from './App.vue'

//引入element-plus
import ElementUI from 'element-plus'
import 'element-plus/theme-chalk/index.css'

//引入router路由---引入src下route文件夹下的index.js
import router from './route'


createApp(App).use(ElementUI).use(router).mount('#app')
