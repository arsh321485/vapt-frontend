import { createRouter, createWebHistory } from 'vue-router'
// admin import
import Login from '../components/admin-component/Login.vue'
import HomeView from '../views/admin-views/HomeView.vue'
import LocationView from '../views/admin-views/LocationView.vue'
import UploadReportView from '../views/admin-views/UploadReportView.vue'
import Dashboard1View from '../views/admin-dashboard/Dashboard1View.vue'
import SignupView from '../views/admin-views/SignupView.vue'
import SignInView from '../views/admin-views/SignInView.vue'
import ForgotPasswordView from '../views/admin-views/ForgotPasswordView.vue'
import CreateNewTicketView from '../views/admin-dashboard/CreateNewTicketView.vue'
import SupportTicketView from '../views/admin-dashboard/SupportTicketView.vue'
import PendingView from '../views/admin-dashboard/PendingView.vue'
import FixesView from '../views/admin-dashboard/FixesView.vue'
import ExceptionsView from '../views/admin-dashboard/ExceptionsView.vue'
import VulnerabilityRegisterView from '../views/admin-dashboard/VulnerabilityRegisterView.vue'
import Onboarding1View from '../views/admin-dashboard/Onboarding1View.vue'
import AdminDashboardOnboardingView from '../views/admin-dashboard/AdminDashboardOnboardingView.vue'
import MitigationStrategyView from '../views/admin-dashboard/MitigationStrategyView.vue'
import AssetsView from '../views/admin-dashboard/AssetsView.vue'
import VulnerabilityExplorerView from '../views/admin-views/VulnerabilityExplorerView.vue'
import MissingSecurityUpdatesView from '../views/admin-dashboard/MissingSecurityUpdatesView.vue'
import VulnerabilityCardView from '../views/admin-dashboard/VulnerabilityCardView.vue'
import YourTeamView from '../views/admin-dashboard/YourTeamView.vue'
import PricingplansView from '../views/admin-views/PricingplansView.vue'
import RiskCriteriaView from '../views/admin-views/RiskCriteriaView.vue'
import HowitWork from '../components/admin-component/HowitWork.vue'
import Profile from '../components/admin-component/Profile.vue'
import ResetPasswordView from '../views/admin-views/ResetPasswordView.vue'
import NotificationPanel from '../components/admin-component/NotificationPanel.vue'

// user import
import UserAssetsView from '../views/user-views/UserAssetsView.vue'
import DelayedvulnerabilitiesView from '../views/user-views/DelayedvulnerabilitiesView.vue'
import DelayedvulnerabilitycardView from '../views/user-views/DelayedvulnerabilitycardView.vue'
import UserExceptionsView from '../views/user-views/UserExceptionsView.vue'
import FixedvulnerabilitiesView from '../views/user-views/FixedvulnerabilitiesView.vue'
import PendingvulnerabilitiesView from '../views/user-views/PendingvulnerabilitiesView.vue'
import PendingvulnerabilitycardView from '../views/user-views/PendingvulnerabilitycardView.vue'
import UserVulnerabilityregisterView from '../views/user-views/UserVulnerabilityregisterView.vue'
import UserDashboard1View from '../views/user-views/UserDashboard1View.vue'
import UserSignupView from '../views/user-views/UserSignupView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // admin path
   
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
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
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPasswordView,
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
      path: '/pending',
      name: 'pending',
      component: PendingView,
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
    {
      path: '/howitwork',
      name: 'howitwork',
      component: HowitWork,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      // path: "/set-password/:userId/:token(.*)",
      // name: "ResetPassword",
      // component: () => import("@/views/admin-views/ResetPasswordView.vue")
    },
    {
      path: '/notification',
      name: 'notification',
      component: NotificationPanel,
    },

    // user path
    {
      path: '/usersignup',
      name: 'usersignup',
      component: UserSignupView,
    },
    {
      path: '/userdashboard',
      name: 'userdashboard1',
      component: UserDashboard1View,
    },
    {
      path: '/userassets',
      name: 'userassets',
      component: UserAssetsView,
    },
    {
      path: '/delayedvulnerabilities',
      name: 'delayedvulnerabilities',
      component: DelayedvulnerabilitiesView,
    },
    {
      path: '/delayedvulnerabilitycard',
      name: 'delayedvulnerabilitycard',
      component: DelayedvulnerabilitycardView,
    },
    {
      path: '/userexception',
      name: 'userexception',
      component: UserExceptionsView,
    },
    {
      path: '/fixedvulnerabilities',
      name: 'fixedvulnerabilities',
      component: FixedvulnerabilitiesView,
    },
    {
      path: '/pendingvulnerabilities',
      name: 'pendingvulnerabilities',
      component: PendingvulnerabilitiesView,
    },
    {
      path: '/pendingvulnerabilitycard',
      name: 'pendingvulnerabilitycard',
      component: PendingvulnerabilitycardView,
    },
    {
      path: '/userVulnerabilityregister',
      name: 'userVulnerabilityregister',
      component: UserVulnerabilityregisterView,
    },

  ],
})

export default router
