import Image from 'next/image'
import styles from './styles.module.scss';

interface CardProps {
  id: number;
  title: string;
  thumbnail: string;
  extension: string;
  type: string;
}

export function Card({ id, title, thumbnail, extension, type }: CardProps) {
  const srcImg = thumbnail + '.' + extension;
  return (
    <a href={`/${type}/${id}?type=${type}`} className={styles.container}>
      {thumbnail && <Image src={srcImg} alt={title} width={200} height={200} />}
      {title}
    </a>
  )
}