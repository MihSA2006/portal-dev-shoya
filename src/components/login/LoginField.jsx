/** Champ à libellé compact : icône à gauche, libellé au-dessus de la valeur, slot libre à droite. */
const LoginField = ({ id, label, icon: Icon, right, ...inputProps }) => (
  <div className="login-field">
    <Icon size={20} className="shrink-0 text-[var(--accent)]" />
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="block text-[11px] text-[var(--text-muted)]">{label}</label>
      <input id={id} {...inputProps} className="login-input" />
    </div>
    {right}
  </div>
);

export default LoginField;
