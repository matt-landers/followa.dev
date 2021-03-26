import { Developer } from 'lib/types';
import styles from './Card.module.scss';

const Card: React.FC<Developer> = ({
  name,
  github,
  languages,
  twitter,
  company,
  personalBlog,
}) => {
  return (
    <div className={styles.card}>
      <div className="pic"></div>
      <div className="info">
        <div className="name">
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer">
            <span className={styles.name}>{name}</span>
          </a>
          <span className={styles.twitter}>{twitter}</span>
        </div>
        <div className="body">
          <span className={styles.github}>{github}</span>
        </div>
        <div className={styles.tags}>
          {languages &&
            languages.map(({ name }) => (
              <div className={styles.tag}>{name}</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
