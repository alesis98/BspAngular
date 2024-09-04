import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, OnDestroy {
  form?: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.form = form;
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    this.authService.signIn(email, password).subscribe((data: any) => {
      console.log(data);
      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );
      this.authService.createUser(
        data.email,
        data.localId,
        data.idToken,
        expirationDate
      );
      localStorage.setItem('user', JSON.stringify(this.authService.user));
      console.log(this.authService.user);
      this.router.navigate(['/home']);
      console.log(this.authService.isLoggedIn);
      this.authService.isLoggedIn = true;
      console.log(this.authService.isLoggedIn);
    });
  }

  ngOnDestroy(): void {
    this.form?.reset();
  }
}
