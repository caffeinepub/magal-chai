const currentYear = new Date().getFullYear();

const footerLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Order", href: "#order" },
  { label: "Sustainability", href: "#sustainability" },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream-DEFAULT py-16">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/magal-chai-logo-transparent.dim_300x300.png"
                alt="Magal Chai logo"
                className="w-12 h-12 object-contain brightness-[1.15]"
              />
              <span className="font-display text-2xl font-bold text-cream-light">
                Magal Chai
              </span>
            </div>
            <p className="font-body text-sm text-cream-DEFAULT/60 leading-relaxed max-w-xs">
              A Symphony of Spices in Every Sip. Artisanal chai blends rooted in
              tradition, crafted for the modern cup.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold text-cream-light uppercase tracking-widest mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-cream-DEFAULT/60 hover:text-saffron transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / brand */}
          <div>
            <h4 className="font-display text-sm font-bold text-cream-light uppercase tracking-widest mb-5">
              Find Us
            </h4>
            <div className="space-y-3 font-body text-sm text-cream-DEFAULT/60">
              <p>Jaipur, Rajasthan, India</p>
              <p>chai@magalchai.in</p>
              <p>+91 98765 43210</p>
            </div>

            {/* Saffron divider accent */}
            <div className="mt-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-saffron/40 to-transparent" />
            </div>
            <p className="font-display text-xs text-saffron/70 mt-3 tracking-widest uppercase">
              Est. 2018 · Rajasthan
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream-DEFAULT/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-cream-DEFAULT/40">
          <p>© {currentYear} Magal Chai. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron/70 hover:text-saffron transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
