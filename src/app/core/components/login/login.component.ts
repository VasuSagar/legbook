import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { PostService } from 'src/app/client/services/post.service';
import { Login } from '../../models/models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginForm:FormGroup;

  constructor(private fb:FormBuilder,private notifier:NotifierService,private authService:AuthService,private router:Router,private postService:PostService) { }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      password: ['',Validators.required],
      email: ['',Validators.required]
    });
  }

  onSubmit():void{
    //check for null fields
    if(this.userLoginForm.invalid){
      this.notifier.notify('error','Submit all fields');
    }
    else{
      //send data to api
      console.log("login form",this.userLoginForm);

      //create loginReq object
      const loginReq:Login={
        email:this.userLoginForm.controls['email'].value,
        password:this.userLoginForm.controls['password'].value
      }

      this.authService.login(loginReq).subscribe(data=>{
        console.log("after login data",data)
          localStorage.setItem('authToken',data.authenticationToken);
          
          //get userId and save it to localstorage
          this.postService.getUserId();
          this.notifier.notify('success','Login successful');
          this.router.navigate(['home']);
      },
      error=>{
        this.notifier.notify('error','Email Or Password is incorrect');
      }
      );

    }
  }

}
