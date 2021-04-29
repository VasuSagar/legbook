import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var SockJS;
declare var Stomp;
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public stompClient;
  public msg = [];
  userId:string;
  //url:string="http://localhost:8080/api";
  url:string="http://cs.neonsolutions.xyz:8080/api";
  constructor(private http:HttpClient) {
    //this.getUserId();
   }

   getUserId(){
         //get userId from database
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('authToken')}`)
    }
     return this.http.get(this.url+`/auth/v1/getUserDetails`,header).subscribe((data:string)=>{
       this.userId=data;
       this.initializeWebSocketConnection(this.userId);
     });
   }

   initializeWebSocketConnection(userName:string) {
    const serverUrl = 'http://localhost:8080/chat';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    //this.stompClient.debug = null;
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/topic/reply/'+userName, (message) => {
        let data=JSON.parse(message.body);
          that.msg.push(data);
          console.log("recieved msg",data);
      });
    });
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
  }

  sendMessage(messageRequest,recipentName) {
    this.stompClient.send('/app/message/'+recipentName , {}, messageRequest);
  }

}
