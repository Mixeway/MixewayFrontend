import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NbDialogService,
  NbMenuService, NbSearchService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import {LayoutService} from '../../../@core/utils';
import { Subject } from 'rxjs';
import {DashboardService} from '../../../@core/service/DashboardService';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  docsMenu = [ {title: 'Swagger'}, { title: 'GitHub' }, { title: 'Tutorials' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private dashboardService: DashboardService,
              private router: Router,
              private dialogService: NbDialogService,
              private searchService: NbSearchService,
              private cookieService: CookieService) {
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    });

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        // @ts-ignore
        this.router.navigate(['/pages/search/' + data.term]);
      });
    this.checkActualTheme();
  }
  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      const expires = 'expires=' + new Date().toUTCString();
      document.cookie = `role=;Path=/;expires=${expires}`;
      window.location.reload();
    } else if ( title === 'Profile' ) {
      // Do something on Profile
      this.router.navigate(['/pages/profile']);
    }
  }
  ngOnInit() {
    this.getUserName();

  }
  getUserName() {
    return this.dashboardService.getSessionOwner().subscribe(data => {
      this.user = data;
    });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }


  showSwaggerDoc() {
    window.location.href = '/swagger-ui';
  }
  checkActualTheme() {
    const theme = this.themes.filter(t => t.value === this.cookieService.get('mixeway-theme'));
    if (theme.length !== 0 && theme[0].value !== '') {
      this.themeService.changeTheme(theme[0].value);
    }
  }

  openGitHub() {
    window.location.href = 'https://github.com/mixeway/mixewayhub';
  }

  openTutorials() {
    window.location.href = 'https://mixeway.io/category/tutorial/';
  }
}
