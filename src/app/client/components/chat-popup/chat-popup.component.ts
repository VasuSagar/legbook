import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from '../../services/chat.service';
import { PostService } from '../../services/post.service';
declare var SockJS;
declare var Stomp;
@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.css']
})

export class ChatPopupComponent implements OnInit {
  public stompClient;
  chatMessage: string;
  chats: any[];
  recipentName: string;
  @Input() recipentId:any;
  userId: string;
  constructor(private chatService: ChatService, private http: HttpClient,private postService:PostService) {
    this.userId=localStorage.getItem('userId');
  }



  initializeWebSocketConnection(userId: string) {
    //const serverUrl = 'http://localhost:8080/chat';
    const serverUrl = 'http://cs.neonsolutions.xyz:8080/chat';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    //this.stompClient.debug = null;
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/topic/reply/' + userId, (message) => {
        let data = JSON.stringify(message.body);
        that.chats.push({messageText:JSON.parse(data),self:false});
        console.log("recieved msg", data);
      });
    });
  }

  ngOnInit(): void {
    // let data=[{id:1,messageText:"hii",self:true},
    // {id:2,messageText:"heyaaa",self:false},
    // {id:3,messageText:"whats up",self:true},
    // {id:4,messageText:"where  have you been",self:true},
    // {id:5,messageText:"nothing much",self:false},
    // {id:6,messageText:"wbu",self:false},
    // {id:7,messageText:"Just same",self:true},
    // {id:8,messageText:"ok",self:false},
    // {id:9,messageText:"bye bye",self:false},
    // {id:10,messageText:"buy",self:true}];

    //get previous chats
    this.Connect();

    
    //this.getUserId();
    this.initializeWebSocketConnection(localStorage.getItem('userId'));
    // this.chats=[
    //   {id:1,messageText:"hii",self:true},
    //   {id:2,messageText:"heyaaa",self:false},
    //   {id:3,messageText:"whats up",self:true},
    //   {id:4,messageText:"where  have you been",self:true},
    //   {id:5,messageText:"nothing much",self:false},
    //   {id:6,messageText:"wbu",self:false},
    //   {id:7,messageText:"Just same",self:true},
    //   {id:8,messageText:"ok",self:false},
    //   {id:9,messageText:"bye bye",self:false},
    //   {id:10,messageText:"buy",self:true}
    // ];
  }

  Connect() {
    //this.chatService.connectWebSocket(this.userName);
    console.log("RECIEPNT",this.recipentId);
    this.postService.getAllChats(parseInt(this.recipentId)).subscribe((data:any[])=>{
      console.log(data);
      data.filter(test=>{
        //if message is sent by me then add field self as true
        if(test.senderId==this.userId){
          test.self=true;
        }
        else{
          //else set as false
          test.self=false;
        }
      });
      this.chats=data;
    });

  }

  sendMessage() {
    let messageRequest={
      "fromLogin":this.userId,
      "message":this.chatMessage
    }
    //console.log("obj",messageRequest);

    //this.chatService.initializeWebSocketConnection(this.userId);

    //this.chatService.sendMessage(JSON.stringify(this.chatMessage), this.recipentName);

    //console.log("MYYY", this.chatService.msg);

     
    this.stompClient.send('/app/message/'+this.recipentId , {}, JSON.stringify(messageRequest));
    //add chatmessage to frontend for dispalying
    this.chats.push({messageText:this.chatMessage,self:true});
  
  }



}
