import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        gallery: 'Gallery',
        about: 'About',
        admin: 'Admin',
        profile: 'Profile',
        login: 'Login',
        logout: 'Logout'
      },
      auth: {
        welcomeBack: 'Welcome Back',
        joinGallery: 'Join The Gallery',
        accessCollection: 'Access your private collection and saved masterpieces.',
        startJourney: 'Start your journey as a collector and curate your archive.',
        collectorName: 'Collector Name',
        email: 'Email Address',
        password: 'Security Password',
        login: 'Login',
        createAccount: 'Create Account',
        verifying: 'Verifying...',
        newCollector: 'New to the gallery?',
        alreadyCollector: 'Already have an account?',
        register: 'Register as a Collector',
        signInArchive: 'Sign in to your Archive'
      },
      hero: {
        title: 'Yu Yun Ge',
        subtitle: 'Elegant Jade Exhibition & Curation',
        cta: 'Explore Collection'
      },
      filter: {
        all: 'All Types',
        price: 'Price Range',
        material: 'Material',
        search: 'Search jade...'
      },
      product: {
        price: 'CNY {{price}}',
        dimensions: 'Dimensions',
        origin: 'Origin',
        material: 'Material',
        description: 'Description',
        addToFavorites: 'Add to Favorites',
        removeFromFavorites: 'Remove from Favorites'
      },
      admin: {
        dashboard: 'Dashboard',
        addProduct: 'Add New Product',
        editProduct: 'Edit Product',
        deleteProduct: 'Delete',
        table: {
          name: 'Name',
          price: 'Price',
          category: 'Category',
          actions: 'Actions'
        },
        form: {
          nameZh: 'Chinese Name',
          nameEn: 'English Name',
          descZh: 'Chinese Description',
          descEn: 'English Description',
          category: 'Category',
          price: 'Price',
          materialZh: 'Chinese Material',
          materialEn: 'English Material',
          originZh: 'Chinese Origin',
          originEn: 'English Origin',
          dimensions: 'Dimensions',
          upload: 'Upload Images',
          submit: 'Save Product',
          cancel: 'Cancel'
        }
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        gallery: '展厅',
        about: '关于我们',
        admin: '管理后台',
        profile: '个人中心',
        login: '登录',
        logout: '退出'
      },
      auth: {
        welcomeBack: '欢迎回归',
        joinGallery: '加入展厅',
        accessCollection: '访问您的个人收藏和保存的杰作。',
        startJourney: '开启您的收藏家之旅，策划您的档案。',
        collectorName: '收藏家姓名',
        email: '电子邮件',
        password: '安全密码',
        login: '登录',
        createAccount: '创建账号',
        verifying: '验证中...',
        newCollector: '展厅新用户？',
        alreadyCollector: '已经有账号？',
        register: '注册成为收藏家',
        signInArchive: '登录您的收藏档案'
      },
      hero: {
        title: '玉韵阁',
        subtitle: '高端玉石展示与销售平台',
        cta: '浏览藏品'
      },
      filter: {
        all: '全部类型',
        price: '价格区间',
        material: '材质',
        search: '搜索玉石...'
      },
      product: {
        price: '￥{{price}}',
        dimensions: '规格',
        origin: '产地',
        material: '材质',
        description: '详情介绍',
        addToFavorites: '收藏',
        removeFromFavorites: '取消收藏'
      },
      admin: {
        dashboard: '管理面板',
        addProduct: '新增产品',
        editProduct: '编辑产品',
        deleteProduct: '删除',
        table: {
          name: '名称',
          price: '价格',
          category: '分类',
          actions: '操作'
        },
        form: {
          nameZh: '中文名称',
          nameEn: '英文名称',
          descZh: '中文描述',
          descEn: '英文描述',
          category: '分类',
          price: '价格',
          materialZh: '中文材质',
          materialEn: '英文材质',
          originZh: '中文产地',
          originEn: '英文产地',
          dimensions: '尺寸规格',
          upload: '上传图片',
          submit: '保存产品',
          cancel: '取消'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
