import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OtService {
  private url = 'http://localhost:3000';
  private  serializedForm: any;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  // addOt(data){
  //   this.serializedForm = JSON.stringify(data);
  //   return this.http.post(this.url + '/ot/', this.serializedForm, httpOptions)
  //   .subscribe(
      
  //     data => data,
  //   //  error => console.error('couldn\'t post because', error)
  //   )
  //   ;
  // }
  addOt(data: any)
  {
    return this.api.AddOt(data).toPromise().then((res: any) => {
       return res;
     });
  }

  updateOt(data: any, id: any)
  {
    return this.api.UpdateOt(data, id).toPromise().then((res: any) => {
       return res;
     });
  }

  deleteOt(id: any)
  {
    return this.api.DeleteOt(id).toPromise().then((res: any) => {
      return res;
    });
  }

  getOtnormalById(id: any)
  {
    return this.api.GetOtnormalById(id).toPromise().then((res: any)=>{
      return res;
    });
  }

  getOtnormalAll()
  {
    return this.api.GetOtnarmalAll().toPromise().then((res: any)=>{
      return res;
    });
  }
}