import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/http'
import {localStorage} from '@/assets/js/storage/index'
import allrouter from '@/router/allrouter'
import {renderMenu} from '@/assets/js/prototype.js'
Vue.use(Vuex);
const state = {
    userinfo:{},
    userRouter:[]
}
const getters = {
    getUserInfo:function(state){
        return state.userinfo
    },
    userRouters:function(state){
       return state.userRouter
    }
}
const mutations = {
    SET_USERINFO(state,data){
        state.userinfo = data
    },
    GENERATE_ROUTER(state,addrouter){
        state.userRouter = ""
        state.userRouter = addrouter
    }
}
const actions = {
    //登录
    LoginByUsername({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            http.post('/login',userInfo).then(res=>{
              if (res.status == 200) {
                commit('SET_USERINFO', res.data)
                localStorage.setItem("userinfo",JSON.stringify(state))
                resolve()
              }else{
                reject(res.msg)
              }
            }).catch(err=>{
              reject(err)
            })
        });
    },
    //拉去路由表
    GenerateRoutes({commit}){
        return new Promise ((resolve,reject)=>{
            http.post('/getRoleAuth',{id:state.userinfo.id,parent_id:""}).then(res=>{
              if (res.status == 200) {
                let dtRouter = renderMenu(res.data.me);
                let generateRouter = MathRouter(allrouter,dtRouter)
                commit('GENERATE_ROUTER',generateRouter)
                localStorage.setItem("userinfo",JSON.stringify(state))
                resolve()
              }else{
                reject(res.msg)
              }
            }).catch(err=>{
              reject(err)
            })
            
        })
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    // ...
})
function MathRouter(allRouter,userRouter){
    let newRouter = [],allrouterArr = []
    allRouter.map((v,i)=>{
        let obj = {
          path:v.path,
          title:v.title,
          children:v.children
        }
        allrouterArr.push(obj)
    })
    allrouterArr.map((v1,i1)=>{
       userRouter.map((v2,i2)=>{
           if (v1.path == v2.path) {
             //匹配children
             let menu2Arr = []
             v1.children.map((v3,i3)=>{
               v2.children.map((v4,i4)=>{
                 if (v3.path == v4.path) {
                   menu2Arr.push(i3)
                 }
               })
             })
             newRouter.push({
               menu1:i1,
               menu2:menu2Arr
             })
           }
       })
    })
    //匹配完成，生成路由
    let generateRouter = [];
    newRouter.map((v,i)=>{
       let obj = JSON.parse(JSON.stringify(allRouter[v.menu1]))
       obj.children  = [];
       v.menu2.map((v2,i2)=>{
           obj.children.push(allrouter[v.menu1].children[v2])
       });
       generateRouter.push(obj);
    })
    //创建白名单菜单
    allrouter.map(function(v){
      if (v.iswhite) {
        delete v.children;
        generateRouter.unshift(v);
      }

    })
    return generateRouter
}
export default store