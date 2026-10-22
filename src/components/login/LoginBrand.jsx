import LoginMark from './LoginMark';

const LoginBrand = () => (
  <div className="flex items-center gap-4">
    <LoginMark size={46} />
    <div>
      <p className="font-display text-2xl font-semibold uppercase leading-none tracking-[0.3em] sm:text-3xl">Shoya Labs</p>
      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--accent)] sm:text-[11px]">Bâtir un avenir durable</p>
    </div>
  </div>
);

export default LoginBrand;
