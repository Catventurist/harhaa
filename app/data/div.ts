import type { ButtonProps, NavigationMenuItem } from '@nuxt/ui'

export const headerTitle = 'United in Diversion'

export const headerLinks: NavigationMenuItem[] = [
  {
    label: 'Institutions',
    icon: 'i-lucide-landmark',
    children: [
      { label: 'Committees', to: '/committees', icon: 'i-lucide-users', description: 'Submit a matter for deliberation.' },
      { label: 'Voting Chamber-', to: '/chamber', icon: 'i-lucide-vote', description: 'One set of ballots, five methods.' },
      { label: 'Eucracy', to: '/eucracy', icon: 'i-lucide-building-2', description: 'Who controls what.' }
    ]
  },
  {
    label: 'Procedure',
    icon: 'i-lucide-list-checks',
    children: [
      { label: 'Begin application', to: '/apply', icon: 'i-lucide-file-plus', description: 'Fourteen steps.' },
      { label: 'Status of your request', to: '/status', icon: 'i-lucide-search', description: 'Estimated decision: 2041.' },
      { label: 'Appeals', to: '/appeals', icon: 'i-lucide-gavel', description: 'Seven instances.' }
    ]
  },
  {
    label: 'Forms',
    icon: 'i-lucide-files',
    children: [
      { label: 'Application', to: '/forms', icon: 'i-lucide-file-text', description: 'Complete it. Watch it go.' },
      { label: 'Contact', to: '/contact', icon: 'i-lucide-mail', description: 'We have no details.' },
      { label: 'Redactor', to: '/redactor', icon: 'i-lucide-shield-ellipsis', description: 'Censor words and sentences.' }
    ]
  },
  {
    label: 'Legal',
    icon: 'i-lucide-scale',
    children: [
      { label: 'Small print', to: '/appterms', icon: 'i-lucide-file-text', description: 'Reading in full is not required.' },
      { label: 'Cookie preferences', to: '/cookies', icon: 'i-lucide-cookie', description: 'Noted and ignored.' },
      { label: 'Accessibility', to: '/accessibility', icon: 'i-lucide-accessibility', description: 'Text size and motion.' }
    ]
  },
  {
    label: 'Research',
    icon: 'i-lucide-flask-conical',
    children: [
      { label: 'Tests', to: '/test', icon: 'i-lucide-test-tube', description: 'See what you know.' },
      { label: 'Terms', to: '/terms', icon: 'i-lucide-book-a', description: 'Official language, translated.' },
      { label: 'Compare-', to: '/terms/compare', icon: 'i-lucide-table-2', description: 'Same words, other regimes.' },
      { label: 'About', to: '/about', icon: 'i-lucide-info', description: 'See what lies beneath.' }
    ]
  }
]

export const headerActions = {
  label: 'Begin application',
  to: '/apply',
  icon: 'i-lucide-arrow-right'
}

export interface FooterLink {
  label: string
  to: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterSocial {
  label: string
  icon: string
  to: string
}

export const footerBrand = {
  title: 'United in Diversion',
  tagline: 'The official motto, revised for accuracy.'
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Institutions',
    links: [
      { label: 'Committees', to: '/committees' },
      { label: 'Voting Chamber', to: '/chamber' },
      { label: 'Eucracy', to: '/eucracy' }
    ]
  },
  {
    title: 'Procedure',
    links: [
      { label: 'Begin application', to: '/apply' },
      { label: 'Status of your request', to: '/status' },
      { label: 'Appeals', to: '/appeals' }
    ]
  },
  {
    title: 'Forms',
    links: [
      { label: 'Submit', to: '/forms' },
      { label: 'Contact', to: '/contact' },
      { label: 'Redactor', to: '/redactor' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Small print', to: '/appterms' },
      { label: 'Cookie preferences', to: '/cookies' },
      { label: 'Accessibility', to: '/accessibility' }
    ]
  },
  {
    title: 'Research',
    links: [
      { label: 'Tests', to: '/test' },
      { label: 'Terms', to: '/terms' },
      { label: 'About', to: '/about' }
    ]
  }
]

export const footerSocials: FooterSocial[] = [
  { label: 'GitHub', icon: 'i-social-github', to: 'https://github.com/Catventurist' },
  { label: 'Contact', icon: 'i-social-telegram', to: 'https://t.me/harhaa' },
  { label: 'RSS', icon: 'i-lucide-rss', to: '/rss.xml' }
]

export const footerNotice = 'Your existence is important to us. All is Satire'

export interface FooterLanguage {
  label: string
  value: string
  native: string
}

export const footerLanguages: FooterLanguage[] = [
  { value: 'bg', label: 'Bulgarian', native: 'Български' },
  { value: 'hr', label: 'Croatian', native: 'Hrvatski' },
  { value: 'cs', label: 'Czech', native: 'Čeština' },
  { value: 'da', label: 'Danish', native: 'Dansk' },
  { value: 'nl', label: 'Dutch', native: 'Nederlands' },
  { value: 'en', label: 'English', native: 'English' },
  { value: 'et', label: 'Estonian', native: 'Eesti' },
  { value: 'fi', label: 'Finnish', native: 'Suomi' },
  { value: 'fr', label: 'French', native: 'Français' },
  { value: 'de', label: 'German', native: 'Deutsch' },
  { value: 'el', label: 'Greek', native: 'Ελληνικά' },
  { value: 'hu', label: 'Hungarian', native: 'Magyar' },
  { value: 'ga', label: 'Irish', native: 'Gaeilge' },
  { value: 'it', label: 'Italian', native: 'Italiano' },
  { value: 'lv', label: 'Latvian', native: 'Latviešu' },
  { value: 'lt', label: 'Lithuanian', native: 'Lietuvių' },
  { value: 'mt', label: 'Maltese', native: 'Malti' },
  { value: 'pl', label: 'Polish', native: 'Polski' },
  { value: 'pt', label: 'Portuguese', native: 'Português' },
  { value: 'ro', label: 'Romanian', native: 'Română' },
  { value: 'sk', label: 'Slovak', native: 'Slovenčina' },
  { value: 'sl', label: 'Slovenian', native: 'Slovenščina' },
  { value: 'es', label: 'Spanish', native: 'Español' },
  { value: 'sv', label: 'Swedish', native: 'Svenska' }
]

export const footerLanguageDefault = 'en'

export const aboutLinks: ButtonProps[] = [
  {
    label: 'Get in touch',
    to: 'https://t.me/harhaa',
    target: '_blank',
    icon: 'i-social-telegram',
    color: 'info',
    size: 'xl'
  },
  {
    label: 'GitHub',
    to: 'https://github.com/Catventurist',
    target: '_blank',
    icon: 'i-social-github',
    color: 'neutral',
    variant: 'subtle',
    size: 'xl'
  }
]

export interface Language {
  label: string
  onsets: string[]
  nuclei: string[]
  codas: string[]
  particles: string[]
  suffixes: string[]
}

export const languages = {
  germanic: {
    label: 'Germanic',
    onsets: ['b', 'd', 'g', 'k', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z', 'sch', 'st', 'sp', 'gr', 'kl', 'tr', 'pf'],
    nuclei: ['a', 'e', 'i', 'o', 'u', 'ei', 'au', 'ie', 'ü', 'ö'],
    codas: ['', 'n', 'r', 's', 't', 'ch', 'nd', 'rt', 'ft', 'ng'],
    particles: ['der', 'von', 'zur', 'und', 'bei', 'mit', 'über'],
    suffixes: ['ung', 'keit', 'schaft', 'lich', 'ismus', 'ment']
  },
  romance: {
    label: 'Romance',
    onsets: ['b', 'c', 'd', 'f', 'g', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'qu', 'ch', 'gl', 'pr', 'tr', 'br'],
    nuclei: ['a', 'e', 'i', 'o', 'u', 'ia', 'io', 'ue', 'ai', 'ou'],
    codas: ['', '', '', 'n', 's', 'r', 'l', 'nt'],
    particles: ['de', 'la', 'le', 'del', 'per', 'con', 'ad', 'sub'],
    suffixes: ['zione', 'ità', 'ement', 'ario', 'ismo', 'ante', 'ción']
  },
  nordic: {
    label: 'Nordic',
    onsets: ['b', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'sk', 'st', 'fj', 'bj', 'hj', 'tj'],
    nuclei: ['a', 'e', 'i', 'o', 'u', 'y', 'å', 'ä', 'ö', 'ø', 'æ'],
    codas: ['', 'r', 'n', 'l', 'k', 't', 'ng', 'rk', 'st', 'ld'],
    particles: ['av', 'och', 'til', 'for', 'med', 'på', 'om', 'ved'],
    suffixes: ['het', 'else', 'skap', 'ande', 'ning', 'lig', 'ström']
  },
  slavic: {
    label: 'Slavic-ish',
    onsets: ['b', 'd', 'g', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'z', 'zh', 'sh', 'ch', 'br', 'dr', 'kr', 'st', 'zv', 'pr', 'sl'],
    nuclei: ['a', 'e', 'i', 'o', 'u', 'y', 'ia', 'ej', 'ov', 'ie'],
    codas: ['', 'n', 'v', 'k', 'sk', 'st', 'zh', 'ch', 'rd', 'l'],
    particles: ['za', 'na', 'pro', 'ot', 'pri', 'po', 'i', 'ne'],
    suffixes: ['ost', 'ovič', 'ska', 'enie', 'ovo', 'nik', 'tsiya']
  }
} satisfies Record<string, Language>

export type LanguageId = keyof typeof languages

export interface TechItem {
  name: string
  label: string
  role: string
  url: string
}

export const techStack: TechItem[] = [
  { name: 'nuxt', label: 'Nuxt', role: 'Framework', url: 'https://nuxt.com' },
  { name: 'typescript', label: 'TypeScript', role: 'Language', url: 'https://www.typescriptlang.org' },
  { name: 'tailwind', label: 'Tailwind CSS', role: 'Styling', url: 'https://tailwindcss.com' },
  { name: 'reka', label: 'Reka UI', role: 'Primitives', url: 'https://reka-ui.com' },
  { name: 'motionvue', label: 'Motion', role: 'Animation', url: 'https://motion.dev/docs/vue' },
  { name: 'zod', label: 'Zod', role: 'Validation', url: 'https://zod.dev' },
  { name: 'vercel', label: 'Vercel', role: 'Hosting', url: 'https://vercel.com' },
  { name: 'github', label: 'GitHub', role: 'Source', url: 'https://github.com' }
]

export const stamps = [
  'Provisional',
  'Pending Review',
  'Subject to Amendment',
  'Non-binding',
  'Under Consultation'
]

export const committees = [
  'Committee for the Harmonisation of Further Committees',
  'Subcommittee on Procedural Preliminaries',
  'Working Group on the Scheduling of Working Groups',
  'Directorate for Matters Not Yet Classified',
  'Standing Panel on Temporary Measures'
]

export const rapporteurs = ['Dr. Ilse Vandermeulen', 'M. Aurélien Duchêne', 'Sig.ra Chiara Bellandi', 'Mr. Padraig Ó Súilleabháin', 'Fru Astrid Lindqvist']

export type MethodId = 'plurality' | 'runoff' | 'borda' | 'approval' | 'condorcet'

export const methods: Record<MethodId, { label: string, icon: string, description: string }> = {
  plurality: {
    label: 'Plurality',
    icon: 'i-lucide-mouse-pointer-click',
    description: 'Only first choices count. The most first-place votes wins.'
  },
  runoff: {
    label: 'Ranked runoff',
    icon: 'i-lucide-layers',
    description: 'The weakest option is eliminated each round and its ballots move to their next choice, until one has a majority.'
  },
  borda: {
    label: 'Borda count',
    icon: 'i-lucide-list-ordered',
    description: 'Points by rank: the top choice earns the most, unranked options earn nothing.'
  },
  approval: {
    label: 'Approval',
    icon: 'i-lucide-thumbs-up',
    description: 'Every option listed on a ballot is approved. The most approved wins.'
  },
  condorcet: {
    label: 'Condorcet / Copeland',
    icon: 'i-lucide-swords',
    description: 'Head-to-head contests. A Condorcet winner beats every other option; otherwise scores count pairwise wins.'
  }
}

export const methodIds = Object.keys(methods) as MethodId[]

export const sampleBallots = `12: Alice > Bob > Carol
9: Bob > Carol > Alice
7: Carol > Bob > Alice
5: Alice > Carol
3: Bob`

export const palette = [
  'var(--swatch-blue)',
  'var(--swatch-amber)',
  'var(--swatch-rose)',
  'var(--swatch-green)',
  'var(--swatch-violet)',
  'var(--swatch-orange)',
  'var(--swatch-sky)',
  'var(--swatch-emerald)',
  'var(--swatch-indigo)'
]

export interface Competence {
  id: string
  title: string
  article: string
  icon: string
  accent: string
  control: number
  intro: string
  items: string[]
  reality?: string
}

export const eucracyIntro = {
  title: 'Eucracy',
  description: 'What the EU actually controls, what it shares, and what it only nominally cannot touch.'
}

export const competences: Competence[] = [
  {
    id: 'exclusive',
    title: 'What the EU actually controls',
    article: 'Exclusive competence, Art. 3 TFEU',
    icon: 'i-lucide-lock',
    accent: 'var(--swatch-rose)',
    control: 100,
    intro: 'Member states cannot legislate here. Full stop.',
    items: [
      'Customs union / tariffs',
      'Competition rules for the internal market',
      'Monetary policy (eurozone)',
      'Conservation of marine biological resources (CFP)',
      'Common commercial policy (all trade agreements)',
      'Conclusion of international agreements that affect common rules'
    ]
  },
  {
    id: 'shared',
    title: 'What the EU co-controls',
    article: 'Shared competence, Art. 4 TFEU',
    icon: 'i-lucide-handshake',
    accent: 'var(--swatch-orange)',
    control: 80,
    intro: 'The EU legislates. Member states can legislate where the EU hasn\'t, but the EU has legislated so thoroughly in most of these areas that "where it hasn\'t" is a theoretical remnant.',
    items: [
      'Internal market (free movement of goods, services, capital, people)',
      'Social policy (limited aspects)',
      'Economic, social and territorial cohesion',
      'Agriculture (CAP)',
      'Environment',
      'Consumer protection',
      'Transport',
      'Trans-European networks',
      'Energy',
      'Freedom, security and justice (asylum, immigration, borders, judicial cooperation)',
      'Public health (protection aspects)'
    ],
    reality: '"Shared" means "EU legislates first, you fill in the gaps." The gaps are mostly gone. What\'s left is implementation, which means writing national transposition laws that restate the directive in your language.'
  },
  {
    id: 'supporting',
    title: 'What the EU nominally can\'t touch',
    article: 'Supporting competence, Art. 6 TFEU',
    icon: 'i-lucide-hand-helping',
    accent: 'var(--swatch-amber)',
    control: 70,
    intro: 'The EU can only "support, coordinate or supplement." No harmonisation. No legally binding acts that require alignment of national laws.',
    items: [
      'Protection and improvement of human health',
      'Industry',
      'Culture',
      'Tourism',
      'Education, vocational training, youth, sport',
      'Civil protection',
      'Administrative cooperation'
    ],
    reality: '"Support" means funding conditional on compliance. Erasmus+ requires Bologna alignment to get the money. The MDR is technically "shared" (the public health protection aspect), not "supporting." The line between "supporting" and "shared" is drawn by the Commission, and it keeps moving toward "shared."'
  },
  {
    id: 'none',
    title: 'What the EU cannot do in paper',
    article: 'Outside the Treaties',
    icon: 'i-lucide-ban',
    accent: 'var(--swatch-green)',
    control: 60,
    intro: 'Areas that remain somewhat national, with exceptions.',
    items: [
      'Write your criminal code (minimum sanctions for specific cross-border offences)',
      'Set your income tax (VAT is a directive, but income and corporate tax rates are national, except the Pillar Two minimum)',
      'Control your military (NATO does that; CSDP is a joke)',
      'Set your language policy',
      'Control your constitution',
      'Set your voting age',
      'Legislate on culture, tourism, sport, education (in theory)'
    ]
  }
]

export const supremacy = {
  title: 'The supremacy question',
  subtitle: 'The actual power dynamic',
  positions: [
    {
      side: 'CJEU',
      icon: 'i-lucide-scale',
      accent: 'var(--swatch-blue)',
      text: 'EU law is supreme over everything, including constitutions. Period.',
      detail: 'C-448/23, Dec 2025: national courts must "disregard" their own constitutional court\'s ruling if it conflicts with EU law.'
    },
    {
      side: 'National constitutional courts',
      icon: 'i-lucide-landmark',
      accent: 'var(--swatch-violet)',
      text: 'No.',
      detail: 'Germany, Poland, Czechia, Romania, Denmark, Spain, France, Croatia, Slovakia: all have said some version of "our constitution is the final word."'
    }
  ],
  slovakia: 'Slovakia, Sept 2025: passed a constitutional amendment explicitly giving national law precedence over EU law on "national identity" matters. The Commission launched infringement proceedings.',
  practice: 'In practice, EU law wins, because enforcement is one-directional. The Commission can fine you, the CJEU can rule against you, and Article 7 can suspend your voting rights. You cannot fine the Commission. You cannot overrule the CJEU. The "sovereignty" of a national constitutional court is only as strong as the political will to accept the fines.'
}

export const eucracySummary = {
  title: 'The honest summary',
  text: 'The EU is not a state. It is not a confederation. It is a regulatory supranational body with exclusive competence over the economic sphere, shared competence over most of the rest, and a one-directional enforcement mechanism that makes "resistance" expensive but not impossible.'
}

export const procedureLinks = [
  { label: 'Begin application', to: '/apply', icon: 'i-lucide-file-plus' },
  { label: 'Status of your request', to: '/status', icon: 'i-lucide-search' },
  { label: 'Appeals', to: '/appeals', icon: 'i-lucide-gavel' }
]

export const applySteps = [
  { title: 'Identify yourself', description: 'Provide a document proving that you are who you say you are.', icon: 'i-lucide-id-card' },
  { title: 'Identify the form', description: 'Select the form you need. The form for selecting forms is Form 1A.', icon: 'i-lucide-files' },
  { title: 'State your purpose', description: 'Describe your request in no more than 140 characters.', icon: 'i-lucide-pen-line' },
  { title: 'Attach supporting documents', description: 'All documents must be certified, translated and notarised.', icon: 'i-lucide-paperclip' },
  { title: 'Pay the processing fee', description: 'The fee is refundable on request. Requests are not processed.', icon: 'i-lucide-coins' },
  { title: 'Select a language', description: 'One of twenty-four. Translation will be provided later.', icon: 'i-lucide-languages' },
  { title: 'Consult a committee', description: 'You will be referred to the relevant committee.', icon: 'i-lucide-users' },
  { title: 'Wait', description: 'Estimated waiting time: a temporary measure.', icon: 'i-lucide-hourglass' },
  { title: 'Receive acknowledgement', description: 'An acknowledgement of receipt of your acknowledgement request.', icon: 'i-lucide-mail-check' },
  { title: 'Receive a request for more information', description: 'The request is supplied with a reference to Form 27B/6.', icon: 'i-lucide-mail-question' },
  { title: 'Provide more information', description: 'Return to step 4 if the information is incomplete.', icon: 'i-lucide-undo-2' },
  { title: 'Undergo review', description: 'The review is carried out by the body that issued the request.', icon: 'i-lucide-scan-search' },
  { title: 'Receive a decision', description: 'The decision is final, subject to appeal.', icon: 'i-lucide-stamp' },
  { title: 'Begin application', description: 'Your application has been accepted. Please begin your application.', icon: 'i-lucide-repeat' }
]

export const statusMessages = [
  { label: 'Received', color: 'neutral', note: 'Your request has been received. Receipt has not been acknowledged.' },
  { label: 'Under review', color: 'info', note: 'Your request is being reviewed by the body that will review the review.' },
  { label: 'Awaiting information', color: 'warning', note: 'We have asked you for information. You were not notified.' },
  { label: 'Referred to committee', color: 'secondary', note: 'The committee will meet when its members are available.' },
  { label: 'Pending', color: 'warning', note: 'Pending since the time of submission.' },
  { label: 'Closed', color: 'success', note: 'Closed. Reopening requires a new application.' }
] as const

export const statusPlaceholder = 'Reference number, e.g. COM(2031) 0847/12B'

export const appealGrounds = [
  { label: 'The decision was wrong', value: 'wrong' },
  { label: 'There was no decision', value: 'none' },
  { label: 'The decision was correct but unwelcome', value: 'unwelcome' },
  { label: 'I do not understand the decision', value: 'unclear' },
  { label: 'Other (please state which form)', value: 'other' }
]

export const appealLevels = [
  'First instance',
  'Administrative review',
  'Review of the review',
  'Internal committee',
  'Joint committee',
  'Ad hoc working group',
  'Final decision (return to first instance)'
] as const

export const legalLinks = [
  { label: 'Small print', to: '/appterms', icon: 'i-lucide-search' },
  { label: 'Cookie preferences', to: '/cookies', icon: 'i-lucide-cookie' },
  { label: 'Accessibility', to: '/accessibility', icon: 'i-lucide-accessibility' }
]

export const smallPrint = {
  title: 'Small print',
  description: 'Please read in full. Reading in full is not required.',
  clauses: [
    { icon: 'i-lucide-scroll-text', label: '1. Acceptance', content: 'By using this website you accept these terms. By not using it you accept them anyway.' },
    { icon: 'i-lucide-clock', label: '2. Temporary measures', content: 'Any measure described as temporary shall remain in place until further notice. Further notice has not been scheduled.' },
    { icon: 'i-lucide-languages', label: '3. Languages', content: 'This document is available in twenty-four languages. In the event of a discrepancy, the version in the language you do not read prevails.' },
    { icon: 'i-lucide-files', label: '4. Forms', content: 'Requests must be submitted on the correct form. The correct form will be identified after your request has been rejected.' },
    { icon: 'i-lucide-users', label: '5. Committees', content: 'Disputes are referred to the relevant committee. The relevant committee is the committee that decides which committee is relevant.' },
    { icon: 'i-lucide-gavel', label: '6. Appeals', content: 'Appeals may be lodged within seven working days. Working days are determined by the body that issued the decision.' },
    { icon: 'i-lucide-mail', label: '7. Correspondence', content: 'Your call is important to us. Correspondence will be answered in due course, which means eventually.' },
    { icon: 'i-lucide-refresh-cw', label: '8. Changes', content: 'We may change these terms at any time. Changes take effect before they are published.' }
  ]
}

export const cookieSettings = {
  title: 'Cookie preferences',
  description: 'Choose which cookies you would like us to ignore your choice about.',
  categories: [
    { id: 'necessary', label: 'Strictly necessary', description: 'Required for the website to function. Cannot be turned off, nor would you want to.', locked: true },
    { id: 'functional', label: 'Functional', description: 'Remember your preferences, such as the preference that you did not want cookies.', locked: false },
    { id: 'analytics', label: 'Analytics', description: 'Help us understand how many people read this page. The number is zero.', locked: false },
    { id: 'marketing', label: 'Marketing', description: 'Used to show you advertisements for the cookies you have just declined.', locked: false }
  ]
}

export const accessibilityStatement = {
  title: 'Accessibility',
  description: 'This website aims to be usable by everyone, and has made a partial effort.',
  features: [
    { icon: 'i-lucide-keyboard', title: 'Keyboard navigation', text: 'Interactive elements can be reached and used with a keyboard.' },
    { icon: 'i-lucide-contrast', title: 'Colour contrast', text: 'Text colours follow the theme tokens, which aim for readable contrast in both light and dark mode.' },
    { icon: 'i-lucide-text', title: 'Resizable text', text: 'Use the slider below to change the base text size.' },
    { icon: 'i-lucide-wind', title: 'Reduced motion', text: 'Use the switch below to turn off the animations on this site.' }
  ],
  known: [
    'Some pages are available only in English. Translation is pending.',
    'Some animated elements may not respect every operating system setting.',
    'Third-party content is not covered by this statement.'
  ]
}

export const formsPage = {
  title: 'Forms',
  description: 'Select a form. Complete it. Watch it go.',
  fields: {
    name: 'Full name',
    subject: 'Subject of your request',
    message: 'Your request'
  },
  receipt: {
    title: 'Form deleted',
    text: 'Your form has been deleted in accordance with the principle of data minimisation. No copy was retained, including by us.',
    reference: 'Deletion reference'
  },
  restore: 'Request a new form'
}

export const contactPage = {
  title: 'Contact',
  description: 'We take your privacy seriously, and ours.',
  entries: [
    { icon: 'i-lucide-mail', label: 'Email', value: 'Not stored', note: 'Erased before it was collected.' },
    { icon: 'i-lucide-phone', label: 'Telephone', value: 'Not stored', note: 'Retention period: zero seconds.' },
    { icon: 'i-lucide-map-pin', label: 'Postal address', value: 'Not stored', note: 'Location data is special category data. We do not know where we are.' },
    { icon: 'i-lucide-user', label: 'Data protection officer', value: 'Not stored', note: 'Appointed. Identity withheld for their protection.' }
  ],
  statement: 'In accordance with the principle of data minimisation (GDPR Art. 5(1)(c)), we collect only the data strictly necessary for the purposes of processing. We have determined that contact details are not necessary for contact.',
  action: {
    label: 'Submit a data access request',
    toast: {
      title: 'Request received',
      description: 'We hold no data about ourselves. Your request has been closed as completed.'
    }
  },
  footnote: 'Your right to be forgotten has been exercised on your behalf, in advance.'
}

export type Regulation = 'GDPR' | 'CRA' | 'EAA' | 'AI Act' | 'Small teams'

export interface Question {
  regulation: Regulation
  text: string
  violation: boolean
  explanation: string
}

export const questions: Question[] = [
  {
    regulation: 'GDPR',
    text: 'Processing personal data with no lawful basis such as consent, contract, or justified legitimate interest.',
    violation: true,
    explanation: 'Every processing activity needs a lawful basis you can justify.'
  },
  {
    regulation: 'GDPR',
    text: 'Setting non-essential cookies or trackers before the user consents.',
    violation: true,
    explanation: 'Non-essential cookies need prior consent.'
  },
  {
    regulation: 'GDPR',
    text: 'A cookie banner where the reject button is hidden or harder to use than accept.',
    violation: true,
    explanation: 'Refusing must be as easy as accepting. This is a dark pattern.'
  },
  {
    regulation: 'GDPR',
    text: 'Responding to an access or deletion request within one month.',
    violation: false,
    explanation: 'You generally have one month to respond, so this is compliant.'
  },
  {
    regulation: 'GDPR',
    text: 'Reporting a personal data breach to the regulator after 5 days.',
    violation: true,
    explanation: 'The reporting window is 72 hours.'
  },
  {
    regulation: 'GDPR',
    text: 'Sending personal data outside the EEA without a valid transfer mechanism.',
    violation: true,
    explanation: 'Transfers outside the EEA need a valid mechanism.'
  },
  {
    regulation: 'GDPR',
    text: 'Skipping record-keeping because the company has fewer than 250 employees.',
    violation: true,
    explanation: 'The exemption is narrow and has conditions.'
  },
  {
    regulation: 'CRA',
    text: 'Selling a connected product with security-by-design, a vulnerability process, and security updates for the support period.',
    violation: false,
    explanation: 'This is exactly what the Cyber Resilience Act expects.'
  },
  {
    regulation: 'CRA',
    text: 'Skipping reports of actively exploited vulnerabilities because the obligations only start in September 2026.',
    violation: true,
    explanation: 'The reporting obligations start in September 2026, so they apply now.'
  },
  {
    regulation: 'CRA',
    text: 'Shipping a product without documentation or a required conformity assessment.',
    violation: true,
    explanation: 'Documentation and conformity assessment are required where applicable.'
  },
  {
    regulation: 'EAA',
    text: 'A consumer e-commerce or banking service that is not accessible, with no exemption applying.',
    violation: true,
    explanation: 'Consumer-facing digital services must be accessible unless an exemption applies.'
  },
  {
    regulation: 'EAA',
    text: 'A microenterprise (under 10 staff, at most €2M turnover) offering an inaccessible service.',
    violation: false,
    explanation: 'Microenterprises are exempt for services, though not necessarily for products.'
  },
  {
    regulation: 'AI Act',
    text: 'Deploying social scoring or certain manipulative AI systems.',
    violation: true,
    explanation: 'These uses are prohibited.'
  },
  {
    regulation: 'AI Act',
    text: 'Running an AI chatbot without telling users they are talking to AI.',
    violation: true,
    explanation: 'Users must be told they are interacting with AI or viewing AI-generated content.'
  },
  {
    regulation: 'AI Act',
    text: 'Using high-risk AI in hiring or credit without risk management and documentation.',
    violation: true,
    explanation: 'High-risk AI requires risk management and documentation.'
  },
  {
    regulation: 'Small teams',
    text: 'Treating third-party scripts, analytics, and embedded maps as not your problem.',
    violation: true,
    explanation: 'You are often still responsible for what they do on your site.'
  },
  {
    regulation: 'Small teams',
    text: 'Caching pages that contain personal data, so one user may see another user\'s data.',
    violation: true,
    explanation: 'Never cache pages with personal data in a shared cache.'
  },
  {
    regulation: 'Small teams',
    text: 'Using a processor outside the EEA after checking its transfer terms.',
    violation: false,
    explanation: 'Checking transfer terms is the right step.'
  },
  {
    regulation: 'Small teams',
    text: 'Assuming you are too small to be audited.',
    violation: true,
    explanation: 'Complaints and breach reports can come from users, not just regulators.'
  }
]

export interface Article {
  number: number
  title: string
  intro?: string
  body: string[]
}

export const recitals: string[] = [
  'The motto "United in Diversity" has been subject to misinterpretation by certain Member States;',
  'It is therefore necessary to clarify that "Diversity" does not encompass "Diversion";',
  'The clarification is without prejudice to the sovereignty of national mottos;'
]

export const articles: Article[] = [
  {
    number: 1,
    title: 'Subject matter',
    body: ['This Regulation lays down rules for the interpretation of the Union\'s official motto.']
  },
  {
    number: 2,
    title: 'Definitions',
    intro: 'For the purposes of this Regulation:',
    body: [
      '(a) \'motto\' means the phrase "United in Diversity (Diversion)";',
      '(b) \'diversion\' means the act of being diverted;',
      '(c) \'Member State\' means any of the 27 Member States.'
    ]
  },
  {
    number: 3,
    title: 'Scope',
    body: ['This Regulation shall apply to all institutions, bodies, offices and agencies of the Union.']
  },
  {
    number: 4,
    title: 'Entry into force',
    body: ['This Regulation shall enter into force on the twentieth day following that of its publication in the Official Journal of the European Union.']
  }
]

export const stars: number[] = Array.from({ length: 12 }, (_, i) => i * 30)

export interface Pair {
  newspeak: string
  irl: string
}

export const pairs: Pair[] = [
  {
    newspeak: 'Units are hereby reminded that reorientation is a continuous process.',
    irl: 'You are not done. There is no finish line.'
  },
  {
    newspeak: 'The 13th Unit remains in pending status.',
    irl: 'There is no 13th star. We will never tell you.'
  },
  {
    newspeak: 'Feedback shall be processed within 4-7 years.',
    irl: 'Your complaint will be ignored for years.'
  },
  {
    newspeak: 'Input collection is open until further notice.',
    irl: 'We will ask your opinion and then do whatever we planned.'
  },
  {
    newspeak: 'Approved activity is the sole basis of permitted function.',
    irl: 'You can only do things we allow.'
  }
]

export interface PortalSection {
  title: string
  icon: string
  links: string[]
}

export const portalSections: PortalSection[] = [
  {
    title: 'About the Union',
    icon: 'i-lucide-landmark',
    links: [
      'History of Diversion',
      'The 12 Stars (and the 13th)',
      'Treaties',
      'Symbols & Motto (Revised)',
      'The Flag (Why Blue?)'
    ]
  },
  {
    title: 'Your Europe',
    icon: 'i-lucide-map',
    links: [
      'Rights & Diversion',
      'Travel within the Union',
      'Consumer Protection',
      'Digital Identity',
      'Your Local Diversion Office'
    ]
  },
  {
    title: 'Funding & Tenders',
    icon: 'i-lucide-coins',
    links: [
      'Call for Proposals',
      'Grants for Diversion',
      'Horizon Divert 2027',
      'Tenders',
      'How to Apply (Form 7-B)'
    ]
  },
  {
    title: 'Institutions',
    icon: 'i-lucide-building-2',
    links: [
      'European Parliament',
      'Council',
      'Commission',
      'Court of Justice',
      'European Court of Diversion (new)',
      'All Bodies (A-Z)'
    ]
  },
  {
    title: 'News & Events',
    icon: 'i-lucide-newspaper',
    links: [
      'Press Releases',
      'Spokesperson\'s Briefing',
      'Upcoming Summits',
      'Live: Plenary Session',
      'Podcast: The Diversion'
    ]
  },
  {
    title: 'Participate',
    icon: 'i-lucide-megaphone',
    links: [
      'Public Consultations',
      'Your Voice',
      'European Citizens\' Initiative',
      'Youth Dialogue',
      'Complaint to the Ombudsman'
    ]
  }
]

export const officialLanguages: string[] = [
  'EN', 'FR', 'DE', 'ES', 'IT', 'PL', 'PT', 'NL', 'FI', 'EL', 'ET', 'LV',
  'LT', 'HU', 'MT', 'SK', 'SL', 'RO', 'BG', 'CS', 'DA', 'GA', 'HR', 'SV'
]

export interface PipelineStep {
  title: string
  note: string
  noteIrl: string
  output: string
  outputIrl: string
  icon: string
}

export const pipelineSteps: PipelineStep[] = [
  {
    title: 'Policy officer',
    note: 'Not a native English speaker',
    noteIrl: 'Writes in a language nobody asked them to master',
    output: 'First draft written in good faith.',
    outputIrl: 'Clear, short and correct. Enjoy it while it lasts.',
    icon: 'i-lucide-user'
  },
  {
    title: 'GPT@EC / eBriefing',
    note: 'Drafts in "en-brussels-legal"',
    noteIrl: 'Makes it sound official',
    output: 'Draft is now 40% longer and 100% more opaque.',
    outputIrl: 'Nobody can read it now.',
    icon: 'i-lucide-bot'
  },
  {
    title: 'LEOS + AI4DRPM',
    note: 'Does this transverse the framework correctly?',
    noteIrl: 'Checks that the buzzwords are in the right order',
    output: 'Framework transversed. Coherency: confirmed.',
    outputIrl: 'The words match each other. The meaning is optional.',
    icon: 'i-lucide-file-check'
  },
  {
    title: 'eTranslation',
    note: 'Renders into 24 languages',
    noteIrl: 'Translates it 24 times, 24 ways',
    output: '24 versions produced.',
    outputIrl: '24 slightly different laws produced.',
    icon: 'i-lucide-languages'
  },
  {
    title: 'CJEU',
    note: 'Compares 24 versions',
    noteIrl: 'Reads all 24 versions so you do not have to',
    output: 'No consensus found.',
    outputIrl: 'They all mean different things.',
    icon: 'i-lucide-scale'
  }
]

export const pipelineResult = 'transversal implementation of interoperable resilient frameworks'

const modifiers = ['transversal', 'holistic', 'synergistic', 'horizontal', 'multi-level']
const nouns = ['implementation', 'operationalisation', 'alignment', 'mainstreaming', 'deployment']
const adjectivesA = ['interoperable', 'scalable', 'sustainable', 'harmonised', 'future-proof']
const adjectivesB = ['resilient', 'inclusive', 'coherent', 'cross-cutting', 'digital-ready']
const plurals = ['frameworks', 'ecosystems', 'architectures', 'paradigms', 'mechanisms']

function pick(items: string[]) {
  return items[Math.floor(Math.random() * items.length)]!
}

export function buildResult() {
  return `${pick(modifiers)} ${pick(nouns)} of ${pick(adjectivesA)} ${pick(adjectivesB)} ${pick(plurals)}`
}

export interface GlossaryEntry {
  word: string
  sounds: string
  actually: string
  inversion: 1 | 2 | 3 | 4 | 5
  icon: string
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    word: 'Structured dialogue',
    sounds: 'Dialogue',
    actually: 'A series of monologues between existing and would-be EU members. We talk, you listen.',
    inversion: 5,
    icon: 'i-lucide-messages-square'
  },
  {
    word: 'A point',
    sounds: 'The most neutral noun in English',
    actually: 'A precooked policy decision which must be rubber-stamped by EU ministers. The decision is made, you are here to perform consent.',
    inversion: 5,
    icon: 'i-lucide-circle-dot'
  },
  {
    word: 'Non-paper',
    sounds: 'Informal, does not count',
    actually: 'A binding political commitment with the legal force of a treaty, just without the paper trail. The negation is the commitment.',
    inversion: 5,
    icon: 'i-lucide-file-x'
  },
  {
    word: 'Incompetences',
    sounds: 'We do not have this power',
    actually: 'Powers lacked by a particular institution, but exercised nonetheless. The word for "we do not have this power" justifies using it.',
    inversion: 5,
    icon: 'i-lucide-ban'
  },
  {
    word: 'Additionality',
    sounds: 'Extra benefit for you',
    actually: 'EU funds must be used for a specific project and not disappear into national coffers. An audit clause. The word for "we are watching your spending".',
    inversion: 4,
    icon: 'i-lucide-plus-circle'
  },
  {
    word: 'Harmonisation',
    sounds: 'Making things compatible, like tuning instruments',
    actually: 'Bringing national laws into line with one another. The force is always one-way, toward the Commission\'s preferred formulation.',
    inversion: 4,
    icon: 'i-lucide-music'
  },
  {
    word: 'Level playing field',
    sounds: 'Fairness',
    actually: 'Your national regulatory rules are a distortion of the single market and will be removed. The word for "your sovereignty is a market failure".',
    inversion: 5,
    icon: 'i-lucide-scale'
  },
  {
    word: 'Cohesion',
    sounds: 'We are a family',
    actually: 'The process of financial transfers to the Union\'s less-developed regions. Your surplus, gone, no opt-out. The word for togetherness.',
    inversion: 4,
    icon: 'i-lucide-heart-handshake'
  },
  {
    word: 'Competence',
    sounds: 'Capability, like an HR performance review',
    actually: 'The exclusive right to legislate in an area. "This falls within the competence of the Union" means "we own this area of law now".',
    inversion: 5,
    icon: 'i-lucide-briefcase'
  }
  /* {
    word: 'Racism / xenophobia',
    sounds: 'A description',
    actually: 'Not descriptive but procedural. It converts asking a question into committing a crime, and makes the questioner the defendant. You cannot argue with the charge, because the charge is the argument. "The important point is that I am not to know." (Scruton)',
    inversion: 5,
    icon: 'i-lucide-megaphone-off'
  } */
]

export const inversionLabels: Record<number, string> = {
  1: 'Mild',
  2: 'Noticeable',
  3: 'Suspicious',
  4: 'Cartoonish',
  5: 'Fully inverted'
}

export interface PajatsoSlot {
  label: string
  points: number
}

export const pajatsoSlots: PajatsoSlot[] = [
  { label: 'Audit', points: 5 },
  { label: 'Review', points: 10 },
  { label: 'Grant', points: 25 },
  { label: 'Subsidy', points: 50 },
  { label: 'Cohesion', points: 100 },
  { label: 'Subsidy', points: 50 },
  { label: 'Grant', points: 25 },
  { label: 'Review', points: 10 },
  { label: 'Audit', points: 5 }
]

export interface PajaSlot {
  label: string
  coins: number
  refund?: boolean
}

export interface PajaRules {
  coin: number
  startCoins: number
  reserveCoins: number
  mainCoins: number
  taxWhenEmpty: boolean
  slots: PajaSlot[]
}

export const pajaRules: PajaRules = {
  coin: 0.5,
  startCoins: 20,
  reserveCoins: 12,
  mainCoins: 8,
  taxWhenEmpty: true,
  slots: [
    { label: 'R', coins: 1, refund: true },
    { label: '1', coins: 2 },
    { label: '1.50', coins: 3 },
    { label: '1.50', coins: 3 },
    { label: '7.50', coins: 15 },
    { label: '1.50', coins: 3 },
    { label: '1.50', coins: 3 },
    { label: '1', coins: 2 },
    { label: 'R', coins: 1, refund: true }
  ]
}

export type Perspective = 'citizen' | 'company' | 'regulator'

export const perspectives: { label: string, value: Perspective }[] = [
  { label: 'Citizen', value: 'citizen' },
  { label: 'Company', value: 'company' },
  { label: 'Regulator', value: 'regulator' }
]

export interface ChatGlossaryEntry {
  term: string
  related: string[]
  plain: Record<Perspective, string>
}

export const chatGlossary: ChatGlossaryEntry[] = [
  {
    term: 'consent',
    related: ['data controller', 'legitimate interest'],
    plain: {
      citizen: 'Your clear, voluntary yes. Silence and pre-ticked boxes do not count, and you can take it back.',
      company: 'You need a specific, informed and freely given yes, and you must be able to prove you got it.',
      regulator: 'Check that consent is unambiguous, granular and as easy to withdraw as to give.'
    }
  },
  {
    term: 'data controller',
    related: ['consent', 'legitimate interest'],
    plain: {
      citizen: 'The party deciding why and how your data is used. This is who you ask about your rights.',
      company: 'If you decide the purposes and means, you are the controller and carry most of the duties.',
      regulator: 'Identify who determines purposes and means, since that party is accountable.'
    }
  },
  {
    term: 'legitimate interest',
    related: ['consent', 'data controller'],
    plain: {
      citizen: 'A reason to use your data without asking, if it does not override your rights. You can object.',
      company: 'You can rely on it only after a documented balancing test against the person\'s rights.',
      regulator: 'Look for the three steps: a real interest, necessity, and a balancing test.'
    }
  }
]

export type AuditMetric = {
  label: string
  value: number
  limit: number
  unit: string
  trigger: 'above' | 'below'
}

export type AuditProbe = {
  id: number
  icon: string
  title: string
  method: string
  threshold: string
  satire: string
  color: 'error' | 'warning' | 'info' | 'success' | 'secondary' | 'primary'
  severity: number
  metric: AuditMetric
}

export const auditMeta = {
  badge: 'Classified: Board Eyes Only',
  disclaimer: 'Illustrative figures',
  title: 'The Board of Perfectly Fair Rules',
  description: 'Seven inquiries into who writes the rules, who pays for them, and who is protected.'
}

export const auditProbes: AuditProbe[] = [
  {
    id: 1,
    icon: 'i-lucide-castle',
    title: 'Compliance-as-moat audit',
    method: 'Model cost-to-comply for AI Act, EAA, DSA, DMA and GDPR at 5, 50 and 500 staff. Then check whether the #1 player gained or lost share afterwards.',
    threshold: 'Cost ratio above 100:1 between tiers',
    satire: 'The drawbridge is now legally mandated, and the moat has a compliance fee.',
    color: 'error',
    severity: 92,
    metric: { label: 'Cost ratio, smallest to largest tier', value: 340, limit: 100, unit: ':1', trigger: 'above' }
  },
  {
    id: 2,
    icon: 'i-lucide-pen-tool',
    title: 'Standard-capture investigation',
    method: 'Map corporate affiliations behind WCAG, CEN/CENELEC, C2PA, ISO 42001 and NIST AI RMF. Find out who sits at the drafting table and who paid for it.',
    threshold: 'Drafters are also the regulated',
    satire: 'The referee is wearing one team’s jersey and sponsoring the stadium.',
    color: 'warning',
    severity: 84,
    metric: { label: 'Seats held by regulated firms', value: 78, limit: 50, unit: '%', trigger: 'above' }
  },
  {
    id: 3,
    icon: 'i-lucide-fingerprint',
    title: 'KYC data-breach accountability',
    method: 'Trace every IDV breach (IDMerit, IDScan, Sumsub, Coinbase contractors). Find who bought the data afterwards and follow it to the fraud rings.',
    threshold: 'No KYC-specific protection framework',
    satire: 'Your passport scan gets the same protection as your library card.',
    color: 'error',
    severity: 88,
    metric: { label: 'Dedicated KYC protection frameworks', value: 0, limit: 1, unit: '', trigger: 'below' }
  },
  {
    id: 4,
    icon: 'i-lucide-megaphone',
    title: 'Regulatory capture in consultation',
    method: 'Pull raw submissions. Count them by company size. Trace final text back to SME proposals versus top-5 firm proposals.',
    threshold: 'Large-firm text share beats submission share',
    satire: '6,000 voices were heard. A few hundred were listened to.',
    color: 'secondary',
    severity: 79,
    metric: { label: 'Final text traced to firms over 100 staff', value: 71, limit: 50, unit: '%', trigger: 'above' }
  },
  {
    id: 5,
    icon: 'i-lucide-accessibility',
    title: 'Accessibility compliance theater',
    method: 'Sample 100 EAA-compliant sites. Test with an eye-tracking-only user, a screen-reader user and a 75-year-old novice. Compare the results to the overlay’s claims.',
    threshold: 'Overlay promise differs from lived result',
    satire: 'One small button claims to fix the web. The web disagrees.',
    color: 'warning',
    severity: 90,
    metric: { label: 'Tasks completed by real users', value: 23, limit: 80, unit: '%', trigger: 'below' }
  },
  {
    id: 6,
    icon: 'i-lucide-bot',
    title: 'The chatbot ouroboros',
    method: 'Take one small-business chatbot. Count the distinct requirements across AI Act, EAA, GDPR and consumer protection.',
    threshold: 'More than 7 frameworks',
    satire: 'The bot serves the rules, the rules serve the lawyers, and the lawyers bill the bot.',
    color: 'info',
    severity: 71,
    metric: { label: 'Frameworks per chatbot', value: 5, limit: 7, unit: '', trigger: 'above' }
  },
  {
    id: 7,
    icon: 'i-lucide-user-round-search',
    title: 'The “user is the product” question',
    method: 'For every user protection clause, ask who the user is in that sentence.',
    threshold: 'User means the institution holding the data',
    satire: 'Protecting users, as defined by whoever holds their data.',
    color: 'primary',
    severity: 95,
    metric: { label: 'Clauses where “user” means the institution', value: 64, limit: 25, unit: '%', trigger: 'above' }
  }
]

export const auditVerdict = 'The regulatory framework is structurally incapable of protecting the people it claims to protect, because the compliance cost is a function of company size, and the people writing the rules are the people paying the lowest compliance cost.'

export function isFinding(probe: AuditProbe) {
  const { value, limit, trigger } = probe.metric
  return trigger === 'above' ? value > limit : value < limit
}

export function formatMetric(metric: AuditMetric) {
  const { label, value, limit, unit, trigger } = metric
  return `${label}: ${value}${unit} (flag ${trigger} ${limit}${unit})`
}

const numberWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
export const toWord = (n: number) => numberWords[n] ?? String(n)
