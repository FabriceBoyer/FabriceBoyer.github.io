import { motion, useReducedMotion } from 'framer-motion'

/** Halos colorés animés en arrière-plan, dérivés de la couleur d'accent. */
export function Backdrop() {
  const still = useReducedMotion()
  const anim = (dx: number, dy: number, s: number) =>
    still
      ? undefined
      : {
          x: [0, dx, 0],
          y: [0, dy, 0],
          scale: [1, s, 1],
        }
  const t = (duration: number) => ({ duration, repeat: Infinity, ease: 'easeInOut' as const })

  return (
    <div className="backdrop" aria-hidden="true">
      <motion.div className="blob blob-a" animate={anim(90, 60, 1.14)} transition={t(22)} />
      <motion.div className="blob blob-b" animate={anim(-70, 90, 1.2)} transition={t(27)} />
      <motion.div className="blob blob-c" animate={anim(60, -80, 1.1)} transition={t(31)} />
    </div>
  )
}
