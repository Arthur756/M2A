import Vue from 'vue';
import VueRouter from 'vue-router';

import Sistema from '../views/Sistema.vue';
import Empresas from '../views/Empresas';
import Grupos from '../views/Grupos';
import Usuarios from '../views/Usuarios';
import Diagnosticos from '../views/Diagnosticos';
import Respostas from '../views/Respostas';
import Dados from '../views/Dados';
import Questionario from '../views/Questionario';

import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      auth: 'redirect',
    }
  },
  {
    path: '/sistema',
    name: 'Sistema',
    component: Sistema,
    meta: {
      auth: 'redirect',
    },
    children: [
      {
        path: '/empresas',
        component: Empresas,
        meta: {
          auth: 'redirect',
        },
      },
      {
        path: '/grupos',
        component: Grupos,
        meta: {
          auth: 'redirect',
        },
      },
      {
        path: '/usuarios',
        component: Usuarios,
        meta: {
          auth: 'redirect',
        },
      },
      {
        path: '/diagnosticos',
        component: Diagnosticos,
        meta: {
          auth: 'redirect',
        },
      },
      {
        path: '/respostas',
        component: Respostas,
        meta: {
          auth: 'redirect',
        },
      },
      {
        path: '/dados',
        component: Dados,
        meta: {
          auth: 'redirect',
        },
      },
      {
        path: '/questionario',
        component: Questionario,
        meta: {
          auth: 'redirect',
        },
      },
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || null;
  console.log('TOKEN', token);

  if (to.meta.auth === 'required') {
    if (token) {
      console.log('NEXT');
      next();
    } else {
      next('/');
    }
  } else if (to.meta.auth === 'redirect' && token) {
    next('/empresas');
  }

  next();
});

export default router;
