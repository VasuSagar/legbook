import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { error } from 'selenium-webdriver';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userSignUpForm: FormGroup;

  constructor(private fb:FormBuilder,private notifier:NotifierService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.userSignUpForm = this.fb.group({
      userId: null,
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
      email: ['',Validators.required]
    });
  }

  /**
   * Check form validation and submit form
   */
  onSubmit():void{
    console.log("signup form value",this.userSignUpForm.value);
    if(this.checkValidationOfForm()){
      console.log("SUCCESS");
      const signUpRequestObject={
        "firstName":this.userSignUpForm.controls['firstName'].value,
        "lastName":this.userSignUpForm.controls['lastName'].value,
        "password":this.userSignUpForm.controls['password'].value,
        "email":this.userSignUpForm.controls['email'].value
      }
      this.authService.signUp(signUpRequestObject).subscribe(data=>{
        this.notifier.notify('success','Registratcion successful');
        this.notifier.notify('info','Open verification email');
        this.router.navigate(['login']);
      },
      error=>{
        this.notifier.notify('error',error.error);
        console.log("signup err",error);
      });

    }
  }

  /**
   * run validators on signupForm
   * return false if form is invalid
   * return true if form is valid
   */
  checkValidationOfForm(){
     //check for null fields
     if(this.userSignUpForm.invalid){
      this.notifier.notify('error','Fill all fields');
      return false;
    }

    //check if password matches to confirmPassword
    if(this.checkIfPasswordMatches()){
      //this.notifier.notify('success','Password matches');
      return true;
    }
    else{
      this.notifier.notify('error','Password does not matches');
      return false;
    } 
  }

  /**
   * compare password and confirmPassword value
   * return true if matches 
   * return false if different
   */
  checkIfPasswordMatches():boolean{
    if(this.userSignUpForm.controls['password'].value==this.userSignUpForm.controls['confirmPassword'].value){
      return true;
    }
    else
      return false;
  }

}
