import Vue from 'vue'
import VueRouter from 'vue-router'

// import Main from '../views/Main.vue'
// element管理主页面
const Main = () => import('../views/Main.vue')

//登录
const Login = () => import('../views/Login.vue')

// 分类
const CategoryEdit = () => import('../views/CategoryEdit.vue')
const CategoryList = () => import('../views/CategoryList.vue')

// 装备
const ItemEdit = () => import('../views/ItemEdit.vue')
const ItemList = () => import('../views/ItemList.vue')

// 英雄
const HeroEdit = () => import('../views/HeroEdit.vue')
const HeroList = () => import('../views/HeroList.vue')

// 文章
const ArticleEdit = () => import('../views/ArticleEdit.vue')
const ArticleList = () => import('../views/ArticleList.vue')

// 文章
const AdEdit = () => import('../views/AdEdit.vue')
const AdList = () => import('../views/AdList.vue')

// 管理员
const AdminUserEdit = () => import('../views/AdminUserEdit.vue')
const AdminUserList = () => import('../views/AdminUserList.vue')



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isPublic: true } 
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        name: '分类创建',
        component: CategoryEdit
      },
      {
        path: '/categories/edit/:id',
        name: '分类编辑',
        component: CategoryEdit,
        // props: true
      },
      {
        path: '/categories/list',
        name: '分类列表',
        component: CategoryList
      },
      {
        path: '/items/create',
        name: '装备创建',
        component: ItemEdit
      },
      {
        path: '/items/edit/:id',
        name: '装备编辑',
        component: ItemEdit,
        // props: true
      },
      {
        path: '/items/list',
        name: '装备列表',
        component: ItemList
      },
      {
        path: '/heroes/create',
        name: '英雄创建',
        component: HeroEdit
      },
      {
        path: '/heroes/edit/:id',
        name: '英雄编辑',
        component: HeroEdit,
        // props: true
      },
      {
        path: '/heroes/list',
        name: '英雄列表',
        component: HeroList
      },
      {
        path: '/articles/create',
        name: '文章创建',
        component: ArticleEdit
      },
      {
        path: '/articles/edit/:id',
        name: '文章编辑',
        component: ArticleEdit,
        // props: true
      },
      {
        path: '/articles/list',
        name: '文章列表',
        component: ArticleList
      },
      {
        path: '/ads/create',
        name: '广告位创建',
        component: AdEdit
      },
      {
        path: '/ads/edit/:id',
        name: '广告位编辑',
        component: AdEdit,
        // props: true
      },
      {
        path: '/ads/list',
        name: '广告位列表',
        component: AdList
      },
      {
        path: '/admin_users/create',
        name: '管理员创建',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/edit/:id',
        name: '管理员编辑',
        component: AdminUserEdit,
        // props: true
      },
      {
        path: '/admin_users/list',
        name: '管理员列表',
        component: AdminUserList
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
