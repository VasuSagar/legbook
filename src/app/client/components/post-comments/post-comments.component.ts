import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { LikeService } from '../../services/like.service';

export enum LikeResponse{
  likeSaved=0,
  likeRemoved
}

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  displayComments:boolean=false;
  commentText:string;
  postCommentData:any;
  @Input() post:any;
  constructor(private commentService:CommentService,private likeService:LikeService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    var saveCommentRequest={
      "postId":this.post.postId,
      "text":this.commentText
    }
    this.commentService.createComment(saveCommentRequest).subscribe(data=>{
      console.log("create comemnt",data);

      //after creating comments get comments data for posts
      this.getCommentsForThisPost();
    });
  }

  onCancel(){

  }

  getCommentsForThisPost(){
    this.commentService.getAllCommentsByPostId(this.post.postId).subscribe(data=>{
      console.log("get comemnt",data);
      const test=[
        {
          commentId: 22,
createdDate: "2021-05-02T09:01:09.360550Z",
postId: this.post.postId,
text: "first comment 1",
userId: 1,
userName: "Vasu Sagar",
        },
        {
          commentId: 23,
createdDate: "2021-05-02T09:01:09.360550Z",
postId: this.post.postId,
text: "second comment 2",
userId: 1,
userName: "Valmiki Brahmin",
        }
      ];
      //this.postCommentData=data;
      this.postCommentData=test;
      this.displayComments=true;
    });
  }

  setLikeForThisPost(){
    console.log(this.post.postId);
    const saveLikeReqObj={
      "postId":this.post.postId
    }
    this.likeService.setLike(saveLikeReqObj).subscribe((data:LikeResponse)=>{
      if(data==LikeResponse.likeSaved){
        //increment counter
        this.post.likeCount++;
        this.post.isLikedByMe=1;
        console.log("After like post",this.post);
      }
      else{
        //decrease counter
        this.post.likeCount--;
        this.post.isLikedByMe=0;
        console.log("After  DISlike post",this.post);
      }
    });
  }

}
