import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/user/user-login.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _snackBar: MatSnackBar, private _userService: UserService,private _authService: AuthService, private _router: Router) {
  }
  onSubmit(formValue: any){
    if(formValue.email && formValue.password)
    {
      this._authService.loginUser(new Login(formValue.email, formValue.password)).subscribe(
        (response) => {
          this._authService.setUser();
          this._router.navigate(['/main']);

        },
        (error) =>{
          this._snackBar.open(error,undefined, {
            duration: 2000,
            verticalPosition: 'top'
          })
         
        }
      ); 
    }
    else{
      alert("All fields are required!")
    }
    
  }
}
