import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Statystyki',
    group: true,
  },
  {
    title: 'Podatności',
    icon: 'bar-chart-outline',
    link: '/pages/vulns',
  },
  {
    title: 'CI/CD',
    icon: 'pie-chart-outline',
    link: '/pages/cicd',
  },
  {
    title: 'Ustawienia',
    group: true,
  },
  {
    title: 'Administracja',
    icon: 'people-outline',
    link: '/pages/admin',
  },
];
