import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    routes: [{ 
        path: '/',
        component: resolve => require(['@/components/Index'], resolve),
        meta:{
          title: '工作台',
          requireAuth: true
        }
    },{ //登录
      path: '/login',
      component: resolve => require(['@/components/user/Login'], resolve)
    },{  //home
        path: '/MainIndex',
        component: resolve => require(['@/components/common/MainIndex'], resolve),
        children:[{
              path: 'productInstManage',  //产品中心
              component: resolve => require(['@/components/product/creditCard/ProductInstManage'], resolve),
              meta: {
                title: '分期产品管理',
              }
            },{
              path: 'legalPerson',   //权限管理跳进来
              component: resolve => require(['@/components/jurisdiction/LegalPerson'], resolve),
              meta: {
                title: '法人管理',
              }
            },{
              path: 'user',   //用户管理
              component: resolve => require(['@/components/jurisdiction/User'], resolve),
              meta: {
                title: '用户管理',
              }
            },{
              path: 'organization',   //机构管理
              component: resolve => require(['@/components/jurisdiction/Organization'], resolve),
              meta: {
                title: '机构管理',
              }
            },{
              path: 'fun',  //系统管理跳进来
              component: resolve => require(['@/components/system/Fun'], resolve),
              meta: {
                title: '功能管理',
              }
            },
        ]
    }
  
  ]

})


router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) { // 判断是否需要登录权限
    if(window.sessionStorage.getItem('token')) { // 判断是否登录
			next();
    } else { // 没登录则跳转到登录界面
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next()
  }
  
})

export default router;