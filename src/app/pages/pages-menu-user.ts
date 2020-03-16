import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_USER: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Statistics',
    group: true,
  },
  {
    title: 'CI/CD',
    icon: 'pie-chart-outline',
    link: '/pages/cicd',
  },
];
