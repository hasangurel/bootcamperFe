import { Component } from '@angular/core';
import { PatikaService } from "../service/patika.service";
import { GetPatikaResponse } from "../DTO/patika";
import { GetCoderSpaceResponse } from "../DTO/coder";
import { CoderService } from "../service/coder.service";
import { NgForOf } from "@angular/common";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { UserBootcampService } from "../service/user-bootcamp.service";
import { UserBootcampRequest } from "../DTO/user";

@Component({
  selector: 'app-coder-space',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './coder-space.component.html',
  styleUrls: ['./coder-space.component.css'] // Corrected styleUrls property
})
export class CoderSpaceComponent {
  createBootcampUserRequest: UserBootcampRequest = {
    userId: '',
    baseBootcampId: ''
  }
  coderList: GetCoderSpaceResponse[] = [];
  isLoading: boolean = true; // Yükleme durumu izleyici

  constructor(private service: CoderService, private router: Router, private userBootcampService: UserBootcampService) { }

  ngOnInit(): void {
    this.getcoders();
  }

  private getcoders() {
    this.service.getCoders().subscribe(
      data => {
        this.coderList = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
        console.log(this.coderList);
      },
      error => {
        console.error(error);
      }
    );
  }

  openLink(coderId: string) {
    if (localStorage.getItem('userId') == null) {
      Swal.fire({
        title: 'Bu bootcampe katılmak için giriş yapmanız gerekmektedir.',
        icon: 'error',
        confirmButtonText: 'Tamam'
      });
      return;
    } else {
      Swal.fire({
        title: 'Bu bootcampe katıldınız mı ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Evet',
        cancelButtonText: 'Hayır'
      }).then((result) => {
        if (result.isConfirmed) {
          this.createBootcampUserRequest.baseBootcampId = coderId;
          this.createUserBootcamp();
          this.router.navigate(['/coderspace']); // Örnek patika yoluna yönlendirme yapılabilir
        }
      });
    }
  }

  createUserBootcamp() {
    this.createBootcampUserRequest.userId = localStorage.getItem('userId');

    this.userBootcampService.createUserBootcamp(this.createBootcampUserRequest).subscribe(
      response => {
        // Handle successful response if needed
      },
      error => {
        if (error.status === 409) {
          Swal.fire({
            title: 'Zaten bu bootcampe katıldınız.',
            icon: 'info',
            confirmButtonText: 'Tamam'
          });
        } else {
          console.error(error);
        }
      }
    );
  }
}
