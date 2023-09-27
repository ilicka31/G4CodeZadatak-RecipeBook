import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/user/user-register.model';
import { CookModalService } from 'src/app/services/modals/cook-modal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-cook',
  templateUrl: './new-cook.component.html',
  styleUrls: ['./new-cook.component.css']
})
export class NewCookComponent {

  Roles=['COOK']
  selectedOption = this.Roles[0];


  constructor(private _snackBar: MatSnackBar, private _userService: UserService,private _router: Router, private _modalService: CookModalService) { }

onSubmit(formValue: any){
   
    if(formValue.fullname && formValue.role && formValue.email && formValue.password)
    {
    

      this._userService.addCook(new Register(formValue.email,formValue.password, 1 ,formValue.fullname)).subscribe(
        (response) => {
          this._snackBar.open("Successfuly registered cook!",undefined, {
            duration: 2000,
            verticalPosition: 'top'
          });
          this._modalService.closeModal();
          this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/cooks']);
          });
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
