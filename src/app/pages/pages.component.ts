import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS_USER } from './pages-menu-user';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu: any;
  role: string;
  constructor(private cookieService: CookieService) {
    this.role = this.cookieService.get('role');
    if (this.role === 'ROLE_ADMIN') {
      this.menu = MENU_ITEMS;
    } else {
      this.menu = MENU_ITEMS_USER;
    }
  }
}
