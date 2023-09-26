import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  userRole: string;
  constructor(private auth: AuthService){
    this.userRole='';
  }
  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();

  }
  logout(){
    this.userRole ='';
    this.auth.logout();

  }
  
}
