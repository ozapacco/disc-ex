/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, delay = 0 }) {
  return (
    <motion.div variants={itemVariants} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

export function AnimatedList({ children, staggerDelay = 0.05 }) {
  return (
    <motion.div
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, delay = 0 }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ children, title }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.5 },
        },
      }}
      style={{ marginBottom: '32px' }}
    >
      {title && (
        <motion.h2
          variants={{
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
          }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px',
            color: '#D4AF37',
            marginBottom: '16px',
          }}
        >
          {title}
        </motion.h2>
      )}
      {children}
    </motion.div>
  );
}
