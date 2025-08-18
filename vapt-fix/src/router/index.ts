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
import Onboarding1View from '../views/Dashboard/Onboarding1View.vue'
import AdminDashboardOnboardingView from '../views/Dashboard/AdminDashboardOnboardingView.vue'
import MitigationStrategyView from '../views/Dashboard/MitigationStrategyView.vue'
import AssetsView from '../views/Dashboard/AssetsView.vue'
import VulnerabilityExplorerView from '../views/VulnerabilityExplorerView.vue'
import MissingSecurityUpdatesView from '../views/Dashboard/MissingSecurityUpdatesView.vue'
import VulnerabilityCardView from '../views/Dashboard/VulnerabilityCardView.vue'
import YourTeamView from '../views/Dashboard/YourTeamView.vue'
import PricingplansView from '../views/PricingplansView.vue'
import RiskCriteriaView from '../views/RiskCriteriaView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pricingplan',
      name: 'pricingplan',
      component: PricingplansView,
    },
    {
      path: '/vulnerabilityexplorer',
      name: 'vulnerabilityexplorer',
      component: VulnerabilityExplorerView,
    },
    {
      path: '/location',
      name: 'location',
      component: LocationView,
    },
    {
      path: '/riskcriteria',
      name: 'riskcriteria',
      component: RiskCriteriaView,
    },
    {
      path: '/uploadreport',
      name: 'uploadreport',
      component: UploadReportView,
    },
    {
      path: '/onboarding1',
      name: 'onboarding1',
      component: Onboarding1View,
    },
    {
      path: '/admindashboardonboarding',
      name: 'admindashboardonboarding',
      component: AdminDashboardOnboardingView,
    },
    {
      path: '/mitigationstrategy',
      name: 'mitigationstrategy',
      component: MitigationStrategyView,
    },
    {
      path: '/missingsecurityupdates',
      name: 'missingsecurityupdates',
      component: MissingSecurityUpdatesView,
    },
    {
      path: '/vulnerabilitycard',
      name: 'vulnerabilitycard',
      component: VulnerabilityCardView,
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
      path: '/dashboard1',
      name: 'dashboard1',
      component: Dashboard1View,
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
    {
      path: '/assets',
      name: 'assets',
      component: AssetsView,
    },
    {
      path: '/yourteam',
      name: 'yourteam',
      component: YourTeamView,
    },

  ],
})

export default router
