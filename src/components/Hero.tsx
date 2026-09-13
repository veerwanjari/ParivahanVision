import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Github, Radio } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STATS, GITHUB_URL } from "@/data/content";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <div id="top" className="relative overflow-hidden pt-40 pb-24 lg:pb-32">
      {/* ambient grid, purely atmospheric — echoes the sensor/HUD motif used through the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10 lg:px-8">
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <motion.h1
            variants={reduce ? undefined : item}
            className="text-display-xl font-display font-semibold text-paper"
          >
            Detect every vehicle.
            <br />
            Track every path.
            <br />
            Read every plate.
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : item}
            className="mt-6 max-w-lg text-lg leading-relaxed text-fog"
          >
            ParivahanVision runs YOLOv8 detection, DeepSORT tracking, and
            EasyOCR plate reading on real traffic footage — tuned for Indian
            road conditions, where lanes are more of a suggestion.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              href="#demo"
              variant="primary"
              icon={<ArrowRight size={16} />}
            >
              Watch the live demo
            </Button>
            <Button
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              icon={<Github size={16} />}
            >
              View source
            </Button>
          </motion.div>

          <motion.dl
            variants={reduce ? undefined : item}
            className="mt-14 grid max-w-md grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l border-hairline pl-3.5">
                <dt className="font-mono text-xl font-medium tabular-nums text-paper">
                  {stat.value}
                  <span className="text-scan">{stat.unit}</span>
                </dt>
                <dd className="mt-1 text-xs leading-snug text-mist">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="relative lg:-bottom-8"
          initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        >
          <a
            href="#demo"
            className="group block"
            aria-label="Jump to the live demo"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/20 bg-surface shadow-panel sm:aspect-video lg:aspect-[4/3]">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero.jpg')" }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-ink/30" />

              {/* Existing grid */}
              <div className="absolute inset-0 bg-grid opacity-40" />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

              {/* Scanline */}
              <div className="absolute inset-x-0 top-0 h-1/3 animate-scanline bg-gradient-to-b from-scan/25 via-scan/5 to-transparent" />

              {/* REC */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-hairline2 bg-ink/60 px-2.5 py-1 backdrop-blur-sm">
                <Radio size={11} className="animate-blink text-alert" />
                <span className="font-mono text-[10px] tracking-wide text-paper">
                  REC
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3.5">
                <span className="text-xs text-fog">
                  Sample output · full pipeline runs on a local GPU
                </span>

                <span className="hidden items-center gap-1 text-xs font-medium text-paper transition-transform duration-150 ease-out group-hover:translate-x-0.5 sm:flex">
                  Watch full demo
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
