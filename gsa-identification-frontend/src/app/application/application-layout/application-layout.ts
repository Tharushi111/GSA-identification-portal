import { Component } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-application-layout',

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Header,
    Footer
  ],

  templateUrl: './application-layout.html',
  styleUrl: './application-layout.css'
})
export class ApplicationLayout {

}