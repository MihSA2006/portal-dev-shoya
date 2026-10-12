import { Building2, ShieldCheck, Users } from 'lucide-react';

const Administration = () => (
  <div className="space-y-6">
    <header>
      <p className="text-sm font-medium text-[var(--accent)]">ESPACE DE GESTION</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Administration</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">Gérez les utilisateurs et les paramètres de votre organisation.</p>
    </header>

    <div className="grid gap-4 md:grid-cols-2">
      <section className="cut-frame p-5 [--frame-bg:var(--surface)]">
        <div className="flex items-center gap-3">
          <Users className="text-[var(--accent)]" size={20} />
          <h2 className="font-display text-lg font-semibold">Utilisateurs</h2>
        </div>
        <p className="mt-3 text-sm text-[var(--text-muted)]">La gestion des membres de l’organisation sera affichée ici.</p>
      </section>
      <section className="cut-frame p-5 [--frame-bg:var(--surface)]">
        <div className="flex items-center gap-3">
          <Building2 className="text-[var(--cyan)]" size={20} />
          <h2 className="font-display text-lg font-semibold">Organisation</h2>
        </div>
        <p className="mt-3 text-sm text-[var(--text-muted)]">Les informations de votre organisation seront affichées ici.</p>
      </section>
    </div>

    <div className="flex items-start gap-3 border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-soft)]">
      <ShieldCheck className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} />
      <p>Les fonctionnalités d’administration sont réservées aux utilisateurs disposant des autorisations nécessaires.</p>
    </div>
  </div>
);

export default Administration;
