
const routes = [
  {
    mode:"hash",
    path: "/",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/Pacientes', component: () => import('pages/PAcientes.vue') },
      { path: '/Consultas', component: () => import('pages/Consultas.vue') },
      { path: '/Compras', component: () => import('pages/Compras.vue') },
      { path: '/Medicamentos', component: () => import('pages/Medicamentos.vue') },
      { path: '/Consultas/:idCita', component: () => import('pages/Consultas.vue') },
    ],
  },

  {
    mode:"hash",
    path: "/",
    component:() => import('layouts/SecondLayout.vue'),
    children: [
      { path: '/Login', component: () => import('pages/Login.vue') },
      { path: '/RegDoc', component: () => import('pages/RegDoc.vue') },
      { path: '/Panel/:id', component: () => import('pages/Dashboard.vue') }
     ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
