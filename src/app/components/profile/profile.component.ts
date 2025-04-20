import {Component} from '@angular/core';
import {UserResponse} from "../../DTO/user";
import {UserService} from "../../service/user.service";
import {UserBootcampService} from "../../service/user-bootcamp.service";
import {GetPatikaResponse} from "../../DTO/patika";
import {GetCoderSpaceResponse} from "../../DTO/coder";
import {GetTechCareerResponse} from "../../DTO/tech-career";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  patikaList: GetPatikaResponse[] = [];
  coderList: GetCoderSpaceResponse[] = [];
  Techlist: GetTechCareerResponse[] = [];
  Counter: number = 0;
  user: UserResponse = {
    id: "",
    name: "",
    email: ""
  };
  userId: string = "";

  constructor(private userService: UserService, private userBootcampService: UserBootcampService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getUserBootcampsPatika();
    this.getUserBootcampsCoder();
    this.getUserBootcampsTech();

  }

  private getUserBootcampsPatika() {
    this.userId = localStorage.getItem("userId")
    this.userBootcampService.getPatikasByUserId(this.userId).subscribe(
      data => {
        this.patikaList = data;
        this.Counter = this.patikaList.length + this.Counter;
        console.log(this.patikaList);
      },
      error => {
        console.error(error);
      }
    );
  }

  private getUserBootcampsCoder() {
    this.userId = localStorage.getItem("userId")
    this.userBootcampService.getCoderByUserId(this.userId).subscribe(
      data => {
        this.coderList = data;
        this.Counter = this.coderList.length + this.Counter;
        console.log(this.patikaList);
      },
      error => {
        console.error(error);
      }
    );
  }

  private getUserBootcampsTech() {
    this.userId = localStorage.getItem("userId")
    this.userBootcampService.getTechByUserId(this.userId).subscribe(
      data => {
        this.Techlist = data;
        this.Counter = this.Techlist.length + this.Counter;
        console.log(this.patikaList);
      },
      error => {
        console.error(error);
      }
    );
  }

  async getUser(): Promise<void> {
    this.userId = localStorage.getItem("userId");
    (await this.userService.getUser(this.userId)).subscribe(
      (response: UserResponse) => {

        this.user = response;
        console.log(this.user.email);
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }
}
