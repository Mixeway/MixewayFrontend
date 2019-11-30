import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Toast} from '../../@core/utils/Toast';
import {AuthService} from '../../@core/service/AuthService';

@Component({
  selector: 'ngx-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.scss'],
})
export class InitializeComponent implements OnInit {
  initForm: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toast: Toast) {
    this.initForm = this.formBuilder.group({
      password:  ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
  }

  saveInit(value: any) {
    if (this.initForm.valid) {
      return this.authService.initialize(this.initForm.value).subscribe(data => {
          this.toast.showToast('success', 'Sukces', 'Użytkownik został poprawnie utworzony. ' +
            'Zaloguj się korzystając ze stworzonego hasła.');
          window.location.href = '/auth/login';
        },
        error => {
          this.toast.showToast('danger', 'Niepowodzenie', 'Operacja się niepowiodła.');
        });
    }
  }
}
