import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  firstFormGroup: FormGroup;
  userObj: User = new User();
  usr_already = false;
  same_pwd = false;
  all_fields = false;
  success = false;

  constructor(
    private _formBuilder: FormBuilder,
    private userservice: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
    });
  }


  submitForm() {
    console.log(this.firstFormGroup.value)
    if (this.firstFormGroup.valid) {

      if (this.firstFormGroup.value.password == this.firstFormGroup.value.confirmPassword) {
        console.log("valid")
        this.userObj.userEmail = this.firstFormGroup.value.email;
        this.userObj.userFirstName = this.firstFormGroup.value.firstname;
        this.userObj.userLastName = this.firstFormGroup.value.lastname;
        this.userObj.userPassword = this.firstFormGroup.value.password;
        this.userObj.userConfirmPassword = this.firstFormGroup.value.confirmPassword;

        this.userservice.addNewUser(this.userObj).subscribe((data) => {
          console.log(data);
          this.success = true;

          //To navigate to login page
          this.router.navigateByUrl('login');
        },
          (error: any) => {
            console.log(error.error);
            this.usr_already = true;
            this.all_fields = false;
            this.same_pwd = false;
          });

      } else {
        console.log('both passwords must be same')
        this.same_pwd = true;
        this.all_fields = false;
        this.usr_already = false;
      }
    } else {
      console.log("all fields mandatory")
      this.all_fields = true;
    }

  }

}
