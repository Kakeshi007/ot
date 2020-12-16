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
      return this.http.post(url + '/otnormal', body);
    }

    UpdateOt(body: any, id: any)
    {
      return this.http.put(url + '/otnormal/'+ id, body);
    }

    DeleteOt(id: any)
    {
      return this.http.delete(url + '/otnormal/'+id);
    }

  
}