"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  FacebookIcon,
  InstagramIcon,
  LeafIcon,
  ShieldIcon,
  SparklesIcon,
  TruckIcon,
} from "@/components/icons";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-border bg-stone-900 text-stone-200">
      {/* Trust & Value Pillars */}
      <div className="border-b border-stone-800 py-10 bg-stone-950/40">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-primary">
                <TruckIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Free Express Delivery</h4>
                <p className="text-xs text-stone-400 mt-0.5">Across Nepal on orders over NPR 2,000</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-primary">
                <ShieldIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Authentic & Safe</h4>
                <p className="text-xs text-stone-400 mt-0.5">Directly sourced & dermatologically tested</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-primary">
                <LeafIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Clean & Cruelty-Free</h4>
                <p className="text-xs text-stone-400 mt-0.5">No parabens, sulfates, or animal testing</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-primary">
                <SparklesIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Science-Led Results</h4>
                <p className="text-xs text-stone-400 mt-0.5">Formulations with clinically proven actives</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-serif font-bold text-white shadow-sm">
                  B
                </span>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  bunchle
                </span>
              </Link>
              <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
                Science-backed beauty and wellness rituals crafted for modern living. Curated with botanical integrity and clinical potency.
              </p>

              {/* Newsletter Box */}
              <div className="mt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Join the Bunchle Club
                </h4>
                <p className="text-xs text-stone-400 mt-1 mb-3">
                  Receive 10% off your first order and exclusive skincare science guides.
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-lg text-emerald-300 text-xs font-medium">
                    <CheckIcon className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>You&apos;re in! Check your inbox for your welcome voucher.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="h-10 flex-1 rounded-lg border border-stone-700 bg-stone-800/90 px-3 text-xs text-white placeholder:text-stone-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button type="submit" size="sm" variant="primary">
                      Subscribe
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Shop Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Shop Essentials
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-stone-400">
                <li><Link href="#skincare" className="hover:text-white transition-colors">Daily Facial Serums</Link></li>
                <li><Link href="#skincare" className="hover:text-white transition-colors">Barrier Hydration Creams</Link></li>
                <li><Link href="#skincare" className="hover:text-white transition-colors">Gentle Gel Cleansers</Link></li>
                <li><Link href="#body" className="hover:text-white transition-colors">Body Care & Exfoliators</Link></li>
                <li><Link href="#wellness" className="hover:text-white transition-colors">Adaptogenic Teas & Wellness</Link></li>
                <li><Link href="#offers" className="hover:text-white transition-colors text-primary">Special Gift Bundles</Link></li>
              </ul>
            </div>

            {/* Customer Care Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Customer Care
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-stone-400">
                <li><Link href="#" className="hover:text-white transition-colors">Shipping & Delivery Rates</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Order Tracking</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Skincare Consultation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            {/* About Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                About Bunchle
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-stone-400">
                <li><Link href="#" className="hover:text-white transition-colors">Our Science & Sourcing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Clinical Studies</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Sustainability Commitments</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Kathmandu Flagship Store</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800 py-6 bg-stone-950">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Bunchle Beauty Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <div className="flex items-center gap-3 ml-2">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white" aria-label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white" aria-label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
