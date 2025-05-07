import { createRouter, createWebHistory } from 'vue-router';
// import AboutUs from './components/AboutUs.vue';



// Lazy-loaded component imports
const HomePage = () => import('./components/HomePage.vue');
const AdminForm = () => import('./components/AdminForm.vue');
const TutorForm = () => import('./components/TutorForm.vue');
const UserForm = () => import('./components/UserForm.vue');
const RegisterPage = () => import('./components/RegisterPage.vue');
// const ManageTutor = () => import('./components/TutorAction.vue');
const TutorSignup=()=>import('./components/TutorSignup.vue')
const UserSignup=()=>import('./components/UserSignup.vue')
// const SearchSubject=()=>import('./components/SearchSubject.vue')
const EducationLevel=()=>import('./components/EducationLevel.vue')
// const StreamSelection=()=>import('./components/StreamSelection.vue')
const UserAction=()=>import('./components/UserAction.vue')
// const AboutUs=()=>import('./components/AboutUs.vue')
const OnlineClass=()=>import('./components/OnlineClass.vue')
const TutorAction=()=>import('./components/TutorAction.vue')
const TutorRegister=()=> import('./components/TutorRegister.vue')
const AdminDashboard=()=>import('./components/AdminDashboard.vue')
// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminForm
  },
  {
    path: '/tutor',
    name: 'Tutor',
    component: TutorForm
  },
  {
    path: '/user',
    name: 'User',
    component: UserForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  // {
  //   path: '/managetutor',
  //   name: 'ManageTutor',
  //   component: ManageTutor
  // },

{
  path:'/tutorsignup',
  name:'TutorSignup',
  component:TutorSignup
},
{
  path:'/usersignup',
  name:'UserSignup',
  component:UserSignup
},
// {
//   path:'/searchsubject',
//   name:'SearchSubject',
//   component:SearchSubject
// },
{
  path:'/educationlevel',
  name:'EducationLevel',
  component:EducationLevel
},
// {
//   path:'/streamselection',
//   name:'StreamSelection',
//   component:StreamSelection
 
// },
// {
//   path:'/aboutus',
//   name:'AboutUs',
//   component:AboutUs
 
// },
{
  path:'/useraction',
  name:'UserAction',
  component:UserAction
 
},
{ path:'/onlineclass',
  name:'OnlineClass',
  component:OnlineClass},
  {
    path:'/tutoraction',
    name:'TutorAction',
    component:TutorAction
  },
  {
    path:'/tutorregister',
    name:'TutorRegister',
    component:TutorRegister
  },
  {
    path:'/admindashboard',
    name:'AdminDashboard',
    component:AdminDashboard
  },


];

// Create and export router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
