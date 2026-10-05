import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';


/* =========================================================
   STAFF MEMBER DATA TYPE
========================================================= */

export interface StaffMemberData {

  title: string;

  firstName: string;

  lastName: string;

  positionTitle: string;

  dateOfEmployment: string;

  previousEmploymentYears: number | null;

  previousEmploymentMonths: number | null;

  previousPosition: string;

  previousEmployerTitle: string;

  previousEmployerFirstName: string;

  previousEmployerLastName: string;

  previousEmployerAddressLine1: string;

  previousEmployerAddressLine2: string;

  previousEmployerState: string;

  previousEmployerCountry: string;

  previousEmployerPostalCode: string;

  qualificationsNetworkExperience: string;

  totalYearsExperience: number | null;

}


/* =========================================================
   COMPONENT
========================================================= */

@Component({
  selector: 'app-staff-details',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './staff-details.html',
  styleUrl: './staff-details.css'
})
export class StaffDetails implements OnInit {

  /* =======================================================
     INPUT
  ======================================================= */

  @Input()
  initialData: StaffMemberData[] = [];


  /* =======================================================
     OUTPUTS
  ======================================================= */

  @Output()
  closePopup = new EventEmitter<void>();


  @Output()
  saveDetails =
    new EventEmitter<StaffMemberData[]>();


  /* =======================================================
     FORM
  ======================================================= */

  staffForm: FormGroup;

  formSubmitted = false;


  /* =======================================================
     TITLE OPTIONS
  ======================================================= */

  titleOptions: string[] = [
    'Mr',
    'Mrs',
    'Ms',
    'Miss',
    'Dr',
    'Prof'
  ];


  /* =======================================================
     COUNTRY OPTIONS
  ======================================================= */

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


  /* =======================================================
     CONSTRUCTOR
  ======================================================= */

  constructor(
    private fb: FormBuilder
  ) {

    this.staffForm = this.fb.group({

      staffMembers: this.fb.array([
        this.createStaffMember()
      ])

    });

  }


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  ngOnInit(): void {

    if (
      this.initialData &&
      this.initialData.length > 0
    ) {

      this.loadInitialData(
        this.initialData
      );

    }

  }


  /* =======================================================
     STAFF FORM ARRAY
  ======================================================= */

  get staffMembers(): FormArray {

    const control =
      this.staffForm.get(
        'staffMembers'
      );


    if (
      control instanceof FormArray
    ) {

      return control;

    }


    throw new Error(
      'staffMembers control is not a FormArray.'
    );

  }


  /* =======================================================
     CREATE STAFF MEMBER
  ======================================================= */

  private createStaffMember(
    data?: Partial<StaffMemberData>
  ): FormGroup {

    return this.fb.group({

      /* ---------------------------------------------------
         NAME
      ---------------------------------------------------- */

      title: [
        data?.title ?? '',
        Validators.required
      ],

      firstName: [
        data?.firstName ?? '',
        Validators.required
      ],

      lastName: [
        data?.lastName ?? '',
        Validators.required
      ],


      /* ---------------------------------------------------
         CURRENT EMPLOYMENT
      ---------------------------------------------------- */

      positionTitle: [
        data?.positionTitle ?? ''
      ],

      dateOfEmployment: [
        data?.dateOfEmployment ?? ''
      ],


      /* ---------------------------------------------------
         PREVIOUS EMPLOYMENT DURATION
      ---------------------------------------------------- */

      previousEmploymentYears: [
        data?.previousEmploymentYears ?? null,
        [
          Validators.min(0)
        ]
      ],

      previousEmploymentMonths: [
        data?.previousEmploymentMonths ?? null,
        [
          Validators.min(0),
          Validators.max(11)
        ]
      ],


      /* ---------------------------------------------------
         PREVIOUS POSITION
      ---------------------------------------------------- */

      previousPosition: [
        data?.previousPosition ?? ''
      ],


      /* ---------------------------------------------------
         PREVIOUS EMPLOYER
      ---------------------------------------------------- */

      previousEmployerTitle: [
        data?.previousEmployerTitle ?? ''
      ],

      previousEmployerFirstName: [
        data?.previousEmployerFirstName ?? ''
      ],

      previousEmployerLastName: [
        data?.previousEmployerLastName ?? ''
      ],

      previousEmployerAddressLine1: [
        data?.previousEmployerAddressLine1 ?? ''
      ],

      previousEmployerAddressLine2: [
        data?.previousEmployerAddressLine2 ?? ''
      ],

      previousEmployerState: [
        data?.previousEmployerState ?? ''
      ],

      previousEmployerCountry: [
        data?.previousEmployerCountry ?? ''
      ],

      previousEmployerPostalCode: [
        data?.previousEmployerPostalCode ?? ''
      ],


      /* ---------------------------------------------------
         QUALIFICATIONS
      ---------------------------------------------------- */

      qualificationsNetworkExperience: [
        data?.qualificationsNetworkExperience ?? ''
      ],


      /* ---------------------------------------------------
         EXPERIENCE
      ---------------------------------------------------- */

      totalYearsExperience: [
        data?.totalYearsExperience ?? null,
        [
          Validators.min(0)
        ]
      ]

    });

  }


  /* =======================================================
     LOAD EXISTING STAFF DATA

     Used when user saves the popup and later
     opens it again for editing.
  ======================================================= */

  private loadInitialData(
    data: StaffMemberData[]
  ): void {

    const staffGroups: FormGroup[] = [];


    data.forEach(
      staff => {

        staffGroups.push(
          this.createStaffMember(
            staff
          )
        );

      }
    );


    /*
      Always keep at least one staff form.
    */

    if (
      staffGroups.length === 0
    ) {

      staffGroups.push(
        this.createStaffMember()
      );

    }


    this.staffForm.setControl(
      'staffMembers',
      this.fb.array(
        staffGroups
      )
    );

  }


  /* =======================================================
     ADD ANOTHER STAFF MEMBER
  ======================================================= */

  addStaffMember(): void {

    this.staffMembers.push(
      this.createStaffMember()
    );

  }


  /* =======================================================
     REMOVE STAFF MEMBER
  ======================================================= */

  removeStaffMember(
    index: number
  ): void {

    /*
      Keep the first form visible.

      User can only remove additional staff forms.
    */

    if (
      this.staffMembers.length <= 1
    ) {

      return;

    }


    this.staffMembers.removeAt(
      index
    );

  }


  /* =======================================================
     FIELD VALIDATION
  ======================================================= */

  isInvalid(
    index: number,
    controlName: string
  ): boolean {

    const staffGroup =
      this.staffMembers.at(
        index
      );


    if (
      !(staffGroup instanceof FormGroup)
    ) {

      return false;

    }


    const control =
      staffGroup.get(
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


  /* =======================================================
     SAFE STRING VALUE
  ======================================================= */

  private getStringValue(
    group: FormGroup,
    controlName: string
  ): string {

    const value =
      group.get(
        controlName
      )?.value;


    if (
      value === null ||
      value === undefined
    ) {

      return '';

    }


    return String(
      value
    ).trim();

  }


  /* =======================================================
     SAFE NUMBER VALUE
  ======================================================= */

  private getNumberValue(
    group: FormGroup,
    controlName: string
  ): number | null {

    const value =
      group.get(
        controlName
      )?.value;


    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {

      return null;

    }


    const numberValue =
      Number(
        value
      );


    if (
      Number.isNaN(
        numberValue
      )
    ) {

      return null;

    }


    return numberValue;

  }


  /* =======================================================
     CONVERT FORM GROUP TO STAFF MEMBER DATA

     This is the important part that fixes
     your TypeScript "unknown[]" problem.
  ======================================================= */

  private convertToStaffMember(
    control: AbstractControl
  ): StaffMemberData {

    if (
      !(control instanceof FormGroup)
    ) {

      throw new Error(
        'Staff member control is not a FormGroup.'
      );

    }


    return {

      title:
        this.getStringValue(
          control,
          'title'
        ),

      firstName:
        this.getStringValue(
          control,
          'firstName'
        ),

      lastName:
        this.getStringValue(
          control,
          'lastName'
        ),

      positionTitle:
        this.getStringValue(
          control,
          'positionTitle'
        ),

      dateOfEmployment:
        this.getStringValue(
          control,
          'dateOfEmployment'
        ),

      previousEmploymentYears:
        this.getNumberValue(
          control,
          'previousEmploymentYears'
        ),

      previousEmploymentMonths:
        this.getNumberValue(
          control,
          'previousEmploymentMonths'
        ),

      previousPosition:
        this.getStringValue(
          control,
          'previousPosition'
        ),

      previousEmployerTitle:
        this.getStringValue(
          control,
          'previousEmployerTitle'
        ),

      previousEmployerFirstName:
        this.getStringValue(
          control,
          'previousEmployerFirstName'
        ),

      previousEmployerLastName:
        this.getStringValue(
          control,
          'previousEmployerLastName'
        ),

      previousEmployerAddressLine1:
        this.getStringValue(
          control,
          'previousEmployerAddressLine1'
        ),

      previousEmployerAddressLine2:
        this.getStringValue(
          control,
          'previousEmployerAddressLine2'
        ),

      previousEmployerState:
        this.getStringValue(
          control,
          'previousEmployerState'
        ),

      previousEmployerCountry:
        this.getStringValue(
          control,
          'previousEmployerCountry'
        ),

      previousEmployerPostalCode:
        this.getStringValue(
          control,
          'previousEmployerPostalCode'
        ),

      qualificationsNetworkExperience:
        this.getStringValue(
          control,
          'qualificationsNetworkExperience'
        ),

      totalYearsExperience:
        this.getNumberValue(
          control,
          'totalYearsExperience'
        )

    };

  }


  /* =======================================================
     BUILD STAFF DATA ARRAY
  ======================================================= */

  private buildStaffData():
    StaffMemberData[] {

    const result:
      StaffMemberData[] = [];


    for (
      const control of
      this.staffMembers.controls
    ) {

      const staffMember =
        this.convertToStaffMember(
          control
        );


      result.push(
        staffMember
      );

    }


    return result;

  }


  /* =======================================================
     CLOSE POPUP
  ======================================================= */

  close(): void {

    this.closePopup.emit();

  }


  /* =======================================================
     SAVE
  ======================================================= */

  save(): void {

    this.formSubmitted =
      true;


    this.staffForm
      .markAllAsTouched();


    this.staffForm
      .updateValueAndValidity();


    if (
      this.staffForm.invalid
    ) {

      return;

    }


    /*
      Build a strongly typed array instead
      of:

      this.staffMembers.getRawValue()
      as StaffMemberData[]

      That old conversion caused your
      TypeScript error.
    */

    const staffData =
      this.buildStaffData();


    console.log(
      'Staff Details:',
      staffData
    );


    this.saveDetails.emit(
      staffData
    );

  }

}