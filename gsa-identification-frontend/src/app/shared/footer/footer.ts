import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  FOOTER_SECTIONS,
  SOCIAL_LINKS,
  FooterSection
} from './footer-data';

@Component({
  selector: 'app-footer',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],

  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  footerSections: FooterSection[] = FOOTER_SECTIONS;

  socialLinks = SOCIAL_LINKS;

  email: string = '';

  departureCity: string = '';

  promoConsent: boolean = false;


  onSubscribe(): void {

    console.log(
      'Subscription Form Submitted:',
      {
        email: this.email,
        departureCity: this.departureCity,
        consent: this.promoConsent
      }
    );

  }
}