import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  url: string = 'https://corso-angular-80cfd-default-rtdb.europe-west1.firebasedatabase.app/persone';
  constructor(private http: HttpClient, private authService: AuthService) { }
  token = this.authService.user?.token;

  insertPersona(body: any) {
    return this.http.post(`${this.url}.json?auth=${this.token}`, body);
  }

  deletePersona(id: string) {
    return this.http.delete(`${this.url}/${id}.json?auth=${this.token}`);
  }

  getPersone() {
    return this.http.get(`${this.url}.json?auth=${this.token}`);
  }

  getPersona(id: string) {
    return this.http.get(`${this.url}/${id}.json?auth=${this.token}`);
  }
}
