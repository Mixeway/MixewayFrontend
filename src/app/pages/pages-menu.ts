import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
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
    title: 'Vulnerabilities',
    icon: 'bar-chart-outline',
    link: '/pages/vulns',
  },
  {
    title: 'CI/CD',
    icon: 'pie-chart-outline',
    link: '/pages/cicd',
  },
  {
    title: 'Knowlege base',
    icon: 'archive-outline',
    link: '/pages/kb',
  },
  {
    title: 'Settings',
    group: true,
  },
  {
    title: 'Admin Zone',
    icon: 'people-outline',
    link: '/pages/admin',
  },
];
