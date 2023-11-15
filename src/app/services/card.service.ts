import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'https://api.gdh.digital/pubx/';
interface Icard  {
  cardHolder: string;
  cardNumber: number;
  cvv: string;
  expenseLimit: number;
}

const httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http:HttpClient) { 

  }
  add(params:any){
    return this.http.post(AUTH_API + 'ads',params,httpOptions)
  }
  get(){
    return this.http.get(AUTH_API + 'author',httpOptions)
  }
  getById(id:number){
    return this.http.get(`${AUTH_API}ads/detail/${id}`,httpOptions)
  }
  update(id:number,params:any){
    return this.http.put(`${AUTH_API}ads/${id}`,params,httpOptions)
  }
  getNewsByAuthor(params:any){
    return this.http.get(`https://api.gdh.digital/editor/stories?page=1&limit=1000&dateRangeStart=${params.dateRangeStart}&dateRangeEnd=${params.dateRangeEnd}&status=published&breaking=false`,httpOptions)
  }
}

