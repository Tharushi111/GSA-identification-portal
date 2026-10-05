import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  DirectorsDetails,
  DirectorsDetailsPayload
} from './directors-details/directors-details';

import {
  StaffDetails,
  StaffMemberData
} from './staff-details/staff-details';


@Component({
  selector: 'app-other-information',

  imports: [
    ReactiveFormsModule,
    DirectorsDetails,
    StaffDetails
  ],

  templateUrl: './other-information.html',
  styleUrl: './other-information.css'
})
export class OtherInformation {

  /* =========================================================
     MAIN FORM
  ========================================================= */

  otherInformationForm: FormGroup;

  formSubmitted = false;

  showValidationModal = false;


  /* =========================================================
     CHILD POPUPS
  ========================================================= */

  showDirectorsPopup = false;
  showStaffPopup = false;


  /* =========================================================
     SAVED CHILD DATA
  ========================================================= */

  directorsDetailsData:
    DirectorsDetailsPayload | null = null;

  staffDetailsData:
    StaffMemberData[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.otherInformationForm =
      this.fb.group({

        /*
          This question is optional in the
          original form because it does not
          display a required marker.
        */
        isGSAForOtherAirline: [
          null
        ],


        /*
          Required according to the original
          application structure.
        */
        intendsToRegisterAgreement: [
          null,
          Validators.required
        ]

      });

  }


  /* =========================================================
     MAIN FORM VALIDATION
  ========================================================= */

  isInvalid(
    controlName: string
  ): boolean {

    const control =
      this.otherInformationForm.get(
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
     DIRECTORS SECTION STATUS
  ========================================================= */

  directorsSectionInvalid(): boolean {

    return (
      this.formSubmitted &&
      (
        !this.directorsDetailsData ||
        this.directorsDetailsData
          .organizationDirectors
          .length === 0
      )
    );

  }


  /* =========================================================
     STAFF SECTION STATUS
  ========================================================= */

  staffSectionInvalid(): boolean {

    return (
      this.formSubmitted &&
      this.staffDetailsData.length === 0
    );

  }


  /* =========================================================
     DIRECTOR RECORD COUNT
  ========================================================= */

  get directorsRecordCount(): number {

    if (
      !this.directorsDetailsData
    ) {

      return 0;

    }


    return (
      this.directorsDetailsData
        .organizationDirectors.length +

      this.directorsDetailsData
        .sriLankanDirectors.length +

      this.directorsDetailsData
        .sriLankanEmployees.length +

      this.directorsDetailsData
        .closeFamilyMembers.length
    );

  }


  /* =========================================================
     STAFF RECORD COUNT
  ========================================================= */

  get staffRecordCount(): number {

    return this.staffDetailsData.length;

  }


  /* =========================================================
     OPEN DIRECTORS POPUP
  ========================================================= */

  openDirectorsPopup(): void {

    this.showDirectorsPopup = true;

  }


  /* =========================================================
     CLOSE DIRECTORS POPUP
  ========================================================= */

  closeDirectorsPopup(): void {

    this.showDirectorsPopup = false;

  }


  /* =========================================================
     SAVE DIRECTORS DETAILS
  ========================================================= */

  saveDirectorsDetails(
    data: DirectorsDetailsPayload
  ): void {

    this.directorsDetailsData =
      data;


    this.showDirectorsPopup =
      false;


    console.log(
      'Directors / Shareholders / Managers:',
      data
    );

  }


  /* =========================================================
     OPEN STAFF POPUP
  ========================================================= */

  openStaffPopup(): void {

    this.showStaffPopup = true;

  }


  /* =========================================================
     CLOSE STAFF POPUP
  ========================================================= */

  closeStaffPopup(): void {

    this.showStaffPopup = false;

  }


  /* =========================================================
     SAVE STAFF DETAILS
  ========================================================= */

  saveStaffDetails(
    data: StaffMemberData[]
  ): void {

    this.staffDetailsData =
      data;


    this.showStaffPopup =
      false;


    console.log(
      'Passenger / Cargo GSA Staff:',
      data
    );

  }


  /* =========================================================
     VALIDATION MODAL
  ========================================================= */

  closeValidationModal(): void {

    this.showValidationModal =
      false;


    setTimeout(() => {

      this.scrollToFirstInvalidSection();

    }, 100);

  }


  /* =========================================================
     SCROLL TO FIRST INVALID SECTION
  ========================================================= */

  private scrollToFirstInvalidSection():
    void {

    const firstInvalid =
      document.querySelector(
        '.invalid-section'
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
      '/application/premises-information'
    ]);

  }


  /* =========================================================
     NEXT
  ========================================================= */

  goNext(): void {

    this.formSubmitted = true;


    this.otherInformationForm
      .markAllAsTouched();


    const directorsMissing =
      !this.directorsDetailsData ||
      this.directorsDetailsData
        .organizationDirectors
        .length === 0;


    const staffMissing =
      this.staffDetailsData.length === 0;


    if (
      this.otherInformationForm.invalid ||
      directorsMissing ||
      staffMissing
    ) {

      this.showValidationModal =
        true;

      return;

    }


    const payload = {

      ...this.otherInformationForm
        .getRawValue(),

      directorsDetails:
        this.directorsDetailsData,

      staffDetails:
        this.staffDetailsData

    };


    console.log(
      'Complete Other Information:',
      payload
    );


    /*
      BACKEND LATER

      Save:

      1. OtherInformation
         - IsGSAForOtherAirline
         - IntendsToRegisterAgreementWithGovernmentAuthority

      2. OrganizationRelatedPersons
         - directors / principal officers
         - parent/subsidiary directors
         - SriLankan employees
         - close family members

      3. GSAStaffDetails
         - Passenger / Cargo staff details

      After successful save:
         Applications.CurrentStep = 6
    */


    this.router.navigate([
      '/application/document-upload'
    ]);

  }

}