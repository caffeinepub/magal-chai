import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { MenuItem } from "../backend.d";
import { useGetAllMenuItems } from "../hooks/useQueries";

const CATEGORIES = ["All", "Masala", "Ginger", "Cardamom", "Vegan"];

// Fallback seed data if backend is empty
const FALLBACK_ITEMS: MenuItem[] = [
  {
    id: 1n,
    name: "Classic Masala Chai",
    description:
      "Bold black tea steeped with ginger, cardamom, cinnamon and cloves — the quintessential cup.",
    priceCents: 350n,
    category: "Masala",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 2n,
    name: "Royal Masala Chai",
    description:
      "A regal blend enriched with saffron threads and crushed pistachios. Luxury in every sip.",
    priceCents: 499n,
    category: "Masala",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 3n,
    name: "Kashmiri Kahwa",
    description:
      "Fragrant green tea with rose petals, saffron and almonds — a taste of the valley.",
    priceCents: 449n,
    category: "Masala",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 4n,
    name: "Adrak Special",
    description:
      "Fiery fresh ginger steeped in strong Assam tea. Warming from the inside out.",
    priceCents: 299n,
    category: "Ginger",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 5n,
    name: "Ginger Lemon Chai",
    description:
      "Bright and zingy — ginger, lemon zest and honey balance perfectly in this refreshing cup.",
    priceCents: 329n,
    category: "Ginger",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 6n,
    name: "Saunth Chai",
    description:
      "Dry ginger powder gives this chai a deep, mellow heat unlike any other.",
    priceCents: 279n,
    category: "Ginger",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 7n,
    name: "Elaichi Chai",
    description:
      "Pure green cardamom pods gently crushed into delicate Darjeeling tea. Floral and aromatic.",
    priceCents: 299n,
    category: "Cardamom",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 8n,
    name: "Rose Cardamom Chai",
    description:
      "Rose water and cardamom meet in this ethereally fragrant cup — romance in a kulhad.",
    priceCents: 379n,
    category: "Cardamom",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 9n,
    name: "Oat Milk Masala",
    description:
      "All the depth of our classic masala chai, made creamy and plant-based with oat milk.",
    priceCents: 399n,
    category: "Vegan",
    isVegan: true,
    isAvailable: true,
  },
  {
    id: 10n,
    name: "Coconut Ginger Chai",
    description:
      "Lush coconut milk meets bold ginger — tropical warmth in every sip.",
    priceCents: 429n,
    category: "Vegan",
    isVegan: true,
    isAvailable: true,
  },
  {
    id: 11n,
    name: "Soy Cardamom Delight",
    description:
      "Silky soy milk blended with cardamom and a hint of vanilla. Soft and sweet.",
    priceCents: 389n,
    category: "Vegan",
    isVegan: true,
    isAvailable: true,
  },
];

function formatPrice(priceCents: bigint): string {
  const rupees = Number(priceCents) / 100;
  return `₹${rupees.toFixed(0)}`;
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="group relative bg-gradient-to-b from-card to-cream-dark rounded-2xl p-6 shadow-warm border border-border/60 hover:shadow-warm-lg hover:-translate-y-1 hover:border-saffron/25 transition-all duration-250 flex flex-col gap-3"
    >
      {/* Warm saffron top-left accent line — unique per-card signature detail */}
      <div
        className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-saffron/30 to-transparent rounded-full"
        aria-hidden
      />

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-espresso leading-tight group-hover:text-saffron-dark transition-colors duration-200">
          {item.name}
        </h3>
        {item.isVegan && (
          <Badge className="shrink-0 bg-green-100 text-green-800 border-green-200 font-body text-xs flex items-center gap-1">
            <Leaf size={10} />
            Vegan
          </Badge>
        )}
      </div>
      <p className="font-body text-sm text-cinnamon-DEFAULT/80 leading-relaxed flex-1">
        {item.description}
      </p>
      {/* Price row — saffron dot motif replaces hard border */}
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-saffron/60 shrink-0"
            aria-hidden
          />
          <span className="font-display text-xl font-bold text-saffron">
            {formatPrice(item.priceCents)}
          </span>
        </div>
        <span className="font-body text-xs text-cinnamon-DEFAULT/40 italic">
          per cup
        </span>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl p-5 border border-border space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: menuItems, isLoading } = useGetAllMenuItems();

  const items = (menuItems && menuItems.length > 0 ? menuItems : FALLBACK_ITEMS)
    .filter((item) => item.isAvailable)
    .filter(
      (item) => activeCategory === "All" || item.category === activeCategory,
    );

  return (
    <section
      id="menu"
      className="relative py-24 md:py-32 bg-secondary"
      aria-label="Menu"
    >
      <div className="container mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-saffron rounded-full" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-saffron font-semibold">
              Our Blends
            </span>
            <div className="h-0.5 w-8 bg-saffron rounded-full" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
            The Magal Chai <span className="text-saffron">Menu</span>
          </h2>
          <p className="font-body text-cinnamon-DEFAULT/70 text-base">
            Each blend is crafted with purpose — traditional recipes reimagined
            for the modern chai lover.
          </p>
        </motion.div>

        {/* Category tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-10">
            <TabsList className="bg-cream-dark border border-border rounded-full p-1 h-auto flex-wrap gap-1">
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="font-body text-sm font-medium rounded-full px-5 py-2 data-[state=active]:bg-saffron data-[state=active]:text-primary-foreground data-[state=active]:shadow-warm transition-all duration-200"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {CATEGORIES.map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((id) => (
                    <SkeletonCard key={id} />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-2xl text-cinnamon-DEFAULT/40 mb-2">
                    No items available
                  </p>
                  <p className="font-body text-sm text-cinnamon-DEFAULT/30">
                    Check back soon for new blends.
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <MenuItemCard key={String(item.id)} item={item} />
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {/* Wave flowing menu into order section (cream bg) */}
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
            d="M0,28 C360,0 1080,56 1440,24 L1440,56 L0,56 Z"
            fill="oklch(0.97 0.03 80)"
          />
        </svg>
      </div>
    </section>
  );
}
