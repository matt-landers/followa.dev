import { Developer } from 'lib/types';
import Link from 'next/link';
import React from 'react';
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
        <div className={styles.name}>
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer">
            <span className={styles.name}>{name}</span>
          </a>
          <span className={styles.twitter}>{twitter}</span>
        </div>
        <div className={styles.body}>
          <span className={styles.github}>{github}</span>
        </div>
        <div className={styles.tags}>
          {languages &&
            languages.map(({ name }) => (
              <Link key={name} href={`/filters/${name.toLowerCase()}`}>
                <a href={`/filters/${name.toLowerCase()}`}>
                  <div className={styles.tag}>{name}</div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
