import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { MainComponent } from './page/ot/layout/main/main.component';
import { HeaderComponent } from './page/ot/layout/header/header.component';
import { FooterComponent } from './page/ot/layout/footer/footer.component';
import { LeftmenuComponent } from './page/ot/layout/leftmenu/leftmenu.component';

import { CreateotnormalComponent } from './page/ot/components/otnormal/createotnormal/createotnormal.component';
import { UpdateotnormalComponent } from './page/ot/components/otnormal/updateotnormal/updateotnormal.component';
import { DeleteotnormalComponent } from './page/ot/components/otnormal/deleteotnormal/deleteotnormal.component';
import { CreateworkComponent } from './page/ot/components/work/creatework/creatework.component';
import { UpdateworkComponent } from './page/ot/components/work/updatework/updatework.component';
import { OtsummaryComponent } from './page/ot/components/otsummary/otsummary.component';
import { ViewotnormalComponent } from './page/ot/components/otnormal/viewotnormal/viewotnormal.component';
import { CreatereferComponent } from './page/ot/components/refer/createrefer/createrefer.component';
import { UpdatereferComponent } from './page/ot/components/refer/updaterefer/updaterefer.component';
import { ViewreferComponent } from './page/ot/components/refer/viewrefer/viewrefer.component';

import { NgSelect2Module } from 'ng-select2';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectedComponent } from './selected/selected.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
    CreateotnormalComponent,
    UpdateotnormalComponent,
    DeleteotnormalComponent,
    CreateworkComponent,
    UpdateworkComponent,
    OtsummaryComponent,
    ViewotnormalComponent,
    CreatereferComponent,
    UpdatereferComponent,
    ViewreferComponent,
    SelectedComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelect2Module,
    NgMultiSelectDropDownModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'th-TH'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
