import { Routes } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
];
