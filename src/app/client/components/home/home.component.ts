import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { error } from 'selenium-webdriver';
import { CreatePost } from 'src/app/core/models/models';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts:any[];
  postDescription:string;
  createPostResponse:any;
  constructor(private postService:PostService,private notifier:NotifierService) { }

  ngOnInit(): void {

      //TEMP CODE FOR HARAYANA
      const temp= [{
        "postId": 27,
        "description": "asdasdasdasdasd",
        "userId": 1,
        "createdDate": "2021-04-12T19:40:39.495012Z",
        "userName": "Vasu Sagar",
        "likeCount": 5,
        "commentCount": 2,
        "isLikedByMe": 0
    },
    {
        "postId": 29,
        "description": "post with 0 likes",
        "userId": 1,
        "createdDate": "2021-04-15T17:18:25.106317Z",
        "userName": "Vasu Sagar",
        "likeCount": 2,
        "commentCount": 15,
        "isLikedByMe": 1
    },
    {
        "postId": 30,
        "description": "wasdasdasdasdasd",
        "userId": 1,
        "createdDate": "2021-04-17T10:18:56.314625Z",
        "userName": "Vasu Sagar",
        "likeCount": 1,
        "commentCount": 0,
        "isLikedByMe": 0
    },
    {
        "postId": 31,
        "description": "awdasdasd",
        "userId": 1,
        "createdDate": "2021-04-17T18:08:57.015537Z",
        "userName": "Vasu Sagar",
        "likeCount": 2,
        "commentCount": 3,
        "isLikedByMe": 1
    }];

      this.posts=temp;

    this.postService.getAllPosts().subscribe((data:any[])=>{
      console.log("get all post",data);
      //this.posts=data;
    
    },
    error=>{
      console.log("Error 1"+error);
    });
  }

  onSubmit(){
    if(this.postDescription && this.postDescription.trim().length>0){
      //if user has entered some string AND its not consisting of blank spaces
      const postSubmitObject:CreatePost={
        "description":this.postDescription
      }
      console.log("post",postSubmitObject);

      this.postService.createPost(postSubmitObject).subscribe(data=>{
        console.log("after post sent",data);
        this.notifier.notify('success','Post submitted');

        //push newly created post to post array at first index(unshift)
        this.createPostResponse={
          "postId":data.postId,
          "createdDate":data.createdDate,
          "description":data.description,
          "imageId":data.imageId,
          "likeCount":data.likeCount,
          "userId":data.user.userId,
          "userName":data.user.firstName+" "+data.user.secondName
        }

        this.posts.unshift(this.createPostResponse);
        
      });
    }
    else{
      //user has enterd space values or nothing
      this.notifier.notify('error','No content was entered');
    }


  }

  onCancel(){

  }

}
