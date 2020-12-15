import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:3000';



@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    private  serializedForm: any;

    constructor(private http: HttpClient) { }

    Login(body: any) {
      
      return this.http.post(url + '/login', body);
    }

    AddOt(body: any)
    {
      return this.http.post(url + '/ot', body);
    }

    UpdateOt(body: any, id: any)
    {
      return this.http.put(url + '/ot/'+ id, body);
    }

    DeleteOt(id: any)
    {
      return this.http.delete(url + '/ot/'+id);
    }

  
}