import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    Shared by <a href="https://cert.orange.pl">CERT Orange Poland</a> <img src="../../../../assets/images/logo_orange.png" height="50px">
  `,
})
export class FooterComponent {
}
