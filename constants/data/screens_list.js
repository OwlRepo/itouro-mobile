import {Landing, Login, Maps, Register} from '../../pages';

const SCREENS_LIST = [
  {
    label: 'Landing',
    component: Landing,
    options: {
      headerShown: false,
    },
  },
  {
    label: 'Login',
    component: Login,
    options: {
      headerShown: false,
    },
  },
  {
    label: 'Register',
    component: Register,
    options: {
      headerShown: false,
    },
  },
  {
    label: 'Maps',
    component: Maps,
    options: {
      headerShown: false,
    },
  },
];

export default SCREENS_LIST;
