import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { OtService } from 'src/app/service/ot.service';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService} from 'src/app/service/common.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-updateotnormal',
  templateUrl: './updateotnormal.component.html',
  styleUrls: ['./updateotnormal.component.css']
})
export class UpdateotnormalComponent implements OnInit {

  private result: any;
  otdate: any;
  otForm: any;
  formGroupAdd: FormGroup;
  id: any;

  constructor(
    private rout: ActivatedRoute,
    private otservice: OtService,
    private auth: AuthService,
    private common: CommonService
  ) { }

  ngOnInit(){
    this.formGroupAdd = new FormGroup({
      payroll: new FormControl(''),
      otdate: new FormControl('', Validators.required),
      cycle: new FormControl('', Validators.required),
    });
    this.rout.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    
    this.getOtnormalById(this.id);
  }

  async getOtnormalById(id: any){
    await this.otservice.getOtnormalById(id).then((res: any)=>{
      console.log(res);
      if(res.ok == true)
      {
        this.formGroupAdd.controls['payroll'].setValue(res.rs[0].payroll);
        this.formGroupAdd.controls['otdate'].setValue(res.rs[0].otdate);
        this.formGroupAdd.controls['cycle'].setValue(res.rs[0].cycle);
      }else{

      }

    });
  }

  async updateOt() {
    let id = this.id;
    let otdate = this.formGroupAdd.get('otdate').value;
    this.formGroupAdd.controls['otdate'].setValue(this.common.convertDate(otdate));
    this.otForm = this.formGroupAdd.getRawValue();
    
    await this.otservice.updateOt(this.otForm, id).then((res: any) => {
      //console.log('res',res);
      if(res.ok == true)
      {
        Swal.fire('', 'แก้ไขข้อมูลเรียบร้อย', 'success');
        this.formGroupAdd.reset();
      }
      else{
        Swal.fire('', 'บันทึกไม่สำเร็จ', 'error');
        return;
      }
    }).catch(err => {
      console.log('add ot error! ', err.error);
      Swal.fire('', 'เกิดข้อผิดพลาด ไม่สามารถทำรายการได้. ' + err.error, 'error');
    });
  }



}
