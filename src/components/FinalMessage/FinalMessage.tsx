import { ArrowUp } from 'lucide-react';
import { motion, useReducedMotion as useMotionReducedMotion } from 'motion/react';
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
    </section>
  );
}
