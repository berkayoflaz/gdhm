import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Muhasebe'
  },
  {
    name: 'Yazılar',
    url: '/card/add',
    iconComponent: { name: 'cil-puzzle' }
  }
];
