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
  selector: 'app-general-information',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './general-information.html',
  styleUrl: './general-information.css'
})
export class GeneralInformation {

  generalInformationForm: FormGroup;

  formSubmitted = false;
  showValidationModal = false;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.generalInformationForm = this.fb.group(
      {

        /* =========================================
           BUSINESS ENTITY TYPES
        ========================================== */

        soleProprietorship: [
          false
        ],

        partnership: [
          false
        ],

        limitedLiabilityCompany: [
          false
        ],

        otherBusinessEntity: [
          false
        ],


        /* =========================================
           OTHER BUSINESS ENTITY
        ========================================== */

        otherBusinessEntityDescription: [
          ''
        ]

      },

      {
        validators: [
          this.atLeastOneBusinessEntityValidator()
        ]
      }
    );


    /* =========================================
       OTHER BUSINESS ENTITY VALIDATION
    ========================================== */

    this.generalInformationForm
      .get('otherBusinessEntity')
      ?.valueChanges
      .subscribe((checked: boolean) => {

        const description =
          this.generalInformationForm.get(
            'otherBusinessEntityDescription'
          );


        if (checked) {

          description?.setValidators([
            Validators.required
          ]);

        } else {

          description?.clearValidators();

          description?.setValue(
            '',
            {
              emitEvent: false
            }
          );

        }


        description?.updateValueAndValidity({
          emitEvent: false
        });


        this.generalInformationForm
          .updateValueAndValidity({
            emitEvent: false
          });

      });

  }


  /* =========================================
     AT LEAST ONE ENTITY VALIDATOR
  ========================================== */

  private atLeastOneBusinessEntityValidator():
    ValidatorFn {

    return (
      control: AbstractControl
    ): ValidationErrors | null => {

      const soleProprietorship =
        control.get(
          'soleProprietorship'
        )?.value;

      const partnership =
        control.get(
          'partnership'
        )?.value;

      const limitedLiabilityCompany =
        control.get(
          'limitedLiabilityCompany'
        )?.value;

      const otherBusinessEntity =
        control.get(
          'otherBusinessEntity'
        )?.value;


      const selected =
        soleProprietorship ||
        partnership ||
        limitedLiabilityCompany ||
        otherBusinessEntity;


      return selected
        ? null
        : {
            businessEntityRequired: true
          };

    };

  }


  /* =========================================
     BUSINESS ENTITY INVALID
  ========================================== */

  isBusinessEntityInvalid(): boolean {

    return (
      this.formSubmitted &&
      this.generalInformationForm
        .hasError(
          'businessEntityRequired'
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
      this.generalInformationForm.get(
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
      '/application/company-identification'
    ]);

  }


  /* =========================================
     NEXT
  ========================================== */

  goNext(): void {

    this.formSubmitted = true;

    this.generalInformationForm
      .markAllAsTouched();

    this.generalInformationForm
      .updateValueAndValidity();


    if (
      this.generalInformationForm.invalid
    ) {

      this.showValidationModal = true;

      return;

    }


    console.log(
      'General Information:',
      this.generalInformationForm
        .getRawValue()
    );


    /*
      BACKEND LATER:

      1. Save GeneralInformation.
      2. Update Applications.CurrentStep = 3.
      3. Update CompletionPercentage.
      4. Mark Step 2 completed.
      5. Navigate after API success.
    */


    this.router.navigate([
      '/application/ownership-structure'
    ]);

  }

}