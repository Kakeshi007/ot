import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LoginUser } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  loginPayrloll: string;
  loginUser: LoginUser;
  redirectUrl: string;

  constructor(
    private api: ApiService,
    ) { }

  checklogin()
  {
    if(localStorage.getItem('login_payroll') == null || localStorage.getItem('login_payroll') == undefined)
    {
      return false;
    }  
    return true;
  }  

  login(data: any) {
    return this.api.Login(data).toPromise().then((res: any) => {
     // console.log(res.rs[0]['PAYROLLNO']);
      this.isLoggedIn = true;
      localStorage.setItem('login_payroll', res.rs[0]['PAYROLLNO']);
      res.redirectUrl = this.redirectUrl || '/ot';
      return res;
    });
  }


  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('login_payroll');
    console.log('local', localStorage.getItem('login_payroll'));
  }

  getPayroll()
  {
    return localStorage.getItem('login_payroll');
  }
}

