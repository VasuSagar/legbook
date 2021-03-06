import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  url:string="http://localhost:8080/api";
  //url:string="http://cs.neonsolutions.xyz:8080/api";
  constructor(private http:HttpClient) { }

  setLike(likeObj:any):Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
    return this.http.post(this.url+`/likes`,likeObj,header);
  }
}
