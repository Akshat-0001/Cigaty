import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import bottleLeft from "@/assets/bottle-left.svg";
import bottleRight from "@/assets/bottle-right.svg";
// Using online logo URL
const cigatyLogo = "https://i.ibb.co/fGHXK8QF/Cigaty-removebg.png";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Trigger the door opening animation after 2s for better anticipation
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Spring physics configuration: ultra-slow, luxurious motion
  // Very low stiffness (60) = gentle motion, high damping (28) = smooth settle, higher mass (1.4) = weighted feel
  const springConfig: Transition = {
    type: "spring",
    stiffness: 60,
    damping: 28,
    mass: 1.4,
  };

  // Reduced motion fallback: simple fade instead of spring animation
  const reducedMotionConfig: Transition = {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1] as any,
  };

  // Calculate responsive travel distance (110-140% of viewport width)
  const getTravelDistance = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth * 0.65; // 130% total spread
    }
    return 800; // fallback
  };

  return (
    <div className="relative w-full h-screen overflow-hidden hero-gradient">
      {/* Hero stage - centered content */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Logo and content - behind the bottles, fades in during door opening */}
        <motion.div
          className="absolute z-10 text-center flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={
            isOpen
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.94, y: 20 }
          }
          transition={
            prefersReducedMotion
              ? reducedMotionConfig
              : ({
                  delay: 0.6, // Start 600ms after bottles begin moving for perfect timing
                  duration: 1.2,
                  ease: [0.22, 0.61, 0.36, 1], // Custom luxury ease
                } as Transition)
          }
        >
          {/* Golden glow behind logo */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
            <div className="w-full h-full bg-gradient-to-b from-amber-400/40 via-primary/30 to-transparent rounded-full" />
          </div>

          {/* Premium logo with spectacular animation */}
          <div className="relative">
            {/* Animated golden shimmer sweep */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-lg"
              initial={{ opacity: 0 }}
              animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? reducedMotionConfig
                  : ({
                      delay: 1.2,
                      duration: 0.4,
                    } as Transition)
              }
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"
                style={{ width: '50%' }}
                initial={{ x: '-100%' }}
                animate={isOpen ? { x: '300%' } : { x: '-100%' }}
                transition={
                  prefersReducedMotion
                    ? reducedMotionConfig
                    : ({
                        delay: 1.4,
                        duration: 1.4,
                        ease: [0.4, 0, 0.2, 1],
                      } as Transition)
                }
              />
            </motion.div>

            {/* Logo with multi-stage entrance */}
            <motion.img
              src={cigatyLogo}
              alt="Cigaty - Premium Wine"
              className="w-auto h-auto object-contain relative z-10"
              style={{ 
                maxWidth: 'min(85vw, 450px)',
                maxHeight: 'min(70vh, 450px)',
              }}
              initial={{ 
                scale: 0.75,
                opacity: 0,
                y: 30,
                rotateZ: -8,
                filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0)) blur(8px)',
              }}
              animate={isOpen ? { 
                scale: 1,
                opacity: 1,
                y: 0,
                rotateZ: 0,
                filter: 'drop-shadow(0 12px 32px rgba(0, 0, 0, 0.6)) blur(0px)',
              } : { 
                scale: 0.75,
                opacity: 0,
                y: 30,
                rotateZ: -8,
                filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0)) blur(8px)',
              }}
              transition={
                prefersReducedMotion
                  ? reducedMotionConfig
                  : ({
                      delay: 0.7,
                      duration: 1.3,
                      ease: [0.16, 1, 0.3, 1], // Custom expo ease for dramatic entrance
                    } as Transition)
              }
            />

            {/* Pulsing golden aura */}
            <motion.div
              className="absolute inset-0 -z-10 blur-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isOpen ? { 
                opacity: [0, 0.4, 0.3],
                scale: [0.8, 1.1, 1],
              } : { opacity: 0, scale: 0.8 }}
              transition={
                prefersReducedMotion
                  ? reducedMotionConfig
                  : ({
                      delay: 0.9,
                      duration: 1.5,
                      ease: [0.22, 0.61, 0.36, 1],
                    } as Transition)
              }
            >
              <div className="w-full h-full bg-gradient-radial from-amber-500/60 via-primary/40 to-transparent" />
            </motion.div>
          </div>

          {/* Tagline - clean sans beneath logo */}
          <motion.p 
            className="font-sans text-foreground/80 tracking-widest uppercase mt-4" 
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', letterSpacing: '0.3em' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={
              prefersReducedMotion
                ? reducedMotionConfig
                : ({
                    delay: 1.0,
                    duration: 0.8,
                    ease: [0.22, 0.61, 0.36, 1],
                  } as Transition)
            }
          >
            Coming Soon
          </motion.p>
        </motion.div>

        {/* Left bottle half (door) */}
        <motion.div
          className="absolute z-20 flex items-center justify-center"
          style={{
            width: 'min(40vw, 500px)',
            height: 'min(80vh, 900px)',
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          initial={{ x: 0, rotateY: 0 }}
          animate={
            isOpen
              ? {
                  x: -getTravelDistance(),
                  rotateY: -8,
                }
              : { x: 0, rotateY: 0 }
          }
          transition={prefersReducedMotion ? reducedMotionConfig : springConfig}
        >
          {/* Seam highlight - thin highlight along the edge */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-foreground/20 to-transparent"
            style={{ transform: 'translateX(1px)' }}
          />
          
          {/* Dynamic shadow under bottle */}
          <div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full h-12 rounded-full blur-xl opacity-40 bg-black transition-all duration-500"
            style={{
              width: isOpen ? '80%' : '100%',
              opacity: isOpen ? 0.2 : 0.4,
            }}
          />
          
          {/* Subtle specular highlight on bottle body */}
          <div 
            className="absolute top-[20%] left-[30%] w-[20%] h-[40%] bg-gradient-to-br from-white/10 to-transparent rounded-full blur-sm pointer-events-none"
          />
          
          <img
            src={bottleLeft}
            alt="Cigaty bottle left"
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
              // Subtle motion blur effect during animation (via filter)
              ...(isOpen && !prefersReducedMotion ? { filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)) blur(0.3px)' } : {}),
            }}
          />
        </motion.div>

        {/* Right bottle half (door) */}
        <motion.div
          className="absolute z-20 flex items-center justify-center"
          style={{
            width: 'min(40vw, 500px)',
            height: 'min(80vh, 900px)',
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          initial={{ x: 0, rotateY: 0 }}
          animate={
            isOpen
              ? {
                  x: getTravelDistance(),
                  rotateY: 8,
                }
              : { x: 0, rotateY: 0 }
          }
          transition={prefersReducedMotion ? reducedMotionConfig : springConfig}
        >
          {/* Seam highlight - thin highlight along the edge */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-foreground/20 to-transparent"
            style={{ transform: 'translateX(-1px)' }}
          />
          
          {/* Dynamic shadow under bottle */}
          <div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full h-12 rounded-full blur-xl opacity-40 bg-black transition-all duration-500"
            style={{
              width: isOpen ? '80%' : '100%',
              opacity: isOpen ? 0.2 : 0.4,
            }}
          />
          
          {/* Subtle specular highlight on bottle body */}
          <div 
            className="absolute top-[20%] right-[30%] w-[20%] h-[40%] bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-sm pointer-events-none"
          />
          
          <img
            src={bottleRight}
            alt="Cigaty bottle right"
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
              // Subtle motion blur effect during animation
              ...(isOpen && !prefersReducedMotion ? { filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)) blur(0.3px)' } : {}),
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
