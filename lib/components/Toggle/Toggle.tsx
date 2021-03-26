import styles from './Toggle.module.scss';

const Toggle = () => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        onChange={() => {
          const html = document.querySelector('html');

          if (!html) {
            return;
          }

          const theme = html.getAttribute('data-theme');

          if (!theme || theme === 'dark') {
            html.setAttribute('data-theme', 'light');
          } else {
            html.setAttribute('data-theme', 'dark');
          }
        }}
      />
      <span className={[styles.slider, styles.round].join(' ')}></span>
    </label>
  );
};

export default Toggle;
