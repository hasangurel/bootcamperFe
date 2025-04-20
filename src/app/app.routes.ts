import { Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {PatikaComponent} from "./patika/patika.component";
import {CoderSpaceComponent} from "./coder-space/coder-space.component";
import {TechCareerComponent} from "./tech-career/tech-career.component";

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "patika", component: PatikaComponent},
  {path: "coderspace", component: CoderSpaceComponent},
  {path: "techcareer", component: TechCareerComponent},
  {path: "profile", component: ProfileComponent},
];

