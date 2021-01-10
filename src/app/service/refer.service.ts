import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReferService {

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  addRefer(data: any)
  {
    return this.api.AddRefer(data).toPromise().then((res: any) => {
       return res;
     });
  }

  updateRefer(data: any, id: any)
  {
    return this.api.UpdateRefer(data, id).toPromise().then((res: any) => {
       return res;
     });
  }

  deleteRefer(id: any)
  {
    return this.api.DeleteRefer(id).toPromise().then((res: any) => {
      return res;
    });
  }

  getReferById(id: any)
  {
    return this.api.GetReferById(id).toPromise().then((res: any)=>{
      return res;
    });
  }

  getOtnormalAll(payroll: string, year: number, month: number, cycle: number) {
    return this.api.GetOtnarmalAll(payroll, year, month, cycle);
  }

}