import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guard/user.guard';
import { LoginComponent } from './page/login/login.component';
import { MainComponent } from './page/ot/layout/main/main.component';

import { CreateotnormalComponent } from './page/ot/components/otnormal/createotnormal/createotnormal.component';
import { UpdateotnormalComponent } from './page/ot/components/otnormal/updateotnormal/updateotnormal.component';
import { DeleteotnormalComponent } from './page/ot/components/otnormal/deleteotnormal/deleteotnormal.component';
import { CreateworkComponent } from './page/ot/components/work/creatework/creatework.component';
import { UpdateworkComponent } from './page/ot/components/work/updatework/updatework.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: '/ot'},

  {
    path: 'ot', component: MainComponent, 
    children: [
      {path: 'otnormal', 
        children: [
          {path: 'create', component: CreateotnormalComponent},
          {path: 'update', component: UpdateotnormalComponent},
          {path: 'delete', component: DeleteotnormalComponent},
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
    
   
    ],
     canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
