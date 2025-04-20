import {Component, OnInit} from '@angular/core';
import {GetPatikaResponse} from "../DTO/patika";
import {PatikaService} from "../service/patika.service";
import {CommonModule} from "@angular/common";
import {noop} from "rxjs";
import Swal from 'sweetalert2';
import {UserBootcampService} from "../service/user-bootcamp.service";
import {UserBootcampRequest} from "../DTO/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patika',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './patika.component.html',
  styleUrls: ['./patika.component.css'] // Use styleUrls instead of styleUrl
})
export class PatikaComponent implements OnInit {
  createBootcampUserRequest: UserBootcampRequest = {
    userId: '',
    baseBootcampId: ''
  }
  patikaList: GetPatikaResponse[] = [];
  isLoading: boolean = true; // Yükleme durumu izleyici

  constructor(private router: Router, private service: PatikaService, private bootcampUserService: UserBootcampService) {
  }

  ngOnInit(): void {
    this.getPatikas();


  }

  openLink(patikaId: string) {
    if(localStorage.getItem('userId') == null){
      Swal.fire({
        title: 'Bu bootcampe katılmak için giriş yapmanız gerekmektedir.',
        icon: 'error',
        confirmButtonText: 'Tamam'
      });
      return;

    }else{


    Swal.fire({
      title: 'Bu bootcampe katıldınız mı ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır'
    }).then((result) => {
      if (result.isConfirmed) {
        this.createBootcampUserRequest.baseBootcampId = patikaId;

        this.createUserBootcamp();
        this.router.navigate(['/patika']); // Örnek patika yoluna yönlendirme yapılabilir
      }

    });
    }
  }

  createUserBootcamp() {
    this.createBootcampUserRequest.userId = localStorage.getItem('userId');

    this.bootcampUserService.createUserBootcamp(this.createBootcampUserRequest).subscribe(
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

  private getPatikas() {

    this.service.getPatikas().subscribe(
      data => {

        this.patikaList = data;
        if (this.patikaList.length == 0) {
          {
            this.isLoading = false;
          }
        } else {
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        }

        console.log(this.patikaList);
      },
      error => {
        console.error(error);
      }
    );
  }

  protected readonly noop = noop;
}
