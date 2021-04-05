import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginForm:FormGroup;

  constructor(private fb:FormBuilder,private notifier:NotifierService) { }

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
    }
  }

}
