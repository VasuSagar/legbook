import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent implements OnInit {
  displayChatBox:boolean[];
  usersData:any[];
  selectedRecipentId:any;
  constructor(private postService:PostService) {
    postService.getAllUsers().subscribe(data=>{
      console.log("users",data);
      this.usersData=data;
      this.displayChatBox=new Array(5);
      this.displayChatBox.fill(false);
    });
   }

  ngOnInit(): void {
  }

  onClickChatUser(e,id,index){
    this.displayChatBox[index]=true;
    this.selectedRecipentId=id;
  }

}
