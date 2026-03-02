import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle2,
  Leaf,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { MenuItem, OrderItem } from "../backend.d";
import { useGetAllMenuItems, usePlaceOrder } from "../hooks/useQueries";

// Same fallback items as MenuSection
const FALLBACK_ITEMS: MenuItem[] = [
  {
    id: 1n,
    name: "Classic Masala Chai",
    description:
      "Bold black tea steeped with ginger, cardamom, cinnamon and cloves.",
    priceCents: 350n,
    category: "Masala",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 2n,
    name: "Royal Masala Chai",
    description:
      "A regal blend enriched with saffron threads and crushed pistachios.",
    priceCents: 499n,
    category: "Masala",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 3n,
    name: "Kashmiri Kahwa",
    description: "Fragrant green tea with rose petals, saffron and almonds.",
    priceCents: 449n,
    category: "Masala",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 4n,
    name: "Adrak Special",
    description: "Fiery fresh ginger steeped in strong Assam tea.",
    priceCents: 299n,
    category: "Ginger",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 5n,
    name: "Ginger Lemon Chai",
    description: "Bright and zingy — ginger, lemon zest and honey.",
    priceCents: 329n,
    category: "Ginger",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 6n,
    name: "Saunth Chai",
    description: "Dry ginger powder gives this chai a deep mellow heat.",
    priceCents: 279n,
    category: "Ginger",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 7n,
    name: "Elaichi Chai",
    description: "Pure green cardamom pods in delicate Darjeeling tea.",
    priceCents: 299n,
    category: "Cardamom",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 8n,
    name: "Rose Cardamom Chai",
    description: "Rose water and cardamom — romance in a kulhad.",
    priceCents: 379n,
    category: "Cardamom",
    isVegan: false,
    isAvailable: true,
  },
  {
    id: 9n,
    name: "Oat Milk Masala",
    description: "Classic masala chai made creamy with oat milk.",
    priceCents: 399n,
    category: "Vegan",
    isVegan: true,
    isAvailable: true,
  },
  {
    id: 10n,
    name: "Coconut Ginger Chai",
    description: "Lush coconut milk meets bold ginger.",
    priceCents: 429n,
    category: "Vegan",
    isVegan: true,
    isAvailable: true,
  },
  {
    id: 11n,
    name: "Soy Cardamom Delight",
    description: "Silky soy milk blended with cardamom and vanilla.",
    priceCents: 389n,
    category: "Vegan",
    isVegan: true,
    isAvailable: true,
  },
];

function formatPrice(priceCents: bigint): string {
  return `₹${(Number(priceCents) / 100).toFixed(0)}`;
}

type QuantityMap = Record<string, number>;

function OrderConfirmation({
  orderId,
  onReset,
}: { orderId: bigint; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="font-display text-3xl font-bold text-espresso mb-3">
        Order Placed!
      </h3>
      <p className="font-body text-cinnamon-DEFAULT/70 mb-2">
        Your chai is on its way to you. ☕
      </p>
      <p className="font-body text-sm text-cinnamon-DEFAULT/50 mb-8">
        Order ID:{" "}
        <span className="font-semibold text-saffron">#{String(orderId)}</span>
      </p>
      <Button
        onClick={onReset}
        className="bg-saffron hover:bg-saffron-dark text-primary-foreground font-body font-semibold rounded-full px-8"
      >
        Place Another Order
      </Button>
    </motion.div>
  );
}

export default function OrderSection() {
  const { data: menuItems, isLoading } = useGetAllMenuItems();
  const { mutateAsync: placeOrder, isPending } = usePlaceOrder();

  const items = (
    menuItems && menuItems.length > 0 ? menuItems : FALLBACK_ITEMS
  ).filter((i) => i.isAvailable);

  const [quantities, setQuantities] = useState<QuantityMap>({});
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrderId, setConfirmedOrderId] = useState<bigint | null>(null);

  const totalCents = useMemo(() => {
    return items.reduce((sum, item) => {
      const qty = quantities[String(item.id)] ?? 0;
      return sum + Number(item.priceCents) * qty;
    }, 0);
  }, [items, quantities]);

  const selectedCount = useMemo(
    () => Object.values(quantities).reduce((sum, q) => sum + q, 0),
    [quantities],
  );

  function setQty(itemId: bigint, delta: number) {
    const key = String(itemId);
    setQuantities((prev) => {
      const current = prev[key] ?? 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: next };
    });
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim())
      newErrors.customerName = "Please enter your name.";
    if (!contact.trim()) newErrors.contact = "Please enter a phone or email.";
    if (selectedCount === 0)
      newErrors.items = "Please select at least one item.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const orderItems: OrderItem[] = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ menuItemId: BigInt(id), quantity: BigInt(qty) }));

    try {
      const order = await placeOrder({
        customerName: customerName.trim(),
        contact: contact.trim(),
        items: orderItems,
        totalAmountCents: BigInt(totalCents),
      });
      setConfirmedOrderId(order.id);
      toast.success("Your Magal Chai order has been placed! ☕");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  function resetForm() {
    setQuantities({});
    setCustomerName("");
    setContact("");
    setErrors({});
    setConfirmedOrderId(null);
  }

  return (
    <section
      id="order"
      className="relative py-24 md:py-32 bg-cream-DEFAULT"
      aria-label="Order Online"
    >
      <div className="container mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-8 bg-saffron rounded-full" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-saffron font-semibold">
              Order Online
            </span>
            <div className="h-0.5 w-8 bg-saffron rounded-full" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
            Get Your <span className="text-saffron">Chai</span> Delivered
          </h2>
          <p className="font-body text-cinnamon-DEFAULT/70 text-base">
            Select your blends, enter your details, and we'll bring the warmth
            to you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl border border-border shadow-warm-xl overflow-hidden">
            {confirmedOrderId ? (
              <OrderConfirmation
                orderId={confirmedOrderId}
                onReset={resetForm}
              />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Item selector */}
                <div className="p-6 md:p-8 border-b border-border">
                  <h3 className="font-display text-xl font-bold text-espresso mb-6 flex items-center gap-2">
                    <ShoppingBag className="text-saffron" size={20} />
                    Select Your Blends
                  </h3>

                  {isLoading ? (
                    <div className="space-y-3">
                      {["osk1", "osk2", "osk3", "osk4"].map((id) => (
                        <Skeleton key={id} className="h-16 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => {
                        const qty = quantities[String(item.id)] ?? 0;
                        return (
                          <div
                            key={String(item.id)}
                            className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors duration-150 ${
                              qty > 0
                                ? "bg-saffron/10 border border-saffron/30"
                                : "bg-secondary border border-transparent hover:border-border"
                            }`}
                          >
                            <div className="flex-1 min-w-0 pr-4">
                              <div className="flex items-center gap-2">
                                <span className="font-body text-sm font-semibold text-espresso truncate">
                                  {item.name}
                                </span>
                                {item.isVegan && (
                                  <Badge className="shrink-0 bg-green-100 text-green-800 border-green-200 text-xs py-0 px-1.5 flex items-center gap-0.5">
                                    <Leaf size={9} />V
                                  </Badge>
                                )}
                              </div>
                              <span className="font-body text-xs text-cinnamon-DEFAULT/60">
                                {formatPrice(item.priceCents)} each
                              </span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <button
                                type="button"
                                onClick={() => setQty(item.id, -1)}
                                disabled={qty === 0}
                                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-cinnamon-DEFAULT hover:border-saffron hover:text-saffron transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label={`Decrease ${item.name}`}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-display text-base font-bold text-espresso w-6 text-center">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQty(item.id, 1)}
                                className="w-8 h-8 rounded-full border border-saffron/50 bg-saffron/10 flex items-center justify-center text-saffron hover:bg-saffron hover:text-primary-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label={`Increase ${item.name}`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {errors.items && (
                    <p
                      className="text-destructive text-sm mt-3 font-body"
                      role="alert"
                    >
                      {errors.items}
                    </p>
                  )}
                </div>

                {/* Customer details + total */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="customerName"
                        className="font-body text-sm font-medium text-espresso"
                      >
                        Your Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          setErrors((prev) => ({ ...prev, customerName: "" }));
                        }}
                        placeholder="e.g. Priya Sharma"
                        className={`font-body rounded-xl ${errors.customerName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        autoComplete="name"
                        aria-describedby={
                          errors.customerName ? "name-error" : undefined
                        }
                      />
                      {errors.customerName && (
                        <p
                          id="name-error"
                          className="text-destructive text-xs font-body"
                          role="alert"
                        >
                          {errors.customerName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="contact"
                        className="font-body text-sm font-medium text-espresso"
                      >
                        Phone / Email{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                          setErrors((prev) => ({ ...prev, contact: "" }));
                        }}
                        placeholder="e.g. 9876543210"
                        className={`font-body rounded-xl ${errors.contact ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        autoComplete="tel"
                        aria-describedby={
                          errors.contact ? "contact-error" : undefined
                        }
                      />
                      {errors.contact && (
                        <p
                          id="contact-error"
                          className="text-destructive text-xs font-body"
                          role="alert"
                        >
                          {errors.contact}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order summary */}
                  {selectedCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-saffron/8 border border-saffron/20 rounded-xl p-4 mb-6"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-body text-sm text-cinnamon-DEFAULT">
                          {selectedCount} item{selectedCount !== 1 ? "s" : ""}
                        </span>
                        <span className="font-display text-xl font-bold text-saffron">
                          ₹{(totalCents / 100).toFixed(0)}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="w-full bg-saffron hover:bg-saffron-dark text-primary-foreground font-body font-semibold text-base rounded-full py-6 shadow-warm transition-all duration-200 hover:shadow-warm-lg disabled:opacity-70"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Placing Order…
                      </>
                    ) : (
                      <>
                        Place Order{" "}
                        {totalCents > 0
                          ? `— ₹${(totalCents / 100).toFixed(0)}`
                          : ""}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {/* Wave flowing order into sustainability (dark espresso) */}
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
            d="M0,20 C480,56 960,4 1440,32 L1440,56 L0,56 Z"
            fill="oklch(0.22 0.06 45)"
          />
        </svg>
      </div>
    </section>
  );
}
