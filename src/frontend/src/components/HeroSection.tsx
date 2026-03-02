import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function HeroSection() {
  function scrollToOrder() {
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-chai-kulhad.dim_1200x800.jpg')",
        }}
        role="img"
        aria-label="Steaming chai in a rustic clay kulhad"
      />

      {/* Rich warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-espresso/75 via-espresso/55 to-cinnamon-DEFAULT/50" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 text-center max-w-4xl">
        {/* Pre-heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <div className="h-px w-8 bg-saffron opacity-80" />
          <span className="font-body text-xs tracking-[0.25em] uppercase text-saffron-light font-medium">
            Artisanal Chai — Since 2018
          </span>
          <div className="h-px w-8 bg-saffron opacity-80" />
        </motion.div>

        {/* Main tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream-light leading-[1.05] tracking-tight mb-6"
        >
          A Symphony of{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-saffron">
              Spices in Every Sip
            </span>
            {/* Warm glow under the accent phrase */}
            <span
              className="absolute inset-x-0 bottom-0 h-3 blur-2xl opacity-40 rounded-full"
              style={{ background: "oklch(0.68 0.19 52)" }}
              aria-hidden
            />
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65 }}
          className="font-body text-lg md:text-xl text-cream-light/90 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Hand-blended from ancient recipes, every cup of Magal Chai carries the
          warmth of a Rajasthani kitchen and the love of generations.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToOrder}
            size="lg"
            className="bg-saffron hover:bg-saffron-dark text-primary-foreground font-body font-semibold text-base rounded-full px-10 py-6 shadow-warm-lg hover:shadow-warm-xl transition-all duration-200 hover:-translate-y-0.5 min-w-[180px]"
          >
            Order Now
          </Button>
          <Button
            onClick={() =>
              document
                .querySelector("#menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            size="lg"
            variant="outline"
            className="border-cream-DEFAULT text-cream-DEFAULT bg-transparent hover:bg-cream-DEFAULT/10 font-body font-medium text-base rounded-full px-10 py-6 transition-all duration-200 min-w-[180px]"
          >
            View Menu
          </Button>
        </motion.div>

        {/* Scroll indicator — minimal line only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-20 flex flex-col items-center gap-0"
        >
          <motion.div
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-px h-12 bg-gradient-to-b from-saffron/70 via-saffron/40 to-transparent origin-top"
          />
        </motion.div>
      </div>
    </section>
  );
}
