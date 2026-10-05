import { Component } from '@angular/core';
import { Router } from '@angular/router';


/* ==========================================
   TYPES
=============================================*/

export interface UploadedDocumentFile {
  id: string;
  file: File;
  fileName: string;
  fileSize: number;
  fileSizeLabel: string;
}


export interface DocumentUploadItem {
  id: string;
  title: string;
  required: boolean;
  description?: string;
  uploadedFiles: UploadedDocumentFile[];
}


export interface AuditedYearDocument {
  year: number;
  file: UploadedDocumentFile | null;
}


@Component({
  selector: 'app-document-upload',

  imports: [],

  templateUrl: './document-upload.html',
  styleUrl: './document-upload.css'
})
export class DocumentUpload {

  /* =========================================================
     SETTINGS
  ========================================================= */

  readonly maximumFileSizeBytes =
    5 * 1024 * 1024;

  readonly maximumFileSizeLabel =
    '5MB';


  /* =========================================================
     PAGE STATE
  ========================================================= */

  formSubmitted = false;

  showMessageModal = false;

  messageModalTitle = '';

  messageModalMessage = '';

  messageModalType:
    'error' |
    'success' |
    'warning' = 'error';


  /* =========================================================
     DOCUMENT TYPES

     All normal categories allow multiple PDFs,
     but the user selects ONE file per upload action.

     Operating Model Documentary Proof remains optional.
  ========================================================= */

  documents: DocumentUploadItem[] = [

    {
      id: 'memorandum',
      title: 'Memorandum',
      required: true,
      uploadedFiles: []
    },

    {
      id: 'articles-of-association',
      title: 'Articles of association',
      required: true,
      uploadedFiles: []
    },

    {
      id: 'certificate-of-incorporation',
      title: 'Certificate of incorporation',
      required: true,
      uploadedFiles: []
    },

    {
      id: 'business-registration',
      title: 'Business registration',
      required: true,
      uploadedFiles: []
    },

    {
      id: 'audit-report',
      title: 'Audit report',
      required: true,
      uploadedFiles: []
    },

    {
      id: 'deed-of-partnership',
      title: 'Deed of partnership',
      required: false,
      uploadedFiles: []
    },

    {
      id: 'bank-references',
      title: 'Bank references',
      required: false,
      uploadedFiles: []
    },

    {
      id: 'letter-of-guarantee',
      title:
        'Letter of guarantee (If the applicant\'s experience is less than five years)',
      required: false,
      uploadedFiles: []
    },

    {
      id: 'reference-other-airlines',
      title: 'Reference letters from other airlines',
      required: false,
      uploadedFiles: []
    },

    {
      id: 'reference-business-partners',
      title: 'Reference letters from business partners',
      required: false,
      uploadedFiles: []
    },

    {
      id: 'operating-model-proof',
      title: 'Documentary proof for the operating model',
      required: false,
      uploadedFiles: []
    },

    {
      id: 'other-relevant-document',
      title: 'Any other relevant document',
      required: false,
      uploadedFiles: []
    }

  ];


  /* =========================================================
     AUDITED FINANCIAL STATEMENTS

     Automatically gives:
     current year - 1
     current year - 2
     current year - 3

     In 2026:
     2025 / 2024 / 2023
  ========================================================= */

  auditedFinancialYears:
    AuditedYearDocument[] = [];


  constructor(
    private router: Router
  ) {

    const currentYear =
      new Date().getFullYear();


    this.auditedFinancialYears = [

      {
        year: currentYear - 1,
        file: null
      },

      {
        year: currentYear - 2,
        file: null
      },

      {
        year: currentYear - 3,
        file: null
      }

    ];

  }


  /* =========================================================
     FIND DOCUMENT
  ========================================================= */

  private getDocumentById(
    documentId: string
  ): DocumentUploadItem | undefined {

    return this.documents.find(
      document =>
        document.id === documentId
    );

  }


  /* =========================================================
     NORMAL DOCUMENT FILE SELECT
  ========================================================= */

  onDocumentFileSelected(
    event: Event,
    documentId: string
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    /*
      We intentionally take only ONE file.

      There is no "multiple" attribute in the HTML.

      This means multiple documents can be added
      to a category, but they are sent/selected
      one at a time.
    */

    const file =
      input.files[0];


    const document =
      this.getDocumentById(
        documentId
      );


    if (!document) {

      input.value = '';

      return;

    }


    if (
      !this.validatePdfFile(
        file
      )
    ) {

      input.value = '';

      return;

    }


    if (
      this.fileAlreadyExists(
        document.uploadedFiles,
        file
      )
    ) {

      this.openMessageModal(
        'Duplicate Document',
        'This document has already been added to this category.',
        'warning'
      );

      input.value = '';

      return;

    }


    const uploadedFile =
      this.createUploadedFile(
        file
      );


    document.uploadedFiles.push(
      uploadedFile
    );


    /*
      Clear the input so the same file can
      be selected again later if the user
      removes it.
    */

    input.value = '';

  }


  /* =========================================================
     AUDITED YEAR FILE SELECT
  ========================================================= */

  onAuditedFileSelected(
    event: Event,
    year: number
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


    if (
      !this.validatePdfFile(
        file
      )
    ) {

      input.value = '';

      return;

    }


    const yearItem =
      this.auditedFinancialYears.find(
        item =>
          item.year === year
      );


    if (!yearItem) {

      input.value = '';

      return;

    }


    yearItem.file =
      this.createUploadedFile(
        file
      );


    input.value = '';

  }


  /* =========================================================
     VALIDATE PDF
  ========================================================= */

  private validatePdfFile(
    file: File
  ): boolean {

    const extension =
      file.name
        .split('.')
        .pop()
        ?.toLowerCase();


    const isPdf =
      file.type === 'application/pdf' ||
      extension === 'pdf';


    if (!isPdf) {

      this.openMessageModal(
        'Invalid File Type',
        'Only PDF documents are accepted. Please select a valid PDF file.',
        'error'
      );

      return false;

    }


    if (
      file.size >
      this.maximumFileSizeBytes
    ) {

      this.openMessageModal(
        'File Too Large',
        `The selected document exceeds the maximum file size of ${this.maximumFileSizeLabel}.`,
        'error'
      );

      return false;

    }


    return true;

  }


  /* =========================================================
     DUPLICATE CHECK
  ========================================================= */

  private fileAlreadyExists(
    files: UploadedDocumentFile[],
    newFile: File
  ): boolean {

    return files.some(
      uploadedFile =>
        uploadedFile.fileName ===
          newFile.name &&
        uploadedFile.fileSize ===
          newFile.size
    );

  }


  /* =========================================================
     CREATE UPLOADED FILE MODEL
  ========================================================= */

  private createUploadedFile(
    file: File
  ): UploadedDocumentFile {

    return {

      id:
        this.generateFileId(),

      file,

      fileName:
        file.name,

      fileSize:
        file.size,

      fileSizeLabel:
        this.formatFileSize(
          file.size
        )

    };

  }


  /* =========================================================
     FILE ID
  ========================================================= */

  private generateFileId():
    string {

    return (
      Date.now().toString() +
      '-' +
      Math.random()
        .toString(36)
        .substring(2, 10)
    );

  }


  /* =========================================================
     FORMAT FILE SIZE
  ========================================================= */

  private formatFileSize(
    bytes: number
  ): string {

    if (
      bytes < 1024
    ) {

      return `${bytes} B`;

    }


    const kilobytes =
      bytes / 1024;


    if (
      kilobytes < 1024
    ) {

      return `${kilobytes.toFixed(1)} KB`;

    }


    const megabytes =
      kilobytes / 1024;


    return `${megabytes.toFixed(2)} MB`;

  }


  /* =========================================================
     REMOVE NORMAL DOCUMENT
  ========================================================= */

  removeDocumentFile(
    documentId: string,
    fileId: string
  ): void {

    const document =
      this.getDocumentById(
        documentId
      );


    if (!document) {
      return;
    }


    const fileIndex =
      document.uploadedFiles
        .findIndex(
          uploadedFile =>
            uploadedFile.id ===
            fileId
        );


    if (
      fileIndex !== -1
    ) {

      document.uploadedFiles.splice(
        fileIndex,
        1
      );

    }

  }


  /* =========================================================
     REMOVE AUDITED YEAR FILE
  ========================================================= */

  removeAuditedFile(
    year: number
  ): void {

    const yearItem =
      this.auditedFinancialYears.find(
        item =>
          item.year === year
      );


    if (!yearItem) {
      return;
    }


    yearItem.file = null;

  }


  /* =========================================================
     OPEN FILE
  ========================================================= */

  openFile(
    uploadedFile:
      UploadedDocumentFile
  ): void {

    const url =
      URL.createObjectURL(
        uploadedFile.file
      );


    window.open(
      url,
      '_blank'
    );


    setTimeout(
      () => {

        URL.revokeObjectURL(
          url
        );

      },
      1000
    );

  }


  /* =========================================================
     NORMAL DOCUMENT COUNT
  ========================================================= */

  getDocumentCount(
    document:
      DocumentUploadItem
  ): number {

    return document
      .uploadedFiles
      .length;

  }


  /* =========================================================
     REQUIRED NORMAL DOC VALIDATION
  ========================================================= */

  documentInvalid(
    document:
      DocumentUploadItem
  ): boolean {

    return (
      this.formSubmitted &&
      document.required &&
      document.uploadedFiles.length === 0
    );

  }


  /* =========================================================
     NORMAL CATEGORY COMPLETED
  ========================================================= */

  documentComplete(
    document:
      DocumentUploadItem
  ): boolean {

    return (
      document.uploadedFiles.length > 0
    );

  }


  /* =========================================================
     AUDITED SECTION VALID
  ========================================================= */

  auditedSectionInvalid():
    boolean {

    return (
      this.formSubmitted &&
      this.auditedFinancialYears.some(
        item =>
          item.file === null
      )
    );

  }


  /* =========================================================
     AUDITED COMPLETE COUNT
  ========================================================= */

  get auditedUploadedCount():
    number {

    let count = 0;


    for (
      const item of
      this.auditedFinancialYears
    ) {

      if (
        item.file !== null
      ) {

        count++;

      }

    }


    return count;

  }


  /* =========================================================
     TOTAL UPLOADED DOCUMENT COUNT
  ========================================================= */

  get totalUploadedDocuments():
    number {

    let count = 0;


    for (
      const document of
      this.documents
    ) {

      count +=
        document
          .uploadedFiles
          .length;

    }


    count +=
      this.auditedUploadedCount;


    return count;

  }


  /* =========================================================
     ALL REQUIRED NORMAL DOCS COMPLETE
  ========================================================= */

  private requiredDocumentsComplete():
    boolean {

    return this.documents
      .filter(
        document =>
          document.required
      )
      .every(
        document =>
          document.uploadedFiles
            .length > 0
      );

  }


  /* =========================================================
     ALL AUDITED YEARS COMPLETE
  ========================================================= */

  private auditedDocumentsComplete():
    boolean {

    return this.auditedFinancialYears
      .every(
        yearItem =>
          yearItem.file !== null
      );

  }


  /* =========================================================
     MESSAGE MODAL
  ========================================================= */

  private openMessageModal(
    title: string,
    message: string,
    type:
      'error' |
      'success' |
      'warning'
  ): void {

    this.messageModalTitle =
      title;

    this.messageModalMessage =
      message;

    this.messageModalType =
      type;

    this.showMessageModal =
      true;

  }


  closeMessageModal(): void {

    this.showMessageModal =
      false;

  }


  /* =========================================================
     PREVIOUS
  ========================================================= */

  goPrevious(): void {

    this.router.navigate([
      '/application/other-information'
    ]);

  }


  /* =========================================================
     NEXT
  ========================================================= */

  goNext(): void {

    this.formSubmitted =
      true;


    const normalRequiredComplete =
      this.requiredDocumentsComplete();


    const auditedComplete =
      this.auditedDocumentsComplete();


    if (
      !normalRequiredComplete ||
      !auditedComplete
    ) {

      this.openMessageModal(
        'Required Documents Missing',
        'Please upload all required documents highlighted in red before continuing to the Declaration & Review section.',
        'error'
      );


      setTimeout(
        () => {

          const firstInvalid =
            document.querySelector(
              '.document-row-invalid, .audited-section-invalid'
            ) as HTMLElement | null;


          firstInvalid?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });

        },
        150
      );


      return;

    }


    /*
      BUILD FRONTEND PAYLOAD

      IMPORTANT:
      File objects should later be uploaded to
      ASP.NET Core one-by-one using FormData.

      Do NOT send all physical files as one huge request.
    */

    const normalDocumentsPayload =
      this.documents.map(
        document => ({

          documentType:
            document.id,

          files:
            document.uploadedFiles.map(
              uploadedFile => ({

                fileName:
                  uploadedFile.fileName,

                fileSize:
                  uploadedFile.fileSize,

                file:
                  uploadedFile.file

              })
            )

        })
      );


    const auditedStatementsPayload =
      this.auditedFinancialYears.map(
        yearDocument => ({

          year:
            yearDocument.year,

          file:
            yearDocument.file?.file ?? null

        })
      );


    console.log(
      'Normal Documents:',
      normalDocumentsPayload
    );


    console.log(
      'Audited Financial Statements:',
      auditedStatementsPayload
    );


    /*
      BACKEND LATER

      Recommended flow:

      1. Save application/document metadata.

      2. Upload each PDF individually:

         POST
         /api/applications/{applicationId}/documents

         FormData:
         - documentTypeId
         - documentYear
         - file

      3. Wait for response.

      4. Upload next file.

      This matches supervisor requirement
      to avoid sending many files together.
    */


    this.router.navigate([
      '/application/declaration-review'
    ]);

  }

}