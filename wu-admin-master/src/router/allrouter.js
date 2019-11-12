import Layout from '@/components/layout'
const allrouter = [
    {
      path: '/',
      title: '首页',
      icon: 'fa fa-home',
      redirect: '/index',
      component: Layout,
      iswhite:true,
      children:[
        {
          path:"/index",
          title:"主页",
          component:()=>import('@/components/home')
        },
      ]
    },
    {
      path: '/list',
      title: '列表',
      icon: 'el-icon-adm-project',
      component:  Layout,
      children:[
        {
          path:"/list/index",
          title:"地区",
          component:()=> import('@/pages/list')
        }
      ]
    },
    {
      path:'/tabel',
      title:"表格管理",
      icon: 'fa fa-table',
      component: Layout,
      children:[
        {
          path:'/table/list',
          title:'选择表格',
          component:()=>import('@/pages/table/list')
        }
      ]
    },
    {
      path:'/atricle',
      title:"文章管理",
      icon: 'fa fa-list-alt',
      component: Layout,
      children:[
        {
          path:'/atricle/list',
          title:'文章列表',
          component:()=>import('@/pages/atricle/list')
        },
        {
          path:'/atricle/add',
          title:'文章添加',
          isMenu:'2',
          component:()=>import('@/pages/atricle/add')
        },
        {
          path:'/atricle/edit',
          title:'文章编辑',
          isMenu:'2',
          component:()=>import('@/pages/atricle/edit')
        },
        {
          path:'/atricle/type',
          title:'分类管理',
          isMenu:'1',
          component:()=>import('@/pages/atricle/type')
        },
      ]
    },
    {
      path: '/laboratory',
      title: '实验室',
      icon: 'fa fa-flask',
      component:  Layout,
      children:[
        {
          path:"/laboratory/nodelib",
          title:"node实验",
          component:()=> import('@/pages/laboratory/nodeLab')
        },
        {
          path:"/laboratory/fileWatch",
          title:"远程预览",
          component:()=> import('@/pages/laboratory/fileWatch')
        },
      ]
    },
    {
      path: '/sys',
      title: '系统管理',
      icon: 'fa fa-users',
      component:  Layout,
      children:[
        {
          path: '/sys/user',
          title: '用户管理',
          component:()=>import('@/pages/sys/user')
        },
        {
          path: '/sys/Jurisdiction',
          title: '权限管理',
          component:()=>import('@/pages/sys/jur')
        },
      ]
    }
  ]
  export default allrouter