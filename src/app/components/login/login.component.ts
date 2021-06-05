import { User } from './../../models/user';
import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let userModel: {
        id: number;
        userName: string;
      } = { id: 1, userName: '' };
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          this.localStorageService.setItem('token', response.data.token);
          const decodedToken = Object.values(jwt_decode(response.data.token));
          console.log(decodedToken);

          userModel.id = Number(decodedToken[0]);
          userModel.userName = String(decodedToken[2]);
          this.localStorageService.setItem(
            'userModel',
            JSON.stringify(userModel)
          );
          // const username = String(
          //   Object.values(jwt_decode(response.data.token))[2]
          // );
          // const currentUserId = Object.values(
          //   jwt_decode(response.data.token)
          // )[0];
          // this.localStorageService.setItem('currentUserId', currentUserId);
          //this.localStorageService.setItem('username', username);

          this.router.navigate(['/']);
        },
        (responseError) => {
          // console.log(responseError);
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
}
