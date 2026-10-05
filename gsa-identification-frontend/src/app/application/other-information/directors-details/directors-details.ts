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
   DATA TYPES
========================================================= */

export interface OrganizationDirectorData {
  title: string;
  firstName: string;
  lastName: string;
  designation: string;
  shareholdingPercentage: number | null;
}


export interface RelatedPersonData {
  title: string;
  firstName: string;
  lastName: string;
}


export interface DirectorsDetailsPayload {
  organizationDirectors: OrganizationDirectorData[];
  sriLankanDirectors: RelatedPersonData[];
  sriLankanEmployees: RelatedPersonData[];
  closeFamilyMembers: RelatedPersonData[];
}


/* =========================================================
   COMPONENT
========================================================= */

@Component({
  selector: 'app-directors-details',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './directors-details.html',
  styleUrl: './directors-details.css'
})
export class DirectorsDetails implements OnInit {

  /* =======================================================
     INPUT / OUTPUT
  ======================================================= */

  @Input()
  initialData: DirectorsDetailsPayload | null = null;


  @Output()
  closePopup = new EventEmitter<void>();


  @Output()
  saveDetails =
    new EventEmitter<DirectorsDetailsPayload>();


  /* =======================================================
     FORM
  ======================================================= */

  directorsForm: FormGroup;

  formSubmitted = false;


  /* =======================================================
     OPTIONS
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
     CONSTRUCTOR
  ======================================================= */

  constructor(
    private fb: FormBuilder
  ) {

    this.directorsForm = this.fb.group({

      organizationDirectors:
        this.fb.array([
          this.createOrganizationDirector()
        ]),

      sriLankanDirectors:
        this.fb.array([
          this.createOptionalPerson()
        ]),

      sriLankanEmployees:
        this.fb.array([
          this.createOptionalPerson()
        ]),

      closeFamilyMembers:
        this.fb.array([
          this.createOptionalPerson()
        ])

    });

  }


  /* =======================================================
     INITIAL DATA
  ======================================================= */

  ngOnInit(): void {

    if (this.initialData) {

      this.loadInitialData(
        this.initialData
      );

    }

  }


  /* =======================================================
     FORM ARRAY GETTERS
  ======================================================= */

  get organizationDirectors(): FormArray {

    return this.directorsForm.get(
      'organizationDirectors'
    ) as FormArray;

  }


  get sriLankanDirectors(): FormArray {

    return this.directorsForm.get(
      'sriLankanDirectors'
    ) as FormArray;

  }


  get sriLankanEmployees(): FormArray {

    return this.directorsForm.get(
      'sriLankanEmployees'
    ) as FormArray;

  }


  get closeFamilyMembers(): FormArray {

    return this.directorsForm.get(
      'closeFamilyMembers'
    ) as FormArray;

  }


  /* =======================================================
     CREATE ORGANIZATION DIRECTOR
  ======================================================= */

  private createOrganizationDirector(
    data?: Partial<OrganizationDirectorData>
  ): FormGroup {

    return this.fb.group({

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

      designation: [
        data?.designation ?? '',
        Validators.required
      ],

      shareholdingPercentage: [
        data?.shareholdingPercentage ?? null,
        [
          Validators.min(0),
          Validators.max(100)
        ]
      ]

    });

  }


  /* =======================================================
     CREATE OPTIONAL RELATED PERSON
  ======================================================= */

  private createOptionalPerson(
    data?: Partial<RelatedPersonData>
  ): FormGroup {

    return this.fb.group({

      title: [
        data?.title ?? ''
      ],

      firstName: [
        data?.firstName ?? ''
      ],

      lastName: [
        data?.lastName ?? ''
      ]

    });

  }


  /* =======================================================
     LOAD EXISTING DATA
  ======================================================= */

  private loadInitialData(
    data: DirectorsDetailsPayload
  ): void {

    /* -----------------------------------------------------
       ORGANIZATION DIRECTORS
    ------------------------------------------------------ */

    const organizationGroups: FormGroup[] = [];

    if (
      data.organizationDirectors.length > 0
    ) {

      data.organizationDirectors.forEach(
        person => {

          organizationGroups.push(
            this.createOrganizationDirector(
              person
            )
          );

        }
      );

    } else {

      organizationGroups.push(
        this.createOrganizationDirector()
      );

    }


    /* -----------------------------------------------------
       SRILANKAN DIRECTORS
    ------------------------------------------------------ */

    const sriLankanDirectorGroups:
      FormGroup[] = [];

    if (
      data.sriLankanDirectors.length > 0
    ) {

      data.sriLankanDirectors.forEach(
        person => {

          sriLankanDirectorGroups.push(
            this.createOptionalPerson(
              person
            )
          );

        }
      );

    } else {

      sriLankanDirectorGroups.push(
        this.createOptionalPerson()
      );

    }


    /* -----------------------------------------------------
       SRILANKAN EMPLOYEES
    ------------------------------------------------------ */

    const sriLankanEmployeeGroups:
      FormGroup[] = [];

    if (
      data.sriLankanEmployees.length > 0
    ) {

      data.sriLankanEmployees.forEach(
        person => {

          sriLankanEmployeeGroups.push(
            this.createOptionalPerson(
              person
            )
          );

        }
      );

    } else {

      sriLankanEmployeeGroups.push(
        this.createOptionalPerson()
      );

    }


    /* -----------------------------------------------------
       CLOSE FAMILY MEMBERS
    ------------------------------------------------------ */

    const familyGroups: FormGroup[] = [];

    if (
      data.closeFamilyMembers.length > 0
    ) {

      data.closeFamilyMembers.forEach(
        person => {

          familyGroups.push(
            this.createOptionalPerson(
              person
            )
          );

        }
      );

    } else {

      familyGroups.push(
        this.createOptionalPerson()
      );

    }


    /* -----------------------------------------------------
       REPLACE ARRAYS
    ------------------------------------------------------ */

    this.directorsForm.setControl(
      'organizationDirectors',
      this.fb.array(
        organizationGroups
      )
    );


    this.directorsForm.setControl(
      'sriLankanDirectors',
      this.fb.array(
        sriLankanDirectorGroups
      )
    );


    this.directorsForm.setControl(
      'sriLankanEmployees',
      this.fb.array(
        sriLankanEmployeeGroups
      )
    );


    this.directorsForm.setControl(
      'closeFamilyMembers',
      this.fb.array(
        familyGroups
      )
    );

  }


  /* =======================================================
     ADD ORGANIZATION DIRECTOR
  ======================================================= */

  addOrganizationDirector(): void {

    this.organizationDirectors.push(
      this.createOrganizationDirector()
    );

  }


  /* =======================================================
     ADD SRILANKAN DIRECTOR
  ======================================================= */

  addSriLankanDirector(): void {

    this.sriLankanDirectors.push(
      this.createOptionalPerson()
    );

  }


  /* =======================================================
     ADD SRILANKAN EMPLOYEE
  ======================================================= */

  addSriLankanEmployee(): void {

    this.sriLankanEmployees.push(
      this.createOptionalPerson()
    );

  }


  /* =======================================================
     ADD CLOSE FAMILY MEMBER
  ======================================================= */

  addCloseFamilyMember(): void {

    this.closeFamilyMembers.push(
      this.createOptionalPerson()
    );

  }


  /* =======================================================
     REMOVE ORGANIZATION DIRECTOR
  ======================================================= */

  removeOrganizationDirector(
    index: number
  ): void {

    if (
      this.organizationDirectors.length <= 1
    ) {
      return;
    }


    this.organizationDirectors.removeAt(
      index
    );

  }


  /* =======================================================
     REMOVE SRILANKAN DIRECTOR
  ======================================================= */

  removeSriLankanDirector(
    index: number
  ): void {

    if (
      this.sriLankanDirectors.length <= 1
    ) {
      return;
    }


    this.sriLankanDirectors.removeAt(
      index
    );

  }


  /* =======================================================
     REMOVE SRILANKAN EMPLOYEE
  ======================================================= */

  removeSriLankanEmployee(
    index: number
  ): void {

    if (
      this.sriLankanEmployees.length <= 1
    ) {
      return;
    }


    this.sriLankanEmployees.removeAt(
      index
    );

  }


  /* =======================================================
     REMOVE CLOSE FAMILY MEMBER
  ======================================================= */

  removeCloseFamilyMember(
    index: number
  ): void {

    if (
      this.closeFamilyMembers.length <= 1
    ) {
      return;
    }


    this.closeFamilyMembers.removeAt(
      index
    );

  }


  /* =======================================================
     REQUIRED FIELD VALIDATION
  ======================================================= */

  requiredFieldInvalid(
    array: FormArray,
    index: number,
    controlName: string
  ): boolean {

    const control =
      array
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


  /* =======================================================
     CHECK WHETHER OPTIONAL ROW HAS DATA
  ======================================================= */

  private optionalRowHasValue(
    group: FormGroup
  ): boolean {

    const title =
      group.get('title')?.value;

    const firstName =
      group.get('firstName')?.value;

    const lastName =
      group.get('lastName')?.value;


    return Boolean(
      title ||
      firstName ||
      lastName
    );

  }


  /* =======================================================
     CHECK OPTIONAL ROW COMPLETENESS

     If completely empty:
       valid

     If user entered something:
       title + firstName + lastName are required
  ======================================================= */

  private optionalRowComplete(
    group: FormGroup
  ): boolean {

    if (
      !this.optionalRowHasValue(group)
    ) {

      return true;

    }


    const title =
      String(
        group.get('title')?.value ?? ''
      ).trim();


    const firstName =
      String(
        group.get('firstName')?.value ?? ''
      ).trim();


    const lastName =
      String(
        group.get('lastName')?.value ?? ''
      ).trim();


    return Boolean(
      title &&
      firstName &&
      lastName
    );

  }


  /* =======================================================
     OPTIONAL FIELD VALIDATION
  ======================================================= */

  optionalFieldInvalid(
    array: FormArray,
    index: number,
    controlName: string
  ): boolean {

    if (
      !this.formSubmitted
    ) {
      return false;
    }


    const control =
      array.at(index);


    if (
      !(control instanceof FormGroup)
    ) {
      return false;
    }


    if (
      !this.optionalRowHasValue(
        control
      )
    ) {

      return false;

    }


    const value =
      control.get(controlName)?.value;


    return (
      value === null ||
      value === undefined ||
      String(value).trim() === ''
    );

  }


  /* =======================================================
     CHECK ALL OPTIONAL ARRAYS
  ======================================================= */

  private optionalArraysComplete():
    boolean {

    const arrays: FormArray[] = [
      this.sriLankanDirectors,
      this.sriLankanEmployees,
      this.closeFamilyMembers
    ];


    for (
      const array of arrays
    ) {

      for (
        const control of array.controls
      ) {

        if (
          control instanceof FormGroup
        ) {

          if (
            !this.optionalRowComplete(
              control
            )
          ) {

            return false;

          }

        }

      }

    }


    return true;

  }


  /* =======================================================
     CONVERT FORM GROUP TO RELATED PERSON
  ======================================================= */

  private convertToRelatedPerson(
    control: AbstractControl
  ): RelatedPersonData {

    const group =
      control as FormGroup;


    return {

      title:
        String(
          group.get('title')?.value ?? ''
        ).trim(),

      firstName:
        String(
          group.get('firstName')?.value ?? ''
        ).trim(),

      lastName:
        String(
          group.get('lastName')?.value ?? ''
        ).trim()

    };

  }


  /* =======================================================
     CONVERT FORM GROUP TO ORGANIZATION DIRECTOR
  ======================================================= */

  private convertToOrganizationDirector(
    control: AbstractControl
  ): OrganizationDirectorData {

    const group =
      control as FormGroup;


    const rawShareholding =
      group.get(
        'shareholdingPercentage'
      )?.value;


    let shareholdingPercentage:
      number | null = null;


    if (
      rawShareholding !== null &&
      rawShareholding !== undefined &&
      rawShareholding !== ''
    ) {

      const convertedValue =
        Number(
          rawShareholding
        );


      if (
        !Number.isNaN(
          convertedValue
        )
      ) {

        shareholdingPercentage =
          convertedValue;

      }

    }


    return {

      title:
        String(
          group.get('title')?.value ?? ''
        ).trim(),

      firstName:
        String(
          group.get('firstName')?.value ?? ''
        ).trim(),

      lastName:
        String(
          group.get('lastName')?.value ?? ''
        ).trim(),

      designation:
        String(
          group.get('designation')?.value ?? ''
        ).trim(),

      shareholdingPercentage

    };

  }


  /* =======================================================
     CLEAN OPTIONAL ARRAY
  ======================================================= */

  private cleanOptionalArray(
    array: FormArray
  ): RelatedPersonData[] {

    const result:
      RelatedPersonData[] = [];


    for (
      const control of array.controls
    ) {

      if (
        !(control instanceof FormGroup)
      ) {
        continue;
      }


      if (
        !this.optionalRowHasValue(
          control
        )
      ) {
        continue;
      }


      const person =
        this.convertToRelatedPerson(
          control
        );


      result.push(
        person
      );

    }


    return result;

  }


  /* =======================================================
     BUILD ORGANIZATION DIRECTORS ARRAY
  ======================================================= */

  private getOrganizationDirectorData():
    OrganizationDirectorData[] {

    const result:
      OrganizationDirectorData[] = [];


    for (
      const control of
      this.organizationDirectors.controls
    ) {

      result.push(
        this.convertToOrganizationDirector(
          control
        )
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

    this.formSubmitted = true;


    this.directorsForm
      .markAllAsTouched();


    const optionalDataValid =
      this.optionalArraysComplete();


    if (
      this.directorsForm.invalid ||
      !optionalDataValid
    ) {

      return;

    }


    const organizationDirectors =
      this.getOrganizationDirectorData();


    const sriLankanDirectors =
      this.cleanOptionalArray(
        this.sriLankanDirectors
      );


    const sriLankanEmployees =
      this.cleanOptionalArray(
        this.sriLankanEmployees
      );


    const closeFamilyMembers =
      this.cleanOptionalArray(
        this.closeFamilyMembers
      );


    const payload:
      DirectorsDetailsPayload = {

      organizationDirectors,

      sriLankanDirectors,

      sriLankanEmployees,

      closeFamilyMembers

    };


    console.log(
      'Directors Details:',
      payload
    );


    this.saveDetails.emit(
      payload
    );

  }

}