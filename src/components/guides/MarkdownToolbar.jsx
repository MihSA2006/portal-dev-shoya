import { Bold, Code2, Eye, EyeOff, Heading1, Image, Italic, Link2, Quote, Table } from 'lucide-react';

const TOOLS = [
  { action: 'bold', icon: Bold, label: 'Gras (Ctrl+B)' },
  { action: 'italic', icon: Italic, label: 'Italique (Ctrl+I)' },
  { action: 'heading', icon: Heading1, label: 'Titre' },
  { action: 'link', icon: Link2, label: 'Lien' },
  { action: 'code', icon: Code2, label: 'Code' },
  { action: 'table', icon: Table, label: 'Tableau' },
  { action: 'quote', icon: Quote, label: 'Citation' },
  { action: 'image', icon: Image, label: 'Image' },
];

/** Barre d'outils : agit sur le textarea ; le dernier bouton affiche ou masque l'aperçu. */
const MarkdownToolbar = ({ onAction, disabled, previewVisible, onTogglePreview }) => (
  <div role="toolbar" aria-label="Mise en forme Markdown" className="flex flex-wrap items-center gap-1">
    {TOOLS.map(({ action, icon: Icon, label }) => (
      <button
        key={action}
        type="button"
        disabled={disabled}
        title={label}
        aria-label={label}
        // Empêche le bouton de voler le focus au textarea (la sélection reste active).
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onAction(action)}
        className="icon-btn disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Icon size={18} />
      </button>
    ))}
    <button
      type="button"
      onClick={onTogglePreview}
      aria-pressed={previewVisible}
      title={previewVisible ? "Masquer l'aperçu" : "Afficher l'aperçu"}
      aria-label={previewVisible ? "Masquer l'aperçu" : "Afficher l'aperçu"}
      className="icon-btn"
    >
      {previewVisible ? <Eye size={18} /> : <EyeOff size={18} />}
    </button>
  </div>
);

export default MarkdownToolbar;
