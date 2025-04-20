import {Component} from '@angular/core';
import {UserService} from "../service/user.service";
import {FormsModule} from "@angular/forms";
import {CreateUserRequest} from "../DTO/user";
import {Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  createUserRequest: CreateUserRequest = {
    name: '',
    email: '',
    password: ''
  };
  isRegistered: boolean = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  showSuccess(): void {
    Swal.fire({
      title: "Good job!",
      text: "User created successfully!",
      icon: "success"
    });
  }

  showError(errorMessage: string): void {
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error"
    });
  }
validateEmail(): boolean {
  const email = this.createUserRequest.email;
  // E-posta geçerliliği kontrol eden bir regex kullan
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
  createUser(): void {
    if (this.validatePassword()&&this.validateEmail()) {
      this.userService.createUser(this.createUserRequest)
        .subscribe(
          response => {
            console.log('Oluşturulan Kullanıcı:', response);
            this.showSuccess(); // Show success notification
            setTimeout(() => {
              this.closeAlert();
              this.router.navigate(['../login']); // Yönlendirme yap
              // Close the success alert after 3 seconds
            }, 3000);
          },
          error => {
            console.error('Kullanıcı oluşturulurken bir hata oluştu:', error);
            if (error.status === 409) {
              this.showError('User already exists!'); // Show error notification for user already exists
            } else {
              this.showError('Error occurred while creating user!'); // Show general error notification
            }
          }
        );
    } else {
      this.showPasswordError(); // Show password validation error notification
    }
  }

  validatePassword(): boolean {
    const password = this.createUserRequest.password;
    // Password validation criteria: only letters (uppercase and lowercase) and punctuation
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return regex.test(password);
  }


  showPasswordError(): void {
    Swal.fire({
      title: "Error!",
      text: "Password must contain only letters (uppercase and lowercase) and punctuation marks! or Email is not valid!",
      icon: "error"
    });
  }


  closeAlert(): void {
    Swal.close();
  }
}
