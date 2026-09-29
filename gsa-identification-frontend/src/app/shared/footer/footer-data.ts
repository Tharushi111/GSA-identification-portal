export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSubSection {
  subHeading: string;
  links: FooterLink[];
}

export interface FooterSection {
  heading?: string;
  isMultiSection?: boolean;
  subSections?: FooterSubSection[];
  links?: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    heading: 'About Us',
    links: [
      { label: 'About SriLankan Airlines', url: 'https://www.srilankan.com/en_uk/Corporate/about-us' },
      { label: 'Awards and Accolades', url: 'https://www.srilankan.com/en_uk/Corporate/Awards' },
      { label: 'Right to Information Act', url: 'https://www.srilankan.com/en_uk/plan-and-book/right-to-information' },
      { label: 'Procurement and GSA notices', url: 'https://www.srilankan.com/en_uk/corporate/tender-notices' },
      { label: 'Advertise with us', url: 'https://www.srilankan.com/en_uk/Corporate/advertising-with-sriLankan' },
      { label: 'Media Center', url: 'https://www.srilankan.com/en_uk/Corporate/news' },
      { label: 'Sri Lanka Tourism', url: 'https://www.srilanka.travel/' },
      { label: 'Careers', url: 'https://careers.srilankan.com' },
    ],
  },
  {
    isMultiSection: true,
    subSections: [
      {
        subHeading: 'Direct Connect',
        links: [
          { label: 'Agent Registration', url: 'https://ndc.srilankan.com/' },
          { label: 'Supplier Registration', url: 'https://www.srilankan.com/SupplierRegisterPortal' },
        ],
      },
      {
        subHeading: 'Help',
        links: [
          { label: '24 Hours Contact Center', url: 'https://www.srilankan.com/en_uk/flying-with-us/contact-us' },
          { label: 'FAQs', url: 'https://www.srilankan.com/en_uk/Corporate/faq' },
        ],
      },
    ],
  },
  {
    heading: 'Terms & Conditions',
    links: [
      { label: 'Online Booking Terms of Use', url: 'https://www.srilankan.com/en_uk/plan-and-book/online-booking-terms-of-use' },
      { label: 'Conditions of Carriage', url: 'https://www.srilankan.com/en_uk/Corporate/conditions-of-carriage-for-passengers-and-baggage' },
      { label: 'Notices For Travel Agents', url: 'https://www.srilankan.com/en_uk/Corporate/booking-policy' },
      { label: 'Permission Center', url: 'https://www.srilankan.com/en_uk/Corporate/permission-center' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'MICE', url: 'https://www.srilankan.com/en_uk/Corporate/mice-about-us' },
      { label: 'Cargo', url: 'https://www.srilankancargo.com/' },
      { label: 'Training', url: 'https://www.srilankanaviationcollege.com/' },
      { label: 'Ground Handling', url: 'https://www.srilankan.com/ground-handling/welcome.htm' },
      { label: 'SriLankan Holidays', url: 'https://www.srilankanholidays.com/' },
      { label: 'SriLankan Catering', url: 'https://www.srilankancatering.com/' },
    ],
  },
];

export const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    iconClass: 'fa-brands fa-facebook-f',
    url: 'https://www.facebook.com/flysrilankan/'
  },
  {
    label: 'LinkedIn',
    iconClass: 'fa-brands fa-linkedin-in',
    url: 'https://lk.linkedin.com/company/srilankan-airlines-official'
  },
  {
    label: 'YouTube',
    iconClass: 'fa-brands fa-youtube',
    url: 'https://www.youtube.com/channel/UCU_e10UGVQS8JikgDpwvdag'
  },
  {
    label: 'X',
    iconClass: 'fa-brands fa-x-twitter',
    url: 'https://twitter.com/flysrilankan'
  },
  {
    label: 'Instagram',
    iconClass: 'fa-brands fa-instagram',
    url: 'https://instagram.com/srilankanairlinesofficial'
  },
  {
    label: 'TikTok',
    iconClass: 'fa-brands fa-tiktok',
    url: 'https://www.tiktok.com/@flysrilankan'
  }
];
