import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../service/auth.service";
import {AuthenticationResponse, authUserRequest, UserResponse} from "../../DTO/user";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../service/user.service";
import Swal from "sweetalert2";
import {keyframes} from "@angular/animations";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authResponse: AuthenticationResponse | undefined;
  userId: string = "";
  authUserRequest: authUserRequest = {
    email: '',
    password: ''
  };

  user: UserResponse = {
    id: "",
    name: "",
    email: ""
  };

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  getToken(): void {
    this.authService.authUser(this.authUserRequest).subscribe(
      (response: AuthenticationResponse) => {
        this.authResponse = response;

        localStorage.setItem("jwtToken", response.access_token)
        localStorage.setItem("refreshToken", response.refresh_token)
        localStorage.setItem("userId", response.userResponse.id)
        this.userId = this.authResponse.userResponse.id;
        console.log('User ID:', this.userId);
        // Redirect to a certain page after successful login
        this.router.navigate(['']);

        // Show success message
        this.showSuccess();
      },
      error => {
        console.error('Error fetching user:', error);
        if (error.status === 401) {
          this.showAuthError('Invalid email or password!'); // Show error notification for invalid email or password
        } else {
          this.showAuthError('Error occurred while logging in!'); // Show general error notification for login error
        }
      }
    );
  }

  showAuthError(errorMessage: string): void {
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error"
    });
  }

  showSuccess(): void {
    Swal.fire({
      title: "Success!",
      text: "Successfully logged in!",
      icon: "success"
    });
  }

  protected readonly keyframes = keyframes;
}
