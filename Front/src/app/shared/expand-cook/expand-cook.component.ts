import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user-get.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-expand-cook',
  templateUrl: './expand-cook.component.html',
  styleUrls: ['./expand-cook.component.css']
})
export class ExpandCookComponent implements OnInit {
cooks: User[];
constructor(private _userService: UserService){
  this.cooks =[]
}
  ngOnInit(): void {
    this._userService.allCooks().subscribe(
      (response: any) => {
        this.cooks = response;
  
      },
      (error) => {
     
      });
  }
  openAddModal(){
    
  }
}
