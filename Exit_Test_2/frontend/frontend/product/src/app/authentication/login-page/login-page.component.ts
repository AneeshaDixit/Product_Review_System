import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  firstFormGroup: FormGroup;
  userObj: User = new User();
  usr_invalid = false;
  wrong_pwd = false;
  success = false;
  fill_details = false;

  constructor(
    private _formBuilder: FormBuilder,
    private userservice: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required]],
    });
  }


  submitForm() {
    console.log(this.firstFormGroup.value)
    if (this.firstFormGroup.valid) {
      this.userObj.userEmail = this.firstFormGroup.value.email;
      this.userObj.userPassword = this.firstFormGroup.value.password;

      this.userservice.validateUser(this.userObj).subscribe((data) => {
         console.log(data);
      },
      (error: any) => {
        console.log(error.error.text);

        if(error.error.text == 'Valid user'){
           this.success = true;
           this.wrong_pwd = false;
           this.usr_invalid = false;

           //To navigate to login page
          this.router.navigateByUrl('home');

        }else if(error.error.text == 'Wrong Password'){
           this.wrong_pwd = true;
           this.usr_invalid = false;
           this.fill_details = false;
        }else if(error.error.text == 'User Not Found'){
           this.usr_invalid = true;
           this.wrong_pwd = false;
           this.fill_details = false;
        }

      });
    } else{
      this.fill_details = true;
      this.wrong_pwd = false;
      this.usr_invalid = false;
    }

  }

}
