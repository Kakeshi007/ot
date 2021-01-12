import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ReferService } from 'src/app/service/refer.service';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService} from 'src/app/service/common.service';
import { Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-updaterefer',
  templateUrl: './updaterefer.component.html',
  styleUrls: ['./updaterefer.component.css']
})
export class UpdatereferComponent implements OnInit {

  private result: any;
  payroll = '';
  otdate: any;
  otForm: any;
  formGroupAdd: FormGroup;
  id: any;

  hospitalBeginId: any;
  hospitalendId: any;
  hospitalBeginSelected: [{hospital: "โรงพยาบาลลำปาง", id: 1}];
  hospitalEndSelected: [];
  hospitals: [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'hospital',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(
    private rout: ActivatedRoute,
    private referService: ReferService,
    private auth: AuthService,
    private common: CommonService
  ) { }

  async ngOnInit(){
    this.formGroupAdd = new FormGroup({
      payroll: new FormControl(''),
      referdate: new FormControl('', Validators.required),
      refertime: new FormControl('', Validators.required),
      reciveat: new FormControl(''),
      distance: new FormControl(''),
      hospitalbegin: new FormControl(''),
      hospitalend: new FormControl(''),
      rate: new FormControl(''),
    });
    this.payroll = this.auth.getPayroll();
    this.hospitals =  await this.getHospital();
    

    this.rout.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    
    this.getReferById(this.id);
  }

  async getReferById(id: any){
    await this.referService.getReferById(id).then((res: any)=>{
      console.log('res', res);
      if(res.ok == true)
      {
        let indexHosB = this.getHospitalIndex(res.rs[0].hospitalbegin, this.hospitals);
        let indexHosE = this.getHospitalIndex(res.rs[0].hospitalend, this.hospitals);
        let hospitalBeginSelected = this.hospitals[indexHosB];
        this.hospitalEndSelected = this.hospitals[indexHosE];
        console.log('begin',   this.hospitalBeginSelected);
        console.log('begin', this.hospitalEndSelected);
        this.formGroupAdd.controls['payroll'].setValue(res.rs[0].payroll);
        this.formGroupAdd.controls['referdate'].setValue(res.rs[0].referdate);
        this.formGroupAdd.controls['refertime'].setValue(res.rs[0].refertime);
        this.formGroupAdd.controls['reciveat'].setValue(res.rs[0].reciveat);
        this.formGroupAdd.controls['distance'].setValue(res.rs[0].distance);
        //this.formGroupAdd.controls['hospitalbegin'].setValue(hospitalBeginSelected);
       // this.formGroupAdd.controls['hospitalend'].setValue(res.rs[0].hospitalend);
        this.formGroupAdd.controls['rate'].setValue(res.rs[0].rate);
      }else{

      }

    });
  }

  updateRefer()
  {
    let id = this.id;
    let otdate = this.formGroupAdd.get('referdate').value;
    this.formGroupAdd.controls['referdate'].setValue(this.common.convertDate(otdate));
    this.otForm = this.formGroupAdd.getRawValue();
    
    this.referService.updateRefer(this.otForm, id).then((res: any) => {
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

  getHospital()
  {
    return this.referService.getHospital().toPromise().then(res => {
      return res['rs'];
    });
  }

  onItemSelectEnd(item: any) {
  
    this.hospitalendId = item.id;
    console.log('item',this.hospitalendId);
  }

  onItemSelectBegin(item: any)
  {
    this.hospitalBeginId = item.id;
  }

  getHospitalIndex(id: any, data: any)
  {
    let index = data.findIndex(x => x['id'] === id);
    return index;
  }

  
}
