import { Component } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
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

  formSubmitted = false;
  showValidationModal = false;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.companyForm = this.fb.group(
      {

        /* =========================================
           APPLICATION
        ========================================== */

        applicantType: [
          '',
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
           REGISTRATION QUESTIONS
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
           IATA STATUS
        ========================================== */

        iataStatus: [
          '',
          Validators.required
        ]

      },

      {
        validators: [
          this.operatingModelValidator()
        ]
      }
    );


    /* =========================================
       TRADE NAME CONDITIONAL VALIDATION
    ========================================== */

    this.companyForm
      .get('tradeNameDifferent')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        const tradeName =
          this.companyForm.get('tradeName');

        if (checked) {

          tradeName?.setValidators([
            Validators.required
          ]);

        } else {

          tradeName?.clearValidators();

          tradeName?.setValue(
            '',
            {
              emitEvent: false
            }
          );

        }

        tradeName?.updateValueAndValidity({
          emitEvent: false
        });

      });


    /* =========================================
       GSA CONTRACT ENTITY CONDITIONAL VALIDATION
    ========================================== */

    this.companyForm
      .get('contractNameDifferent')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        const entityName =
          this.companyForm.get(
            'gsaContractEntityName'
          );

        if (checked) {

          entityName?.setValidators([
            Validators.required
          ]);

        } else {

          entityName?.clearValidators();

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

        entityName?.updateValueAndValidity({
          emitEvent: false
        });

        this.companyForm.updateValueAndValidity({
          emitEvent: false
        });

      });


    /* =========================================
       PARENT COMPANY CONDITIONAL VALIDATION
    ========================================== */

    this.companyForm
      .get('applyingUnderParentCompany')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        const parentName =
          this.companyForm.get(
            'parentCompanyName'
          );

        const parentDate =
          this.companyForm.get(
            'parentCompanyDateEstablished'
          );

        const parentPlace =
          this.companyForm.get(
            'parentCompanyPlaceEstablished'
          );


        if (checked) {

          parentName?.setValidators([
            Validators.required
          ]);

          parentDate?.setValidators([
            Validators.required
          ]);

          parentPlace?.setValidators([
            Validators.required
          ]);

        } else {

          parentName?.clearValidators();
          parentDate?.clearValidators();
          parentPlace?.clearValidators();

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

        parentName?.updateValueAndValidity({
          emitEvent: false
        });

        parentDate?.updateValueAndValidity({
          emitEvent: false
        });

        parentPlace?.updateValueAndValidity({
          emitEvent: false
        });

      });

  }


  /* =========================================
     OPERATING MODEL VALIDATOR

     If contractNameDifferent is selected,
     at least ONE operating model must be entered.
  ========================================== */

  private operatingModelValidator(): ValidatorFn {

    return (
      control: AbstractControl
    ): ValidationErrors | null => {

      const contractDifferent =
        control.get(
          'contractNameDifferent'
        )?.value;

      if (!contractDifferent) {
        return null;
      }


      const subsidiary =
        control.get(
          'operatingModelSubsidiary'
        )?.value?.trim();

      const franchise =
        control.get(
          'operatingModelFranchise'
        )?.value?.trim();

      const branch =
        control.get(
          'operatingModelBranch'
        )?.value?.trim();

      const other =
        control.get(
          'operatingModelOther'
        )?.value?.trim();


      const hasOperatingModel =
        !!subsidiary ||
        !!franchise ||
        !!branch ||
        !!other;


      return hasOperatingModel
        ? null
        : {
            operatingModelRequired: true
          };

    };

  }


  /* =========================================
     APPLICANT TYPE
  ========================================== */

  selectApplicantType(
    type: 'Passenger' | 'Cargo'
  ): void {

    const control =
      this.companyForm.get(
        'applicantType'
      );

    control?.setValue(type);
    control?.markAsTouched();

  }


  /* =========================================
     CONTROL INVALID CHECK
  ========================================== */

  isInvalid(
    controlName: string
  ): boolean {

    const control =
      this.companyForm.get(
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
     OPERATING MODEL INVALID
  ========================================== */

  isOperatingModelInvalid(): boolean {

    return (
      this.formSubmitted &&
      this.companyForm
        .hasError(
          'operatingModelRequired'
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
     SCROLL TO FIRST INVALID FIELD
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
     NEXT
  ========================================== */

  goNext(): void {

    this.formSubmitted = true;

    this.companyForm.markAllAsTouched();

    this.companyForm.updateValueAndValidity();


    if (this.companyForm.invalid) {

      this.showValidationModal = true;

      return;

    }


    console.log(
      'Company Identification:',
      this.companyForm.getRawValue()
    );


    /*
      BACKEND LATER:

      1. Save CompanyIdentification.
      2. Update Applications.CurrentStep = 2.
      3. Update CompletionPercentage.
      4. Mark Step 1 as completed.
      5. Navigate only after API success.
    */


    this.router.navigate([
      '/application/general-information'
    ]);

  }

}