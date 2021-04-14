import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  //url:string="http://localhost:8080/api";
  url:string="http://cs.neonsolutions.xyz:8080/api";
  constructor(private http:HttpClient) { }

  getAllCommentsByPostId(postId:number){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
    return this.http.get(this.url+`/comments/post/${postId}`,header);
  }

  createComment(comment:any){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
    return this.http.post(this.url+`/comments`,comment,header);
  }

}
