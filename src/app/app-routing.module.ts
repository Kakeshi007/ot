import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guard/user.guard';
import { LoginComponent } from './page/login/login.component';
import { MainComponent } from './page/ot/layout/main/main.component';

import { ViewotnormalComponent } from './page/ot/components/otnormal/viewotnormal/viewotnormal.component';
import { CreateotnormalComponent } from './page/ot/components/otnormal/createotnormal/createotnormal.component';
import { UpdateotnormalComponent } from './page/ot/components/otnormal/updateotnormal/updateotnormal.component';
import { DeleteotnormalComponent } from './page/ot/components/otnormal/deleteotnormal/deleteotnormal.component';

import { CreateworkComponent } from './page/ot/components/work/creatework/creatework.component';
import { UpdateworkComponent } from './page/ot/components/work/updatework/updatework.component';
import { OtsummaryComponent } from './page/ot/components/otsummary/otsummary.component';

import { CreatereferComponent } from './page/ot/components/refer/createrefer/createrefer.component';
import { UpdatereferComponent } from "./page/ot/components/refer/updaterefer/updaterefer.component";
import { ViewreferComponent } from "./page/ot/components/refer/viewrefer/viewrefer.component";

import { SelectedComponent } from "./selected/selected.component"

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: '/ot'},
  {path: 'selected', component: SelectedComponent},
  {
    
    path: 'ot', component: MainComponent, 
    children: [
      {path: 'otnormal', 
        children: [
          {path: 'create', component: CreateotnormalComponent},
          {path: 'update', component: UpdateotnormalComponent},
          {path: 'delete', component: DeleteotnormalComponent},
          {path: 'view', component: ViewotnormalComponent},
          //{path: '**', redirectTo: '/ot', pathMatch: 'full'}
        ],
      },
      {path: 'refer', 
        children: [
          {path: 'create', component: CreatereferComponent},
          {path: 'update', component: UpdatereferComponent},
          {path: 'delete', component: DeleteotnormalComponent},
          {path: 'view', component: ViewreferComponent},
          //{path: '**', redirectTo: '/ot', pathMatch: 'full'}
        ],
      },
      {path: 'work', 
        children: [
          {path: 'create', component: CreateworkComponent},
          {path: 'update', component: UpdateworkComponent},
          //{path: 'delete', component: DeleteComponent},
          //{path: '**', redirectTo: '/ot', pathMatch: 'full'}
        ],
      },
      {path: 'summary', component: OtsummaryComponent},
    
   
    ],
     canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
