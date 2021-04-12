import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePost } from 'src/app/core/models/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url:string="http://localhost:8081/api";
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

}
