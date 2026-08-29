import { ArrowUp } from 'lucide-react';
import { motion, useReducedMotion as useMotionReducedMotion } from 'motion/react';
import sereia from '../../assets/sereia.png';
import styles from './FinalMessage.module.css';

interface FinalMessageProps {
  message: string;
  signature: string;
}

export function FinalMessage({ message, signature }: FinalMessageProps) {
  const prefersReducedMotion = useMotionReducedMotion();

  return (
    <section id="mensagem" className={styles.section} aria-labelledby="final-title">
      <motion.div
        className={styles.shell}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-18% 0px' }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.kicker}>06 / mensagem</span>
        <h2 id="final-title">{message}</h2>
        <p>{signature}</p>
        <a href="#topo">
          <ArrowUp aria-hidden="true" size={18} />
          Voltar ao início
        </a>
      </motion.div>

      <motion.div
        className={styles.characterWrapper}
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 50, x: 20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        <img src={sereia} alt="" draggable="false" className={styles.character} />
      </motion.div>
    </section>
  );
}

