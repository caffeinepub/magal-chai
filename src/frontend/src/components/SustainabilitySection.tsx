import { Heart, Package, Sprout } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Sprout,
    title: "Ethically Sourced Tea Leaves",
    desc: "Every leaf in our blend is hand-picked from small-scale, certified ethical tea estates in Assam, Darjeeling, and the Nilgiris — growers who share our respect for the land.",
  },
  {
    icon: Package,
    title: "Eco-Friendly Packaging",
    desc: "Our packaging is 100% compostable or recyclable. From the kraft paper pouches to the biodegradable seal — we ship without leaving a lasting mark on the planet.",
  },
  {
    icon: Heart,
    title: "Supporting Local Farmers",
    desc: "We pay above fair-trade prices and partner directly with farming cooperatives, cutting out middlemen so the people who grow your chai are fairly rewarded.",
  },
];

export default function SustainabilitySection() {
  return (
    <section
      id="sustainability"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Sustainability"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/spices-flatlay.dim_800x600.jpg')",
        }}
        role="img"
        aria-label="Aromatic spices flatlay"
      />
      {/* Deep warm overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-espresso/92 via-cinnamon-dark/88 to-espresso/90" />

      {/* Wave at bottom — flow into footer */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10"
        aria-hidden
      >
        <svg
          viewBox="0 0 1440 48"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-12 block"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M0,16 C360,48 1080,0 1440,24 L1440,48 L0,48 Z"
            fill="oklch(0.22 0.06 45)"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-saffron rounded-full" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-saffron font-semibold">
              Our Promise
            </span>
            <div className="h-0.5 w-8 bg-saffron rounded-full" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-light mb-4">
            Brewed with <span className="text-saffron">Purpose</span>
          </h2>
          <p className="font-body text-cream-DEFAULT/70 text-base">
            Magal Chai is built on the belief that great taste and genuine
            responsibility are not trade-offs — they're inseparable.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saffron/15 border border-saffron/30 mb-5 group-hover:bg-saffron/25 transition-colors duration-300">
                <pillar.icon className="w-7 h-7 text-saffron" />
              </div>

              <h3 className="font-display text-xl font-bold text-cream-light mb-3 leading-snug">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-cream-DEFAULT/65 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-saffron/10 border border-saffron/20 rounded-full px-8 py-3">
            <Sprout size={16} className="text-saffron" />
            <span className="font-body text-sm text-cream-DEFAULT/80">
              Carbon-neutral delivery by 2027 — our next milestone
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
