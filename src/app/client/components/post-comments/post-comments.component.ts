import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

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
  constructor(private commentService:CommentService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    var saveCommentRequest={
      "postId":this.post.postId,
      "text":this.commentText
    }
    this.commentService.createComment(saveCommentRequest).subscribe(data=>{
      console.log("create comemnt",data);
    });
  }

  onCancel(){

  }

  getCommentsForThisPost(){
    this.commentService.getAllCommentsByPostId(this.post.postId).subscribe(data=>{
      console.log("get comemnt",data);
      this.postCommentData=data;
      this.displayComments=true;
    });
  }

}
