import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { ReferService } from 'src/app/service/refer.service';


@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {

  @ViewChild("multiSelect") multiSelect;
  public form: FormGroup;


  public data = [];
  public selectedItems = [{ id: 5, hospital: "โรงพยาบาลแม่เมาะ" }];
  settings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'hospital',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(
    private referService: ReferService,
  )
  {}

  async ngOnInit() {
    this.setForm();
    this.data =  await this.getHospital();
    // setting and support i18n
    
   
  }

  getHospital()
  {
    return this.referService.getHospital().toPromise().then(res => {
      return res['rs'];
    });
  }

  public setForm() {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      hospitalend: new FormControl()
    });
  }






}
