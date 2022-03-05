import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router ) { }

  ngOnInit() {
  }
 async onRegister(email, password){
     try{
      const user = await this.authSvc.register(email.value, password.value);
      if(user){
        console.log('User--->', user);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
     }
     catch(error){
        console.log('Error-->', error);
     }
  }
  private redirectUser(isVerified: boolean) {
    if (isVerified) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
