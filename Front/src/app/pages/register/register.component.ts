import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/user/user-register.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  Roles=['USER']
  selectedOption = this.Roles[0];
  role=2;
  constructor(private _snackBar: MatSnackBar, private _userService: UserService,private _router: Router) { }

  onSubmit(formValue: any){
    
    if(formValue.fullname && formValue.role && formValue.email && formValue.password)
    {
    

      this._userService.registerUser(new Register(formValue.email,formValue.password, 2 ,formValue.fullname)).subscribe(
        (response) => {
          this._snackBar.open("You are successfuly registered! Please login!",undefined, {
            duration: 2000,
            verticalPosition: 'top'
          });
          this._router.navigate(['/login']);
        },
        (error) =>{
          this._snackBar.open(error,undefined, {
            duration: 2000,
            verticalPosition: 'top'
          })}
      );
    }else{
      alert("All fields are required!")
    }

  }
}
