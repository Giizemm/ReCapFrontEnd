import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.getUserById(
      JSON.parse(this.localStorageService.getItem('userModel')).id
    );
  }

  // load() {
  //   this.createUserForm();
  //   this.email=this.localStorageService.getItem(this.email)
  // }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe((response) => {
      this.userForm.controls['id'].setValue(response.data.id);
      this.userForm.controls['firstName'].setValue(response.data.firstName);
      this.userForm.controls['lastName'].setValue(response.data.lastName);
      this.userForm.controls['email'].setValue(response.data.email);
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      let userModel = Object.assign({}, this.userForm.value);
      console.log(userModel);
      this.userService.updateUser(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );

      this.logOut();
    } else {
      this.toastrService.error('Formu Boş Bıraktınız');
    }
  }

  logOut() {
    this.localStorageService.clear();
    this.toastrService.info('Lütfen Tekrar Giriş Yapınız.');
    this.router.navigate(['/login']);
  }
}
