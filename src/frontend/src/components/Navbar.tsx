import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Order", href: "#order" },
  { label: "Sustainability", href: "#sustainability" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-light/95 backdrop-blur-md shadow-warm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Brand */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          aria-label="Magal Chai — Home"
        >
          <img
            src="/assets/generated/magal-chai-logo-transparent.dim_300x300.png"
            alt="Magal Chai logo"
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-display text-xl font-bold text-espresso tracking-tight">
            Magal Chai
          </span>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="font-body text-sm font-medium text-cinnamon-DEFAULT hover:text-saffron transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Button
            onClick={() => scrollTo("#order")}
            className="bg-saffron text-primary-foreground hover:bg-saffron-dark font-body font-semibold rounded-full px-6 shadow-warm transition-all duration-200 hover:shadow-warm-lg hover:-translate-y-0.5"
          >
            Order Now
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream-light/97 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <nav
              className="flex flex-col px-6 py-4 gap-4"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="font-body text-base font-medium text-cinnamon-DEFAULT hover:text-saffron transition-colors duration-200 cursor-pointer text-left py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("#order")}
                className="bg-saffron text-primary-foreground hover:bg-saffron-dark font-body font-semibold rounded-full mt-2 shadow-warm"
              >
                Order Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
