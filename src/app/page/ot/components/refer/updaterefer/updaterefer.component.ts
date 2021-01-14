import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild("multiSelect") multiSelect;
  
  public form: FormGroup;

  public data = [];
  public hospitalBeginselectedItems = [];
  public hospitalEndselectedItems = [];

  hospitalBeginId: any;
  hospitalendId: any;

  settings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'hospital',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  id: string;
 

  constructor(
    private referService: ReferService,
    private auth: AuthService,
    private rout: ActivatedRoute,
    private common: CommonService
  ) { }

  async ngOnInit(){
    this.setForm();
    
    this.data =  await this.getHospital();
    this.rout.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getReferById(this.id);
    
  }

  getHospital()
  {
    return this.referService.getHospital().toPromise().then(res => {
      return res['rs'];
    });
  }

  setForm() {
    this.form = new FormGroup({
      payroll: new FormControl(''),
      referdate: new FormControl('', Validators.required),
      refertime: new FormControl('', Validators.required),
      reciveat: new FormControl(''),
      distance: new FormControl(''),
      hospitalbegin: new FormControl(''),
      hospitalend: new FormControl(),
      rate: new FormControl(''),
    });
  }

  async getReferById(id: any){
    await this.referService.getReferById(id).then((res: any)=>{
      console.log('res', res);
      if(res.ok == true)
      {
        let indexHosB = this.getHospitalIndex(res.rs[0].hospitalbegin, this.data);
        let indexHosE = this.getHospitalIndex(res.rs[0].hospitalend, this.data);
        console.log(indexHosB);
        this.hospitalBeginselectedItems = [{ id: this.data[indexHosB].id, hospital: this.data[indexHosB].hospital }]; 
        this.hospitalEndselectedItems =  [{ id: this.data[indexHosE].id, hospital: this.data[indexHosE].hospital }];
      
        this.form.patchValue({
          payroll: this.auth.getPayroll(),
          referdate: res.rs[0].referdate,
          refertime: res.rs[0].refertime,
          reciveat: res.rs[0].reciveat,
          distance: res.rs[0].distance,

        });
      }else{

      }

    });
  }

  getHospitalIndex(id: any, data: any)
  {
    let index = data.findIndex(x => x['id'] === id);
    return index;
  }

  updateRefer()
  {
    let id = this.id;
    let otdate = this.form.get('referdate').value;
    this.form.controls['referdate'].setValue(this.common.convertDate(otdate));
    this.form.controls['hospitalbegin'].setValue(this.hospitalBeginId);
    this.form.controls['hospitalend'].setValue(this.hospitalendId);
    let otForm = this.form.getRawValue();
    
    this.referService.updateRefer(otForm, id).then((res: any) => {
      //console.log('res',res);
      if(res.ok == true)
      {
        Swal.fire('', 'แก้ไขข้อมูลเรียบร้อย', 'success');
        this.form.reset();
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
  
  onItemSelectEnd(item: any) {
  
    this.hospitalendId = item.id;
    console.log('item',this.hospitalendId);
  }

  onItemSelectBegin(item: any)
  {
    this.hospitalBeginId = item.id;
  }
  
}
