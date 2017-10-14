import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent  {
  title = 'MyEvent';

  constructor(private router: Router) {
  }

  goHome() {
      this.router.navigate(['home']);
  }

  goSignup() {
  this.router.navigate(['signup']);
  }

  goLogin() {
      this.router.navigate(['login']);
  }

}
