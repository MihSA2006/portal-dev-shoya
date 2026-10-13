import { Zap } from 'lucide-react';
import { buildCurl } from '../../../utils/overview';
import CurlExample from './CurlExample';
import OverviewCard from './OverviewCard';

const STEPS = [
  { title: 'Authentification', text: "Obtenez votre clé d'API" },
  { title: 'Première requête', text: 'Effectuez un appel' },
  { title: 'Commencez à construire', text: 'Intégrez et évoluez' },
];

const QuickStartCard = ({ baseUrl, quickStart }) => (
  <OverviewCard icon={Zap} title="Démarrage rapide" subtitle="Soyez opérationnel en quelques minutes." className="flex flex-col justify-between">
    {baseUrl && quickStart ? (
      <CurlExample curl={buildCurl(baseUrl, quickStart)} />
    ) : (
      <p className="border border-dashed border-[var(--border-strong)] py-8 text-center text-sm text-[var(--text-muted)]">
        {baseUrl ? 'Aucun endpoint documenté pour générer un exemple.' : "Renseignez l'URL de cet environnement pour générer un exemple."}
      </p>
    )}
  </OverviewCard>
);

export default QuickStartCard;
