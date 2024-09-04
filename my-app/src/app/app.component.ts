import { Component, OnInit } from '@angular/core';
import { iPersona } from './interfaces';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {  
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.authService.createUser(
        user.email,
        user.id,
        user._token,
        user._tokenExpirationDate
      );
    }
  }
  
  onLogout() {
    this.authService.logout();
    this.authService.isLoggedIn = false;
  }


  title = 'my-app';
  
  colore: string = '';

  /*  persone: iPersona[] = [
    {nome: 'anna', cognome: 'pannocchia', isOnline:true},
    {nome: 'mastro', cognome: 'geppetto', isOnline: false},
    {nome: 'roger', cognome: 'coda', isOnline: true},
  ] */

  /* onClick(){
    this.persone = [
      {nome: 'ifvnwiefuv', cognome: 'pannocchia', isOnline:true},
      {nome: 'vjebfh', cognome: 'geppetto', isOnline: false},
      {nome: 'vnkf', cognome: 'coda', isOnline: true}, 
    ]
  } */

  onRiceviDati(value: object[]) {
    console.log(value);
  }

  cambiaColoreEvidenziatore(colore: string) {
    this.colore = colore;
  }
}
