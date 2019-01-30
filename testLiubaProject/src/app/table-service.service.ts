import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class TableServiceService {
  
  public constructor(private _httpClient: HttpClient) {
   
  };

   public getUsers() {
    return  this._httpClient.get('https://next.json-generator.com/api/json/get/E1HDvnx1I');
  }
}
