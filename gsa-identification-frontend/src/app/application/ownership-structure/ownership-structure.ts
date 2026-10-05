import { Component } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-ownership-structure',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './ownership-structure.html',
  styleUrl: './ownership-structure.css'
})
export class OwnershipStructure {

  ownershipForm: FormGroup;

  formSubmitted = false;
  showValidationModal = false;


  /* =========================================
     CURRENCY OPTIONS
  ========================================== */

  currencyOptions: string[] = [
    'AED',
    'AFN',
    'ALL',
    'AMD',
    'ANG',
    'AOA',
    'ARS',
    'AUD',
    'AWG',
    'AZN',
    'BAM',
    'BBD',
    'BDT',
    'BGN',
    'BHD',
    'BIF',
    'BMD',
    'BND',
    'BOB',
    'BRL',
    'BSD',
    'BTN',
    'BWP',
    'BYN',
    'BZD',
    'CAD',
    'CDF',
    'CHF',
    'CLP',
    'CNY',
    'COP',
    'CRC',
    'CUP',
    'CVE',
    'CZK',
    'DJF',
    'DKK',
    'DOP',
    'DZD',
    'EGP',
    'ERN',
    'ETB',
    'EUR',
    'FJD',
    'FKP',
    'GBP',
    'GEL',
    'GHS',
    'GIP',
    'GMD',
    'GNF',
    'GTQ',
    'GYD',
    'HKD',
    'HNL',
    'HTG',
    'HUF',
    'IDR',
    'ILS',
    'INR',
    'IQD',
    'IRR',
    'ISK',
    'JMD',
    'JOD',
    'JPY',
    'KES',
    'KGS',
    'KHR',
    'KMF',
    'KPW',
    'KRW',
    'KWD',
    'KYD',
    'KZT',
    'LAK',
    'LBP',
    'LKR',
    'LRD',
    'LSL',
    'LYD',
    'MAD',
    'MDL',
    'MGA',
    'MKD',
    'MMK',
    'MNT',
    'MOP',
    'MRU',
    'MUR',
    'MVR',
    'MWK',
    'MXN',
    'MYR',
    'MZN',
    'NAD',
    'NGN',
    'NIO',
    'NOK',
    'NPR',
    'NZD',
    'OMR',
    'PAB',
    'PEN',
    'PGK',
    'PHP',
    'PKR',
    'PLN',
    'PYG',
    'QAR',
    'RON',
    'RSD',
    'RUB',
    'RWF',
    'SAR',
    'SBD',
    'SCR',
    'SDG',
    'SEK',
    'SGD',
    'SHP',
    'SLE',
    'SOS',
    'SRD',
    'SSP',
    'STN',
    'SYP',
    'SZL',
    'THB',
    'TJS',
    'TMT',
    'TND',
    'TOP',
    'TRY',
    'TTD',
    'TWD',
    'TZS',
    'UAH',
    'UGX',
    'USD',
    'UYU',
    'UZS',
    'VED',
    'VES',
    'VND',
    'VUV',
    'WST',
    'XAF',
    'XCD',
    'XOF',
    'XPF',
    'YER',
    'ZAR',
    'ZMW',
    'ZWG'
  ];


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.ownershipForm = this.fb.group(
      {

        /* =========================================
           OWNERSHIP TYPE
        ========================================== */

        isSoleProprietorship: [
          false
        ],

        isPartnership: [
          false
        ],

        isCorporation: [
          false
        ],


        /* =========================================
           SHAREHOLDERS
        ========================================== */

        shareholders:
          this.fb.array([]),


        /* =========================================
           FINANCIAL INFORMATION
        ========================================== */

        registeredCapital: [
          null,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],

        registeredCapitalCurrency: [
          'LKR',
          Validators.required
        ],

        paidUpCapital: [
          null,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],

        paidUpCapitalCurrency: [
          'LKR',
          Validators.required
        ],

        minimumPaidUpCapital: [
          null,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],

        minimumPaidUpCapitalCurrency: [
          'LKR',
          Validators.required
        ]

      },

      {
        validators: [
          this.ownershipTypeValidator()
        ]
      }
    );


    /* =========================================
       CORPORATION CHANGE
    ========================================== */

    this.ownershipForm
      .get('isCorporation')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        if (checked) {

          if (
            this.shareholders.length === 0
          ) {

            this.addShareholder();

          }

        } else {

          while (
            this.shareholders.length > 0
          ) {

            this.shareholders.removeAt(0);

          }

        }

      });

  }


  /* =========================================
     SHAREHOLDERS FORM ARRAY
  ========================================== */

  get shareholders(): FormArray {

    return this.ownershipForm.get(
      'shareholders'
    ) as FormArray;

  }


  /* =========================================
     CREATE SHAREHOLDER
  ========================================== */

  private createShareholder(): FormGroup {

    return this.fb.group({

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

      addressLine1: [
        '',
        Validators.required
      ],

      addressLine2: [
        ''
      ],

      stateCity: [
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


  /* =========================================
     ADD SHAREHOLDER
  ========================================== */

  addShareholder(): void {

    this.shareholders.push(
      this.createShareholder()
    );

  }


  /* =========================================
     REMOVE SHAREHOLDER
  ========================================== */

  removeShareholder(
    index: number
  ): void {

    if (
      this.shareholders.length <= 1
    ) {

      return;

    }

    this.shareholders.removeAt(
      index
    );

  }


  /* =========================================
     OWNERSHIP TYPE VALIDATOR
  ========================================== */

  private ownershipTypeValidator():
    ValidatorFn {

    return (
      control: AbstractControl
    ): ValidationErrors | null => {

      const sole =
        control.get(
          'isSoleProprietorship'
        )?.value;

      const partnership =
        control.get(
          'isPartnership'
        )?.value;

      const corporation =
        control.get(
          'isCorporation'
        )?.value;


      return (
        sole ||
        partnership ||
        corporation
      )
        ? null
        : {
            ownershipTypeRequired: true
          };

    };

  }


  /* =========================================
     OWNERSHIP INVALID
  ========================================== */

  isOwnershipTypeInvalid(): boolean {

    return (
      this.formSubmitted &&
      this.ownershipForm.hasError(
        'ownershipTypeRequired'
      )
    );

  }


  /* =========================================
     FIELD INVALID
  ========================================== */

  isInvalid(
    controlName: string
  ): boolean {

    const control =
      this.ownershipForm.get(
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


  /* =========================================
     SHAREHOLDER FIELD INVALID
  ========================================== */

  isShareholderInvalid(
    index: number,
    controlName: string
  ): boolean {

    const control =
      this.shareholders
        .at(index)
        .get(controlName);


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


  /* =========================================
     CLOSE VALIDATION MODAL
  ========================================== */

  closeValidationModal(): void {

    this.showValidationModal = false;


    setTimeout(() => {

      this.scrollToFirstInvalidField();

    }, 100);

  }


  /* =========================================
     SCROLL TO FIRST INVALID
  ========================================== */

  private scrollToFirstInvalidField(): void {

    const firstInvalid =
      document.querySelector(
        '.invalid-field, .invalid-group'
      ) as HTMLElement | null;


    if (!firstInvalid) {
      return;
    }


    firstInvalid.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });


    const focusable =
      firstInvalid.matches(
        'input, select, button'
      )
        ? firstInvalid
        : firstInvalid.querySelector(
            'input, select, button'
          ) as HTMLElement | null;


    setTimeout(() => {

      focusable?.focus({
        preventScroll: true
      });

    }, 400);

  }


  /* =========================================
     PREVIOUS
  ========================================== */

  goPrevious(): void {

    this.router.navigate([
      '/application/general-information'
    ]);

  }


  /* =========================================
     NEXT
  ========================================== */

  goNext(): void {

    this.formSubmitted = true;

    this.ownershipForm
      .markAllAsTouched();

    this.ownershipForm
      .updateValueAndValidity();


    if (
      this.ownershipForm.invalid
    ) {

      this.showValidationModal = true;

      return;

    }


    console.log(
      'Ownership Structure:',
      this.ownershipForm.getRawValue()
    );


    /*
      BACKEND LATER:

      OwnershipStructure
      Shareholders
      FinancialInformation

      will be saved through the ASP.NET API.
    */


    this.router.navigate([
      '/application/financial-information'
    ]);

  }

}