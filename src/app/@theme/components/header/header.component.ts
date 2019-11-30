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
import {StepperComponent} from '../stepper/stepper.component';

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

  currentTheme = 'Dark';

  userMenu = [ { title: 'Profil' }, { title: 'Wyloguj' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private dashboardService: DashboardService,
              private router: Router,
              private dialogService: NbDialogService,
              private searchService: NbSearchService) {
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
  }
  onItemSelection( title ) {
    if ( title === 'Wyloguj' ) {
      const expires = 'expires=' + new Date().toUTCString();
      document.cookie = `role=;Path=/;expires=${expires}`;
      window.location.reload();
    } else if ( title === 'Profil' ) {
      // Do something on Profile
      this.router.navigate(['/pages/profile']);
    }
  }
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.getUserName();

  }
  getUserName() {
    return this.dashboardService.getSessionOwner().subscribe(data => {
      this.user = data;
      if (this.user.logins < 2) {
        this.showTutorialWizzard();
      }
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
  showTutorialWizzard() {
    this.dialogService.open(
      StepperComponent,
      { context: 'this is some additional data passed to dialog' });
  }

  showSwaggerDoc() {
    window.location.href = '/swagger-ui.html';
  }
}
