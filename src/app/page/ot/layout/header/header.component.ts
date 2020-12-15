import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private routh: Router
  ) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.auth.logout();
    this.routh.navigateByUrl('/login');
  }

}
