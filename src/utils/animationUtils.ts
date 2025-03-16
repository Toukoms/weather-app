
export const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { 
      duration: 0.2, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.2, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    } 
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { 
      duration: 0.15, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

export const slideInBottom = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.1, 0.25, 1.0]
    } 
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { 
      duration: 0.2, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.1, 0.25, 1.0]
    } 
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { 
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const cloudFloat = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const sunRotate = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 60,
      ease: "linear",
      repeat: Infinity
    }
  }
};

export const rainDrop = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: [0, 1, 0],
    y: [0, 20],
    transition: {
      duration: 1.5,
      ease: "easeIn",
      repeat: Infinity,
      delay: Math.random() * 1
    }
  }
};

// Add a subtle pulse animation for weather icons
export const weatherIconPulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};
