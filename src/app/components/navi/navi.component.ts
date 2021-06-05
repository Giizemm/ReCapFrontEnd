import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  isLogOK() {
    if (this.localStorageService.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    return JSON.parse(this.localStorageService.getItem('userModel')).userName;
  }

  logout() {
    this.authService.logOut();
    this.toastrService.info('Çıkış başarılı');
    this.router.navigate(['/']);
  }
}
