import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbThemeService, NbWindowService} from '@nebular/theme';
import {CookieService} from 'ngx-cookie-service';
import {ProfileService} from '../../@core/service/ProfileService';
import {UserProfile} from '../../@core/Model/UserProfile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Toast} from '../../@core/utils/Toast';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('apiKeyModal', { read: TemplateRef }) apiKeyModal: TemplateRef<HTMLElement>;
  profile: UserProfile = new UserProfile();
  passwordChangeForm: FormGroup;
  role: string;

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
              private userProfileService: ProfileService,
              private formBuilder: FormBuilder,
              private toast: Toast,
              private windowService: NbWindowService) {
    this.passwordChangeForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordRepeat: ['', Validators.required],
    });
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
      if (data.role === 'ROLE_ADMIN') {
        this.role = 'Administrator';
      } else if (data.role === 'ROLE_EDITOR_RUNNER') {
        this.role = 'Project editor and Scan runner';
      } else if (data.role === 'ROLE_USER') {
        this.role = 'Basic user';
      } else {
        this.role = 'API';
      }
    });
  }

  confirmPasswordChange() {
    if (this.passwordChangeForm.valid &&
      (this.passwordChangeForm.value.newPassword === this.passwordChangeForm.value.newPasswordRepeat) &&
      this.passwordChangeForm.value.newPassword.length >= 8) {
      return this.userProfileService.changePassword(this.passwordChangeForm.value).subscribe(() => {
        this.toast.showToast('success',
          'Success', 'Password successfully changed');
      },
        () => {
          this.toast.showToast('danger',
            'Failure', 'Not all fields were submitted, or old password is ' +
            'incorrect or new passwords doesnt match, or new password length is lower then 8');
        });
    } else {
      this.toast.showToast('danger',
        'Failure', 'Not all fields were submitted, or old password is ' +
        'incorrect or new passwords doesnt match, or new password length is lower then 8');
    }
  }

  generateApiKey() {
    return this.userProfileService.regenerateCicdApiKey().subscribe(data => {
      this.toast.showToast('success',
        'Success', 'CICD Api Key generated successfully, make sure to save generated key.');
      this.windowService.open(
        this.apiKeyModal,
        { title: 'New CICD ApiKey generated', context: data },
      );
    });

  }
}
