import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-company-identification',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './company-identification.html',
  styleUrl: './company-identification.css'
})
export class CompanyIdentification {

  companyForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.companyForm = this.fb.group({

      /* =========================================
         APPLICATION DETAILS
      ========================================== */

      applicantType: [
        'Passenger',
        Validators.required
      ],

      territory: [
        '',
        Validators.required
      ],


      /* =========================================
         COMPANY DETAILS
      ========================================== */

      legalOrganizationName: [
        '',
        Validators.required
      ],

      incorporationDate: [
        '',
        Validators.required
      ],


      /* =========================================
         TRADE NAME
      ========================================== */

      tradeNameDifferent: [
        false
      ],

      tradeName: [
        ''
      ],


      /* =========================================
         GSA CONTRACT ENTITY
      ========================================== */

      contractNameDifferent: [
        false
      ],

      gsaContractEntityName: [
        ''
      ],


      /* =========================================
         OPERATING MODEL
      ========================================== */

      operatingModelSubsidiary: [
        ''
      ],

      operatingModelFranchise: [
        ''
      ],

      operatingModelBranch: [
        ''
      ],

      operatingModelOther: [
        ''
      ],


      /* =========================================
         REGISTRATION
      ========================================== */

      tradeRegistrationNumber: [
        '',
        Validators.required
      ],

      officialTelephoneNumber: [
        '',
        Validators.required
      ],


      /* =========================================
         MAIN OFFICE
      ========================================== */

      mainOfficeAddress: [
        '',
        Validators.required
      ],

      mainOfficeState: [
        ''
      ],

      mainOfficeCountry: [
        '',
        Validators.required
      ],

      mainOfficePostalCode: [
        ''
      ],


      /* =========================================
         EMAIL
      ========================================== */

      emailAddress: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      secondaryEmail: [
        '',
        Validators.email
      ],


      /* =========================================
         REGISTERED ADDRESS
      ========================================== */

      registeredAddress: [
        ''
      ],

      registeredState: [
        ''
      ],

      registeredCountry: [
        ''
      ],

      registeredPostalCode: [
        ''
      ],


      /* =========================================
         BUSINESS
      ========================================== */

      principalBusiness: [
        '',
        Validators.required
      ],

      otherBusiness: [
        ''
      ],


      /* =========================================
         BUSINESS REGISTRATION QUESTIONS
      ========================================== */

      registrationRequiredCountry: [
        '',
        Validators.required
      ],

      registrationRequiredTerritory: [
        '',
        Validators.required
      ],


      /* =========================================
         PARENT COMPANY
      ========================================== */

      applyingUnderParentCompany: [
        false
      ],

      parentCompanyName: [
        ''
      ],

      parentCompanyDateEstablished: [
        ''
      ],

      parentCompanyPlaceEstablished: [
        ''
      ],


      /* =========================================
         EXPERIENCE
      ========================================== */

      travelIndustryTerritoryYears: [
        null
      ],

      travelIndustryOtherTerritoryYears: [
        null
      ],

      airCargoTerritoryYears: [
        null
      ],

      airCargoOtherTerritoryYears: [
        null
      ],

      parentCompanyYears: [
        null
      ],


      /* =========================================
         IATA
      ========================================== */

      iataStatus: [
        '',
        Validators.required
      ]

    });


    /* =========================================
       CLEAR HIDDEN TRADE NAME DATA
    ========================================== */

    this.companyForm
      .get('tradeNameDifferent')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        if (!checked) {

          this.companyForm.patchValue(
            {
              tradeName: ''
            },
            {
              emitEvent: false
            }
          );

        }

      });


    /* =========================================
       CLEAR HIDDEN CONTRACT / OPERATING DATA
    ========================================== */

    this.companyForm
      .get('contractNameDifferent')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        if (!checked) {

          this.companyForm.patchValue(
            {
              gsaContractEntityName: '',

              operatingModelSubsidiary: '',
              operatingModelFranchise: '',
              operatingModelBranch: '',
              operatingModelOther: ''
            },
            {
              emitEvent: false
            }
          );

        }

      });


    /* =========================================
       CLEAR HIDDEN PARENT COMPANY DATA
    ========================================== */

    this.companyForm
      .get('applyingUnderParentCompany')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        if (!checked) {

          this.companyForm.patchValue(
            {
              parentCompanyName: '',
              parentCompanyDateEstablished: '',
              parentCompanyPlaceEstablished: '',
              parentCompanyYears: null
            },
            {
              emitEvent: false
            }
          );

        }

      });

  }


  /* =========================================
     APPLICANT TYPE
  ========================================== */

  selectApplicantType(
    type: 'Passenger' | 'Cargo'
  ): void {

    this.companyForm.patchValue({
      applicantType: type
    });

  }


  /* =========================================
     NEXT
  ========================================== */

  goNext(): void {

    if (this.companyForm.invalid) {

      this.companyForm.markAllAsTouched();

      return;

    }

    console.log(
      'Company Identification:',
      this.companyForm.getRawValue()
    );


    /*
      Later:

      1. Save this page through ASP.NET Core API.
      2. Update Applications.CurrentStep.
      3. Update CompletionPercentage.
      4. Navigate only after successful save.
    */


    this.router.navigate([
      '/application/general-information'
    ]);

  }

}