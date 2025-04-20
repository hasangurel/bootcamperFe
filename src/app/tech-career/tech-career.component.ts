import {Component} from '@angular/core';
import {GetCoderSpaceResponse} from "../DTO/coder";
import {CoderService} from "../service/coder.service";
import {TechService} from "../service/tech.service";
import {GetTechCareerResponse} from "../DTO/tech-career";
import {NgForOf} from "@angular/common";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {UserBootcampService} from "../service/user-bootcamp.service";
import {UserBootcampRequest} from "../DTO/user";

@Component({
  selector: 'app-tech-career',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tech-career.component.html',
  styleUrl: './tech-career.component.css'
})
export class TechCareerComponent {
  createBootcampUserRequest: UserBootcampRequest = {
    userId: '',
    baseBootcampId: ''
  }
  isLoading: boolean = true; // Yükleme durumu izleyici

  Techlist: GetTechCareerResponse[] = [];
  isFetching = false;

  constructor(private service: TechService, private router: Router, private userBootcampService: UserBootcampService) {
  }

  ngOnInit(): void {
    this.getTechs();
  }

  openLink(coderId: string) {
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
        this.createBootcampUserRequest.baseBootcampId = coderId;

        this.createUserBootcamp();
        this.router.navigate(['/techcareer']); // Örnek patika yoluna yönlendirme yapılabilir
      }
    });
  }}

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

  private getTechs() {

    this.service.getTechs().subscribe(
      data => {
        this.Techlist = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
        console.log(this.Techlist);
      },
      error => {
        console.error(error);
      }
    );
  }

}
