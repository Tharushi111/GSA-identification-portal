import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { ForgotPassword } from './auth/forgot-password/forgot-password';

import { Profile } from './profile/profile';
import { Applications } from './applications/applications';

import { ApplicationLayout } from './application/application-layout/application-layout';
import { CompanyIdentification } from './application/company-identification/company-identification';
import { GeneralInformation } from './application/general-information/general-information';
import { OwnershipStructure } from './application/ownership-structure/ownership-structure';
import { FinancialInformation } from './application/financial-information/financial-information';
import { PremisesInformation } from './application/premises-information/premises-information';
import { OtherInformation } from './application/other-information/other-information';
import { DocumentUpload } from './application/document-upload/document-upload';
import { DeclarationReview } from './application/declaration-review/declaration-review';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'forgot-password',
    component: ForgotPassword
  },

  {
    path: 'profile',
    component: Profile
  },

  {
    path: 'applications',
    component: Applications
  },

  {
    path: 'application',
    component: ApplicationLayout,

    children: [

      {
        path: '',
        redirectTo: 'company-identification',
        pathMatch: 'full'
      },

      {
        path: 'company-identification',
        component: CompanyIdentification
      },

      {
        path: 'general-information',
        component: GeneralInformation
      },

      {
        path: 'ownership-structure',
        component: OwnershipStructure
      },

      {
        path: 'financial-information',
        component: FinancialInformation
      },

      {
        path: 'premises-information',
        component: PremisesInformation
      },

      {
        path: 'other-information',
        component: OtherInformation
      },

      {
        path: 'document-upload',
        component: DocumentUpload
      },

      {
        path: 'declaration-review',
        component: DeclarationReview
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];