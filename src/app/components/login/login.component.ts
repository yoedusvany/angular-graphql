import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private securityService: SecurityService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login(){
    if(this.username && this.password){
      this.securityService.login(this.username, this.password)
      .subscribe(data => {
        localStorage.setItem('token',data.token);
        this.router.navigate(['authors']);
      });
    }
  }

}
