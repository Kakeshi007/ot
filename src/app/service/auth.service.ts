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
    private api: ApiService
    ) { }

  checklogin()
  {
    let hours = localStorage.getItem('houre');
    let saved = localStorage.getItem('setupTime');

    console.log('pass', new Date().getTime() - parseInt(saved));
    console.log('timelimit', parseFloat(hours) * 60 * 60 * 1000);
    
    if (saved && ( (new Date().getTime() - parseInt(saved)) > (parseFloat(hours) * 60 * 60 * 1000)) ) {
      localStorage.clear()
    }

    if(localStorage.getItem('login_payroll') == null || localStorage.getItem('login_payroll') == undefined)
    {
      return false;
    }  
    return true;
  }  

  login(data: any) {
    console.log('data',data);
    return this.api.Login(data).toPromise().then((res: any) => {
     // console.log(res.rs[0]['PAYROLLNO']);
      this.isLoggedIn = true;
      localStorage.setItem('login_payroll', res.rs[0]['PAYROLLNO']);
      var now = new Date().getTime();
      localStorage.setItem('setupTime', now.toString());
      
      if(data.remember)
      {
        //console.log('remember true');
        localStorage.setItem('houre', "2");
      }
      else{
        //console.log('remember false');
        localStorage.setItem('houre', "0.30");
      }
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

