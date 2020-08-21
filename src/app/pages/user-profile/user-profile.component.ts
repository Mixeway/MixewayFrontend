import { Component, OnInit } from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {CookieService} from 'ngx-cookie-service';
import {ProfileService} from '../../@core/service/ProfileService';
import {UserProfile} from '../../@core/Model/UserProfile';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profile: UserProfile = new UserProfile();

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

  constructor(private themeService: NbThemeService,
              private cookieService: CookieService,
              private userProfileService: ProfileService) {
    this.loadProfile();
  }

  ngOnInit(): void {
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    this.cookieService.delete('mixeway-theme');
    this.cookieService.set('mixeway-theme', themeName, 10000, '/');
  }
  loadProfile() {
    return this.userProfileService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }
}
