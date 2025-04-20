import {Component} from '@angular/core';
import {RouterLink, Routes} from "@angular/router";
import {PatikaComponent} from "../../patika/patika.component";
import {CoderSpaceComponent} from "../../coder-space/coder-space.component";
import {TechCareerComponent} from "../../tech-career/tech-career.component";
import {RegisterComponent} from "../../register/register.component";
import {TeamComponent} from "../../team/team.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    PatikaComponent,
    CoderSpaceComponent,
    TechCareerComponent,
    RegisterComponent,
    TeamComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
