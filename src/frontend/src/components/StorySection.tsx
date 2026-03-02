import { motion } from "motion/react";

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative py-24 md:py-32 bg-cream-DEFAULT overflow-hidden"
      aria-label="Our Story"
    >
      {/* Wave divider from hero into story — fills the gap seamlessly */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden leading-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 1440 56"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-14 block"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M0,32 C360,56 1080,8 1440,32 L1440,0 L0,0 Z"
            fill="oklch(0.22 0.06 45)"
          />
        </svg>
      </div>
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Images — layered composition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative"
          >
            {/* Background spice image */}
            <div className="relative rounded-3xl overflow-hidden shadow-warm-xl aspect-[4/3]">
              <img
                src="/assets/generated/story-hands-chai.dim_800x600.jpg"
                alt="Elderly hands cupping a warm chai"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-tl from-espresso/20 to-transparent" />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 md:-right-8 bg-saffron rounded-2xl p-5 shadow-warm-lg max-w-[180px]"
            >
              <p className="font-display text-3xl font-bold text-primary-foreground leading-none">
                7+
              </p>
              <p className="font-body text-xs text-primary-foreground/80 mt-1 leading-snug">
                Secret spices in every blend
              </p>
            </motion.div>

            {/* Decorative dot grid */}
            <div
              className="absolute -top-6 -left-6 w-24 h-24 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, oklch(0.35 0.09 48) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
              aria-hidden
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className="lg:pl-4"
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-0.5 w-10 bg-saffron rounded-full" />
              <span className="font-body text-xs tracking-[0.2em] uppercase text-saffron font-semibold">
                Our Story
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight mb-6">
              Born in a Rajasthani
              <br />
              <span className="text-saffron">Kitchen at Dawn</span>
            </h2>

            <p className="font-body text-base md:text-lg text-cinnamon-DEFAULT leading-relaxed mb-8">
              It began in a small kitchen in Rajasthan, where my grandmother
              would wake before dawn to crush cardamom and roast ginger, filling
              the house with warmth before the world awoke. She never wrote down
              her recipe — it lived in her hands. After years of memory and a
              thousand cups, we finally captured that warmth in Magal Chai.
              Every sip carries her love, her patience, and the ancient rhythm
              of spice.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {[
                { num: "1956", label: "Family Recipe Since" },
                { num: "1000+", label: "Cups Perfected" },
                { num: "100%", label: "Hand Blended" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl md:text-3xl font-bold text-saffron">
                    {stat.num}
                  </p>
                  <p className="font-body text-xs text-cinnamon-DEFAULT/70 mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Wave divider flowing story into menu section */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 1440 56"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-14 block"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M0,24 C480,56 960,0 1440,28 L1440,56 L0,56 Z"
            fill="oklch(0.93 0.05 78)"
          />
        </svg>
      </div>
    </section>
  );
}
