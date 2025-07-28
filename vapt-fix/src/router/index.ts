import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LocationView from '../views/LocationView.vue'
import ConfigureteamsView from '../views/Configureteams.vue'
import UploadReportView from '../views/UploadReportView.vue'
import Dashboard1View from '../views/Dashboard/Dashboard1View.vue'
import SignupView from '../views/SignupView.vue'
import SignInView from '../views/SignInView.vue'
import CreateNewTicketView from '../views/Dashboard/CreateNewTicketView.vue'
import SupportTicketView from '../views/Dashboard/SupportTicketView.vue'
import FixesView from '../views/Dashboard/FixesView.vue'
import ExceptionsView from '../views/Dashboard/ExceptionsView.vue'
import VulnerabilityRegisterView from '../views/Dashboard/VulnerabilityRegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/location',
      name: 'location',
      component: LocationView,
    },
    {
      path: '/configureteams',
      name: 'configureteams',
      component: ConfigureteamsView,
    },
    {
      path: '/uploadreport',
      name: 'uploadreport',
      component: UploadReportView,
    },
    {
      path: '/dashboard1',
      name: 'dashboard1',
      component: Dashboard1View,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/createnewticket',
      name: 'createnewticket',
      component: CreateNewTicketView,
    },
    {
      path: '/supportticket',
      name: 'supportticket',
      component: SupportTicketView,
    },
    {
      path: '/fixes',
      name: 'fixes',
      component: FixesView,
    },
    {
      path: '/exceptions',
      name: 'exceptions',
      component: ExceptionsView,
    },
    {
      path: '/vulnerabilityregister',
      name: 'vulnerabilityregister',
      component: VulnerabilityRegisterView,
    },

  ],
})

export default router
