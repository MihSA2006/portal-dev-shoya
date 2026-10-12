import { Crown, Users, Code2, FileText } from 'lucide-react';

// L'ordre des clés = ordre d'affichage des statistiques.
export const ROLES = {
  admin: {
    label: 'Administrateur',
    plural: 'Administrateurs',
    icon: Crown,
    tone: 'admin',
    description: 'Accès complet à la plateforme : gestion des utilisateurs, des projets et des paramètres.',
    permissions: [
      { label: 'Gérer les utilisateurs', allowed: true },
      { label: 'Gérer les projets', allowed: true },
      { label: 'Publier la documentation', allowed: true },
      { label: "Configurer les seuils d'alerte", allowed: true },
      { label: "Consulter le journal d'audit", allowed: true },
    ],
  },
  developer: {
    label: 'Développeur',
    plural: 'Développeurs',
    icon: Code2,
    tone: 'dev',
    description: "Membre de l'équipe de développement avec un accès limité à la gestion de ses propres endpoints et tâches.",
    permissions: [
      { label: "Créer la documentation d'un endpoint", allowed: true },
      { label: 'Modifier ses propres endpoints', allowed: true },
      { label: 'Soumettre pour relecture', allowed: true },
      { label: 'Créer des tâches personnelles', allowed: true },
      { label: 'Ne peut pas publier', allowed: false },
      { label: 'Ne peut pas gérer les utilisateurs', allowed: false },
    ],
  },
  lead: {
    label: 'Lead développeur',
    plural: 'Lead développeurs',
    icon: Users,
    tone: 'lead',
    description: "Pilote une équipe de développement, valide les contributions et suit l'avancement des tâches.",
    permissions: [
      { label: 'Créer et modifier les endpoints', allowed: true },
      { label: 'Valider les soumissions', allowed: true },
      { label: "Gérer les tâches de l'équipe", allowed: true },
      { label: 'Publier la documentation', allowed: true },
      { label: 'Ne peut pas gérer les utilisateurs', allowed: false },
    ],
  },
  doc: {
    label: 'Responsable doc',
    plural: 'Responsables doc',
    icon: FileText,
    tone: 'doc',
    description: 'Garant de la qualité de la documentation : relit, corrige et publie les contenus.',
    permissions: [
      { label: 'Relire la documentation', allowed: true },
      { label: 'Modifier toute la documentation', allowed: true },
      { label: 'Publier la documentation', allowed: true },
      { label: 'Gérer les tâches de documentation', allowed: true },
      { label: 'Ne peut pas gérer les projets', allowed: false },
      { label: 'Ne peut pas gérer les utilisateurs', allowed: false },
    ],
  },
};

export const ROLE_OPTIONS = Object.entries(ROLES).map(([value, r]) => ({
  value,
  label: r.label,
  icon: r.icon,
}));
