import { Component } from '@angular/core';

import {
  FormArray,
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
  selector: 'app-premises-information',

  imports: [
    ReactiveFormsModule,
    IntlTelInput
  ],

  templateUrl: './premises-information.html',
  styleUrl: './premises-information.css'
})
export class PremisesInformation {

  premisesForm: FormGroup;

  formSubmitted = false;
  showValidationModal = false;


  /* =========================================================
     PHONE INPUT CONFIGURATION
  ========================================================= */

  loadUtils = () =>
    import('intl-tel-input/utils');


  /*
    These countries appear first in the selector.

    IMPORTANT:
    This does NOT limit the list.
    All other countries will still appear below them.

    Using Iso2[] fixes the Angular TypeScript error.
  */
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
     SURFACE AREA UNITS
  ========================================================= */

  surfaceUnits: string[] = [
    'm²',
    'ft²'
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
     COUNTRIES FOR ADDRESS FIELDS
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

    this.premisesForm = this.fb.group({

      /* =====================================================
         CURRENT OFFICE
      ====================================================== */

      currentOfficeAddress: [
        '',
        Validators.required
      ],

      currentOfficeState: [
        ''
      ],

      currentOfficeCountry: [
        ''
      ],

      currentOfficePostalCode: [
        ''
      ],

      currentOfficeSurfaceArea: [
        null,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      currentOfficeSurfaceUnit: [
        'm²',
        Validators.required
      ],


      /* =====================================================
         CURRENT OFFICE CONTACT PERSON
      ====================================================== */

      currentContactTitle: [
        '',
        Validators.required
      ],

      currentContactFirstName: [
        '',
        Validators.required
      ],

      currentContactLastName: [
        '',
        Validators.required
      ],

      currentContactDesignation: [
        '',
        Validators.required
      ],

      currentContactLandPhone: [
        '',
        Validators.required
      ],

      currentContactMobile: [
        ''
      ],


      /* =====================================================
         BRANCH OFFICES

         Branch Office 1 is visible by default.
         Branch offices are optional.
      ====================================================== */

      branchOffices:
        this.fb.array([
          this.createBranchOffice()
        ]),


      /* =====================================================
         OTHER AIRLINE OFFICE
      ====================================================== */

      representsOtherAirlineOffice: [
        false
      ],

      otherAirlineName: [
        ''
      ],

      otherAirlineOfficeAddress: [
        ''
      ],

      otherAirlineOfficeState: [
        ''
      ],

      otherAirlineOfficeCountry: [
        ''
      ],

      otherAirlineOfficePostalCode: [
        ''
      ],

      otherAirlineOfficeSurfaceArea: [
        null
      ],

      otherAirlineOfficeSurfaceUnit: [
        'm²'
      ],

      otherAirlineContactTitle: [
        ''
      ],

      otherAirlineContactFirstName: [
        ''
      ],

      otherAirlineContactLastName: [
        ''
      ],

      otherAirlineContactDesignation: [
        ''
      ],

      otherAirlineContactLandPhone: [
        ''
      ],

      otherAirlineContactMobile: [
        ''
      ],


      /* =====================================================
         PROPOSED OFFICE FOR SRILANKAN AIRLINES
      ====================================================== */

      centralBusinessArea: [
        '',
        Validators.required
      ],

      airportBusinessHub: [
        '',
        Validators.required
      ],

      proposedOfficeAddress: [
        '',
        Validators.required
      ],

      proposedOfficeState: [
        ''
      ],

      proposedOfficeCountry: [
        ''
      ],

      proposedOfficePostalCode: [
        ''
      ],

      proposedOfficeSurfaceArea: [
        null,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      proposedOfficeSurfaceUnit: [
        'm²',
        Validators.required
      ],

      additionalOfficeLocations: [
        ''
      ],


      /* =====================================================
         PROPOSED OFFICE CONTACT PERSON
      ====================================================== */

      proposedContactTitle: [
        '',
        Validators.required
      ],

      proposedContactFirstName: [
        '',
        Validators.required
      ],

      proposedContactLastName: [
        '',
        Validators.required
      ],

      proposedContactDesignation: [
        '',
        Validators.required
      ],

      proposedContactLandPhone: [
        '',
        Validators.required
      ],

      proposedContactMobile: [
        ''
      ]

    });


    /* =====================================================
       OTHER AIRLINE CONDITIONAL VALIDATION
    ====================================================== */

    this.premisesForm
      .get('representsOtherAirlineOffice')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        const requiredTextControls = [
          'otherAirlineName',
          'otherAirlineOfficeAddress',
          'otherAirlineContactTitle',
          'otherAirlineContactFirstName',
          'otherAirlineContactLastName',
          'otherAirlineContactDesignation',
          'otherAirlineContactLandPhone'
        ];


        requiredTextControls.forEach(
          controlName => {

            const control =
              this.premisesForm.get(controlName);


            if (checked) {

              control?.setValidators([
                Validators.required
              ]);

            } else {

              control?.clearValidators();

            }


            control?.updateValueAndValidity({
              emitEvent: false
            });

          }
        );


        const surfaceArea =
          this.premisesForm.get(
            'otherAirlineOfficeSurfaceArea'
          );


        if (checked) {

          surfaceArea?.setValidators([
            Validators.required,
            Validators.min(0)
          ]);

        } else {

          surfaceArea?.clearValidators();

        }


        surfaceArea?.updateValueAndValidity({
          emitEvent: false
        });


        /*
          Clear the conditional data when
          the checkbox is unticked.
        */
        if (!checked) {

          this.premisesForm.patchValue(
            {
              otherAirlineName: '',

              otherAirlineOfficeAddress: '',
              otherAirlineOfficeState: '',
              otherAirlineOfficeCountry: '',
              otherAirlineOfficePostalCode: '',

              otherAirlineOfficeSurfaceArea: null,
              otherAirlineOfficeSurfaceUnit: 'm²',

              otherAirlineContactTitle: '',
              otherAirlineContactFirstName: '',
              otherAirlineContactLastName: '',
              otherAirlineContactDesignation: '',
              otherAirlineContactLandPhone: '',
              otherAirlineContactMobile: ''
            },
            {
              emitEvent: false
            }
          );

        }

      });

  }


  /* =========================================================
     BRANCH OFFICE FORM ARRAY
  ========================================================= */

  get branchOffices(): FormArray {

    return this.premisesForm.get(
      'branchOffices'
    ) as FormArray;

  }


  /* =========================================================
     CREATE BRANCH OFFICE
  ========================================================= */

  private createBranchOffice(): FormGroup {

    return this.fb.group({

      address: [
        ''
      ],

      state: [
        ''
      ],

      country: [
        ''
      ],

      postalCode: [
        ''
      ]

    });

  }


  /* =========================================================
     ADD BRANCH OFFICE
  ========================================================= */

  addBranchOffice(): void {

    this.branchOffices.push(
      this.createBranchOffice()
    );

  }


  /* =========================================================
     REMOVE BRANCH OFFICE

     Branch Office 1 always remains visible.
  ========================================================= */

  removeBranchOffice(
    index: number
  ): void {

    if (index === 0) {
      return;
    }


    this.branchOffices.removeAt(
      index
    );

  }


  /* =========================================================
     FIELD VALIDATION
  ========================================================= */

  isInvalid(
    controlName: string
  ): boolean {

    const control =
      this.premisesForm.get(
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
     PHONE ERROR MESSAGE
  ========================================================= */

  getPhoneErrorMessage(
    controlName: string,
    requiredMessage: string
  ): string {

    const control =
      this.premisesForm.get(
        controlName
      );


    if (!control) {

      return 'Please enter a valid phone number.';

    }


    if (
      control.hasError('required')
    ) {

      return requiredMessage;

    }


    if (
      control.hasError('invalidPhone')
    ) {

      return 'Please enter a valid phone number for the selected country.';

    }


    return 'Please enter a valid phone number.';

  }


  /* =========================================================
     CLOSE VALIDATION MODAL
  ========================================================= */

  closeValidationModal(): void {

    this.showValidationModal =
      false;


    setTimeout(() => {

      this.scrollToFirstInvalidField();

    }, 100);

  }


  /* =========================================================
     SCROLL TO FIRST INVALID FIELD
  ========================================================= */

  private scrollToFirstInvalidField(): void {

    const firstInvalid =
      document.querySelector(
        '.invalid-field, .invalid-phone'
      ) as HTMLElement | null;


    if (!firstInvalid) {
      return;
    }


    firstInvalid.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

  }


  /* =========================================================
     PREVIOUS
  ========================================================= */

  goPrevious(): void {

    this.router.navigate([
      '/application/ownership-structure'
    ]);

  }


  /* =========================================================
     NEXT
  ========================================================= */

  goNext(): void {

    this.formSubmitted = true;


    this.premisesForm
      .markAllAsTouched();


    this.premisesForm
      .updateValueAndValidity();


    if (
      this.premisesForm.invalid
    ) {

      this.showValidationModal =
        true;

      return;

    }


    console.log(
      'Premises Information:',
      this.premisesForm.getRawValue()
    );


    /*
      BACKEND LATER:

      Save:
      - PremisesInformation
      - BranchOffices

      Phone values returned by intl-tel-input
      can be stored in international E.164 format.
    */


    this.router.navigate([
      '/application/other-information'
    ]);

  }

}