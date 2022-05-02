import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {

        this.form = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['',Validators.required]
        });
    }

    login():void {
        const val = this.form.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    (res) => {
                        // this.router.navigateByUrl('/tasks');
                    },
                    (error) => {
                        this.router.navigateByUrl('/tasks');
                    }
                );
        }
    }

    logout():void {
        window.localStorage.removeItem('token');
    }

}
