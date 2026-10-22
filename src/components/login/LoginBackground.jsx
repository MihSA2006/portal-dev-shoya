const base = import.meta.env.BASE_URL;

/**
 * Deux calques (sombre et clair) toujours présents ; le fondu enchaîné est piloté en CSS
 * par l'attribut data-theme (voir index.login.css). Les deux images sont donc préchargées.
 */
const LoginBackground = () => (
  <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
    <div className="login-bg-layer login-bg-dark" style={{ '--bg-img': `url(${base}bg-dark.png)` }} />
    <div className="login-bg-layer login-bg-light" style={{ '--bg-img': `url(${base}bg-light.png)` }} />
  </div>
);

export default LoginBackground;
