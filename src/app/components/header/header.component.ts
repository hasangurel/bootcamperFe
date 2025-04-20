import {Component, HostListener} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {RegisterComponent} from "../../register/register.component";
import {CoderSpaceComponent} from "../../coder-space/coder-space.component";
import {AuthenticationResponse, UserResponse} from "../../DTO/user";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {NgClass} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RegisterComponent,
    CoderSpaceComponent,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userId: string = "";
  user: UserResponse = {
    id: "",
    name: "",
    email: ""
  };

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
  }

  islogin() {
    if (localStorage.getItem("jwtToken")) {
      // @ts-ignore
      this.userId = localStorage.getItem("userId")
      return true
    } else {
      return false
    }
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    Swal.fire({
      title: 'Çıkış yapıldı.',
      icon: 'success',
      confirmButtonText: 'Tamam'
    });
    this.router.navigate(['/']);
  }

  isScrolled: boolean = false;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
