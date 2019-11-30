import { Injectable } from '@angular/core';
import { CookieService} from 'ngx-cookie-service';

@Injectable()

export class AuthService {

  constructor( private cookieService: CookieService) { }

  public isAuthenticated(): boolean {
    const role = this.cookieService.get('role');
    if (role) {
      return true;
    } else {
      return false;
    }
  }
}
