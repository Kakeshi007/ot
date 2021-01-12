import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ReferService } from 'src/app/service/refer.service';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService} from 'src/app/service/common.service';
import { Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {

  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'hospital',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  hospitals: [];
  formGroup: FormGroup;
  hospitalBeginSelected: [{id: 1, hospital: "โรงพยาบาลลำปาง" }];

  constructor(
    private referService: ReferService,
    private auth: AuthService,
    private common: CommonService
  ) { }

  async ngOnInit() {
    this.formGroup = new FormGroup({
      begin: new FormControl('')
    });

    this.hospitals =  await this.getHospital();
   
    this.formGroup.patchValue({
      begin: this.hospitalBeginSelected,
    });


  }

  get f() {
    return this.formGroup.controls;
  }

  getHospital()
  {
    return this.referService.getHospital().toPromise().then(res => {
      return res['rs'];
    });
  }

  seletedclick(){

  }

  
  onItemSelectBegin(item: any) {
  
  
  }
}
