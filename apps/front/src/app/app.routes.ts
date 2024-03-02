import { Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'auth',
    title: 'Auth',
    component: AuthComponent
  },
];
