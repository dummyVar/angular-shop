import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(User: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User).pipe(tap(this.setToken))
  }

  private setToken(resp: any) {
    if(resp) {
      const expDate = new Date(
        new Date().getTime() + resp.expiresIn * 1000
      )
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-token', resp.idToken);
    } else {
      localStorage.removeItem('fb-token-exp');
      localStorage.removeItem('fb-token');
    }
  }

  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as any);
    if (new Date > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}

