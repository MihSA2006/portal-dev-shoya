import { Bell, MonitorCog, Settings } from 'lucide-react';

const SettingsPage = () => (
  <div className="space-y-6">
    <header>
      <p className="text-sm font-medium text-[var(--accent)]">PRÉFÉRENCES</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Paramètres</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">Personnalisez votre expérience sur Portal Dev Shoya.</p>
    </header>

    <div className="grid gap-4 md:grid-cols-2">
      <section className="cut-frame p-5 [--frame-bg:var(--surface)]">
        <div className="flex items-center gap-3">
          <MonitorCog className="text-[var(--accent)]" size={20} />
          <h2 className="font-display text-lg font-semibold">Apparence</h2>
        </div>
        <p className="mt-3 text-sm text-[var(--text-muted)]">Le thème de l’interface peut être modifié depuis le bouton de thème dans la barre de navigation.</p>
      </section>
      <section className="cut-frame p-5 [--frame-bg:var(--surface)]">
        <div className="flex items-center gap-3">
          <Bell className="text-[var(--cyan)]" size={20} />
          <h2 className="font-display text-lg font-semibold">Notifications</h2>
        </div>
        <p className="mt-3 text-sm text-[var(--text-muted)]">Les préférences de notification seront disponibles ici.</p>
      </section>
      <section className="cut-frame p-5 [--frame-bg:var(--surface)] md:col-span-2">
        <div className="flex items-center gap-3">
          <Settings className="text-[var(--text-muted)]" size={20} />
          <h2 className="font-display text-lg font-semibold">Compte</h2>
        </div>
        <p className="mt-3 text-sm text-[var(--text-muted)]">Les paramètres de compte seront disponibles ici.</p>
      </section>
    </div>
  </div>
);

export default SettingsPage;
