import { createRouter, createWebHistory } from 'vue-router';

// Lazy-loaded component imports
const HomePage = () => import('./components/HomePage.vue');
const AdminForm = () => import('./components/AdminForm.vue');
const TutorForm = () => import('./components/TutorForm.vue');
const UserForm = () => import('./components/UserForm.vue');
const RegisterPage = () => import('./components/RegisterPage.vue');
const ManageTutor = () => import('./components/ManageTutor.vue');

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
  {
    path: '/managetutor',
    name: 'ManageTutor',
    component: ManageTutor
  }
];

// Create and export router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
