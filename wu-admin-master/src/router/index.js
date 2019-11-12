import Vue from 'vue'
import Router from 'vue-router'
import allrouter from '@/router/allrouter'
import Layout from '@/components/layout'
import {localStorage} from '@/assets/js/storage/index'
//路由采用懒加载方式
Vue.use(Router)
//路由白名单
const whiteRouter =[{
  path:'/login',
  name:'loginRouter',
  component: ()=> import('@/components/login')
}];
const routes = [
  ...whiteRouter,
  ...allrouter
]
const router =  new Router({
  routes:routes,
  mode:'history'
})
const singleRoutePath =function (path) {
  let singleRP = []
  allrouter.map((v,i)=>{
    singleRP.push(v.path)
    let vc = v.children
    if (vc!=undefined && vc.length>0) {
      vc.forEach(element => {
        singleRP.push(element.path)
      });
    }
  })
  return singleRP.indexOf(path)!== -1? true : false
}
router.beforeEach((to,from,next)=>{
  if (to.path !== '/login' && to.path !== '/index') {
    if (localStorage.getItem('userinfo') !== null) {
      //检测页面权限
      singleRoutePath(to.path) ? next() : next('/login')
    } else {
      next('/login')
    }
  } else {
    next()
  }
  
});

export default router;