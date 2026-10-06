import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import IntlTelInput from '@intl-tel-input/angular';
import type { Iso2 } from 'intl-tel-input';

import 'intl-tel-input/styles';


@Component({
  selector: 'app-declaration-review',

  imports: [
    ReactiveFormsModule,
    IntlTelInput
  ],

  templateUrl: './declaration-review.html',
  styleUrl: './declaration-review.css'
})
export class DeclarationReview {

  declarationForm: FormGroup;

  formSubmitted = false;

  showValidationModal = false;
  showSubmitConfirmModal = false;
  showSuccessModal = false;

  signatureFile: File | null = null;

  readonly maximumSignatureSize =
    5 * 1024 * 1024;


  /* =========================================================
     PHONE INPUT
  ========================================================= */

  loadUtils = () =>
    import('intl-tel-input/utils');


  preferredCountryOrder: Iso2[] = [
    'lk',
    'gb',
    'us',
    'ae',
    'in',
    'sg',
    'au',
    'ca'
  ];


  /* =========================================================
     TITLES
  ========================================================= */

  titleOptions: string[] = [
    'Mr',
    'Mrs',
    'Ms',
    'Miss',
    'Dr',
    'Prof'
  ];


  /* =========================================================
     COUNTRIES
  ========================================================= */

  countryOptions: string[] = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahrain',
    'Bangladesh',
    'Belarus',
    'Belgium',
    'Bhutan',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Cambodia',
    'Canada',
    'China',
    'Colombia',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Egypt',
    'Estonia',
    'Ethiopia',
    'Finland',
    'France',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kuwait',
    'Lebanon',
    'Luxembourg',
    'Malaysia',
    'Maldives',
    'Malta',
    'Mauritius',
    'Mexico',
    'Monaco',
    'Mongolia',
    'Morocco',
    'Myanmar',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Saudi Arabia',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'Sweden',
    'Switzerland',
    'Thailand',
    'Turkey',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Vietnam'
  ];


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.declarationForm =
      this.fb.group({

        title: [
          '',
          Validators.required
        ],

        firstName: [
          '',
          Validators.required
        ],

        lastName: [
          '',
          Validators.required
        ],

        designation: [
          '',
          Validators.required
        ],

        contactNumber: [
          '',
          Validators.required
        ],

        country: [
          '',
          Validators.required
        ],

        date: [
          this.getCurrentDate(),
          Validators.required
        ],

        signature: [
          null,
          Validators.required
        ],

        confirmationAccepted: [
          false,
          Validators.requiredTrue
        ]

      });

  }


  /* =========================================================
     CURRENT DATE
  ========================================================= */

  private getCurrentDate(): string {

    const today =
      new Date();



    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(
        2,
        '0'
      );


    const day =
      String(
        today.getDate()
      ).padStart(
        2,
        '0'
      );


    return `${year}-${month}-${day}`;

  }


  /* =========================================================
     FIELD VALIDATION
  ========================================================= */

  isInvalid(
    controlName: string
  ): boolean {

    const control =
      this.declarationForm.get(
        controlName
      );


    if (!control) {
      return false;
    }


    return (
      control.invalid &&
      (
        control.touched ||
        this.formSubmitted
      )
    );

  }


  /* =========================================================
     SIGNATURE SELECT
  ========================================================= */

  onSignatureSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    const file =
      input.files[0];


    const extension =
      file.name
        .split('.')
        .pop()
        ?.toLowerCase();


    const acceptedExtensions =
      [
        'png',
        'jpg',
        'jpeg',
        'pdf'
      ];


    if (
      !extension ||
      !acceptedExtensions.includes(
        extension
      )
    ) {

      this.signatureFile =
        null;


      this.declarationForm
        .get('signature')
        ?.setValue(null);


      input.value = '';


      this.showValidationModal =
        true;

      return;

    }


    if (
      file.size >
      this.maximumSignatureSize
    ) {

      this.signatureFile =
        null;


      this.declarationForm
        .get('signature')
        ?.setValue(null);


      input.value = '';


      this.showValidationModal =
        true;

      return;

    }


    this.signatureFile =
      file;


    this.declarationForm
      .get('signature')
      ?.setValue(file);


    this.declarationForm
      .get('signature')
      ?.markAsTouched();


    this.declarationForm
      .get('signature')
      ?.updateValueAndValidity();

  }


  /* =========================================================
     REMOVE SIGNATURE
  ========================================================= */

  removeSignature(
    input: HTMLInputElement
  ): void {

    this.signatureFile =
      null;


    this.declarationForm
      .get('signature')
      ?.setValue(null);


    this.declarationForm
      .get('signature')
      ?.markAsTouched();


    input.value = '';

  }


  /* =========================================================
     SIGNATURE SIZE
  ========================================================= */

  get signatureFileSize():
    string {

    if (
      !this.signatureFile
    ) {

      return '';

    }


    const bytes =
      this.signatureFile.size;


    if (
      bytes < 1024
    ) {

      return `${bytes} B`;

    }


    if (
      bytes <
      1024 * 1024
    ) {

      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;

    }


    return `${(
      bytes /
      1024 /
      1024
    ).toFixed(2)} MB`;

  }


  /* =========================================================
     CLOSE VALIDATION MODAL
  ========================================================= */

  closeValidationModal(): void {

    this.showValidationModal =
      false;


    setTimeout(
      () => {

        this.scrollToFirstInvalid();

      },
      100
    );

  }


  /* =========================================================
     SCROLL TO FIRST INVALID
  ========================================================= */

  private scrollToFirstInvalid():
    void {

    const invalidElement =
      document.querySelector(
        '.invalid-field, .invalid-phone, .confirmation-invalid'
      ) as HTMLElement | null;


    invalidElement
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

  }


  /* =========================================================
     PREVIOUS
  ========================================================= */

  goPrevious(): void {

    this.router.navigate([
      '/application/document-upload'
    ]);

  }


  /* =========================================================
     CLICK SUBMIT APPLICATION
  ========================================================= */

  submitApplication(): void {

    this.formSubmitted =
      true;


    this.declarationForm
      .markAllAsTouched();


    this.declarationForm
      .updateValueAndValidity();


    if (
      this.declarationForm.invalid
    ) {

      this.showValidationModal =
        true;

      return;

    }


    this.showSubmitConfirmModal =
      true;

  }


  /* =========================================================
     CLOSE CONFIRMATION
  ========================================================= */

  closeSubmitConfirmModal(): void {

    this.showSubmitConfirmModal =
      false;

  }


  /* =========================================================
     CONFIRM FINAL SUBMISSION
  ========================================================= */

  confirmSubmission(): void {

    this.showSubmitConfirmModal =
      false;


    const payload = {

      title:
        this.declarationForm
          .get('title')
          ?.value,

      firstName:
        this.declarationForm
          .get('firstName')
          ?.value,

      lastName:
        this.declarationForm
          .get('lastName')
          ?.value,

      designation:
        this.declarationForm
          .get('designation')
          ?.value,

      contactNumber:
        this.declarationForm
          .get('contactNumber')
          ?.value,

      country:
        this.declarationForm
          .get('country')
          ?.value,

      date:
        this.declarationForm
          .get('date')
          ?.value,

      confirmationAccepted:
        this.declarationForm
          .get('confirmationAccepted')
          ?.value,

      signatureFile:
        this.signatureFile

    };


    console.log(
      'Declaration & Review:',
      payload
    );


    /*
      ======================================================
      BACKEND LATER
      ======================================================

      Recommended:

      1. Upload signature using FormData.

      2. Save declaration:
         POST /api/applications/{applicationId}/declaration

      3. After declaration successfully saves:

         POST /api/applications/{applicationId}/submit

      4. Backend should then update:

         Applications.Status = 'Submitted'
         Applications.CurrentStep = 7
         Applications.CompletionPercentage = 100
         Applications.SubmittedAt = current timestamp

      5. Only show success after API returns success.

      For now this frontend demonstrates the final flow.
    */


    this.showSuccessModal =
      true;

  }


  /* =========================================================
     CLOSE SUCCESS
  ========================================================= */

  closeSuccessModal(): void {

    this.showSuccessModal =
      false;

  }

}