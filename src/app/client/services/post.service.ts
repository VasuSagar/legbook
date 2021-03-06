import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePost } from 'src/app/core/models/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url:string="http://localhost:8080/api";
  //url:string="http://cs.neonsolutions.xyz:8080/api";
  constructor(private http:HttpClient) { }

  getAllPosts(){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
    return this.http.get(this.url+`/posts/v1/`,header);
  }

  createPost(post:CreatePost):Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
    return this.http.post(this.url+`/posts/v1`,post,header);
  }

  getPostById(postId:number){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
    return this.http.get(this.url+`/posts/v1/${postId}`,header);
  }

  getAllChats(recipentId:any):Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
    return this.http.post(this.url+`/posts/v1/getChats`,recipentId,header);
  }

  getAllUsers():Observable<any>{
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
    return this.http.get(this.url+`/posts/v1/getAllUsers`,header);
  }

  getUserId() {
    //get userId from database
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    }
    this.http.get(this.url + `/auth/v1/getUserDetails`, header).subscribe((data: any) => {
      localStorage.setItem('userId',data); 
    });
  }

}
