export const PROJECT_TABS = [
  { id: 'general', label: 'Général' },
  { id: 'description', label: 'Description' },
  { id: 'github', label: 'Connexion GitHub' },
];

export const STAGES = {
  production: { label: 'Production', tone: 'accent' },
  staging: { label: 'Staging', tone: 'cyan' },
};

export const BRANCHES = ['main', 'develop', 'staging', 'release'];
export const OWNERS = ['@mickael', '@tiana', '@hanitra'];

export const ENVIRONMENTS = [
  { key: 'local', label: 'Local', icon: 'laptop', tone: 'accent' },
  { key: 'staging', label: 'Staging', icon: 'server', tone: 'cyan' },
  { key: 'production', label: 'Production', icon: 'cloud', tone: 'accent' },
];

export const INITIAL_PROJECTS = [
  {
    id: 1,
    icon: 'wallet',
    name: 'Shoya Wallet',
    prefix: 'SWAL',
    stage: 'production',
    status: 'active',
    tagline: 'Portefeuille mobile pour les paiements du quotidien',
    repo: 'shoya-labs/shoya-wallet',
    branch: 'main',
    environments: {
      local: 'http://localhost:4000',
      staging: 'https://staging-api.wallet.shoya.io',
      production: 'https://api.wallet.shoya.io',
    },
    apiVersion: 'v2.1.0',
    docOwner: '@tiana',
    docs: { versions: ['v1', 'v2'], endpoints: 64, coverage: 96, syncMinutes: 2 },
    description: {
      details:
        "Shoya Wallet permet aux utilisateurs de stocker de l'argent, d'envoyer des paiements et de suivre leurs dépenses depuis une seule application.",
      goals: ['Réduire le temps de paiement sous 3 secondes', 'Atteindre 50 000 utilisateurs actifs'],
      stack: ['React Native', 'Node.js', 'PostgreSQL'],
    },
    github: {
      token: 'ghp_demo_wallet_0000',
      autoBranch: true,
      linkCommits: true,
      syncIssues: false,
      protectMain: true,
      lastSync: 'Il y a 12 min',
      recent: [
        { type: 'commit', text: 'SWAL-88 Corrige le calcul des frais', author: 'tiana', when: 'Il y a 12 min' },
        { type: 'pr', text: 'Ajoute la double authentification #214', author: 'hanitra', when: 'Il y a 3 h' },
      ],
    },
  },
  {
    id: 2,
    icon: 'letter',
    name: 'NovaPay',
    prefix: 'NOVA',
    stage: 'production',
    status: 'active',
    tagline: 'Infrastructure de paiement pour un meilleur demain',
    repo: 'shoya-labs/novapay',
    branch: 'main',
    environments: {
      local: 'http://localhost:3000',
      staging: 'https://staging-api.novapay.shoya.io',
      production: 'https://api.novapay.shoya.io',
    },
    apiVersion: 'v1.2.0',
    docOwner: '@mickael',
    docs: { versions: ['v1', 'v2'], endpoints: 48, coverage: 91, syncMinutes: 3 },
    description: {
      details:
        "NovaPay est la passerelle de paiement de Shoya. Elle centralise l'encaissement, la réconciliation et les remboursements via une API unique.",
      goals: ['Supporter 1 000 transactions par seconde', 'Publier la documentation API v2 avant décembre'],
      stack: ['Node.js', 'TypeScript', 'Redis', 'PostgreSQL'],
    },
    github: {
      token: 'ghp_demo_novapay_0000',
      autoBranch: true,
      linkCommits: true,
      syncIssues: true,
      protectMain: true,
      lastSync: 'Il y a 5 min',
      recent: [
        { type: 'commit', text: 'NOVA-142 Ajoute la signature des webhooks', author: 'mickael', when: 'Il y a 5 min' },
        { type: 'pr', text: 'Migration vers la version v1.2 #98', author: 'tiana', when: 'Hier' },
        { type: 'commit', text: 'NOVA-139 Met à jour le schéma de remboursement', author: 'hanitra', when: 'Hier' },
      ],
    },
  },
  {
    id: 3,
    icon: 'code',
    name: 'shoya_core',
    prefix: 'CORE',
    stage: 'staging',
    status: 'active',
    tagline: 'Socle technique partagé entre les produits Shoya',
    repo: 'shoya-labs/shoya-core',
    branch: 'develop',
    environments: {
      local: 'http://localhost:5000',
      staging: 'https://staging-core.shoya.io',
      production: '',
    },
    apiVersion: 'v0.9.0',
    docOwner: '@hanitra',
    docs: { versions: ['v1'], endpoints: 37, coverage: 87, syncMinutes: 5 },
    description: {
      details: "Bibliothèques communes : authentification, journalisation, gestion des rôles et composants d'interface.",
      goals: ["Extraire le module d'authentification", 'Couvrir 80 % du code par des tests'],
      stack: ['TypeScript', 'Vite', 'Vitest'],
    },
    github: {
      token: '',
      autoBranch: false,
      linkCommits: true,
      syncIssues: false,
      protectMain: false,
      lastSync: 'Jamais',
      recent: [],
    },
  },
];

export const createProject = (id) => ({
  id,
  icon: 'letter',
  name: 'Nouveau projet',
  prefix: 'NEW',
  stage: 'staging',
  status: 'active',
  tagline: '',
  repo: '',
  branch: 'main',
  environments: { local: 'http://localhost:3000', staging: '', production: '' },
  apiVersion: 'v0.1.0',
  docOwner: OWNERS[0],
  docs: { versions: ['v1'], endpoints: 0, coverage: 0, syncMinutes: null },
  description: { details: '', goals: [], stack: [] },
  github: { token: '', autoBranch: false, linkCommits: true, syncIssues: false, protectMain: false, lastSync: 'Jamais', recent: [] },
});

export const isProjectValid = (p) =>
  Boolean(
    p.name.trim() && p.prefix.trim() && p.repo.trim() &&
    p.environments.local.trim() && p.environments.staging.trim() && p.environments.production.trim()
  );
