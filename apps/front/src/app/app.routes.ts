import { Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'about',
    title: 'About',
    component: AboutComponent,
  },
  {
    path: 'auth',
    title: 'Auth',
    component: AuthComponent
  },
];
