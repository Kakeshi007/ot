import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
  ) { }

  loginForm: any = {};

  ngOnInit(){
    if(this.auth.checklogin())
    {
      this.router.navigateByUrl('/ot');
    }
  }
  
  onClickSubmit()
  {
   
    this.auth.login(this.loginForm).then((res: any) => {
     
      if(res.ok == true)
      {
        this.router.navigateByUrl(res.redirectUrl);
      }
      else{
        Swal.fire('', 'รหัสผ่านไม่ถูกต้อง', 'warning');
        return;
      }
    }).catch(err => {
      console.log('login Error! ', err.error);

      if (err.error == 'password invalid') {
        Swal.fire('', 'รหัสผ่านไม่ถูกต้อง', 'warning');
        return;
      }

      Swal.fire('', 'เกิดข้อผิดพลาด ไม่สามารถทำรายการได้. ' + err.error, 'error');
    });
  }
}
