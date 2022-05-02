import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user: any;
    headers: Headers = new Headers();
    constructor(private http: HttpClient) {
    }

    login(email:string, password:string ) {
        return this.http.post('/api/login', {email, password}).pipe(
            tap((user) => this.setUser(user)),
            tap((user) => this.setToken(user)),
            // catchError((e) => {
                // return throwError(e);
            // })
        )
    }

    private setUser(user: any): void {
        this.user = user;
    }


    private setToken(user: any, setAuth: boolean = true, setToken: boolean = true): void {
        this.headers.append('Authorization', `Bearer ${user.token}`);

        localStorage.setItem('user', JSON.stringify(user));
        if (setToken) {
            localStorage.setItem('token', user.apiToken);
        }
    }

    public getUser(): any {
        return this.user;
    }
}
