import { Droplets, Heart, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const footerLinks = {
  organization: [
    { label: "About Us", href: "/about" },
    { label: "Mission & Vision", href: "/mission" },
    { label: "Our Team", href: "/team" },
    { label: "Success Stories", href: "/stories" },
    { label: "Gallery", href: "/gallery" },
  ],
  services: [
    { label: "Find Donors", href: "/donors/search" },
    { label: "Emergency Request", href: "/emergency" },
    { label: "Blood Campaigns", href: "/campaigns" },
    { label: "Events", href: "/events" },
    { label: "Volunteer", href: "/volunteer/register" },
  ],
  support: [
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact" },
    { label: "Become a Donor", href: "/become-donor" },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaXTwitter, href: "#", label: "Twitter" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-white/8">
      {/* Blood group ticker */}
      <div className="bg-red-600 py-2.5 overflow-hidden">
        <div className="flex">
          <div className="flex items-center gap-5 px-6 whitespace-nowrap text-white text-sm font-bold flex-wrap sm:flex-nowrap">
            <span className="opacity-80 font-normal text-xs uppercase tracking-widest shrink-0">
              We accept:
            </span>
            {bloodGroups.map((g) => (
              <span key={g} className="flex items-center gap-1">
                <Droplets
                  size={12}
                  fill="currentColor"
                  className="opacity-70"
                />
                {g}
              </span>
            ))}
            <span className="opacity-40 shrink-0">·</span>
            <span className="opacity-80 font-normal text-xs uppercase tracking-widest shrink-0">
              Every drop counts
            </span>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand col */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-5">
              <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-red-600 group-hover:bg-red-500 transition-colors shrink-0">
                <Droplets className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Blood<span className="text-red-600">Aid</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 max-w-xs">
              PUB Blood Aid Organization — connecting donors and
              volunteers to save lives across our campus and community.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-red-500" />
                <span>Pundra University of Science & Technology, Bogura</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <Mail size={14} className="shrink-0 text-red-500" />
                <a
                  href="mailto:bloodaid@pub.ac.bd"
                  className="hover:text-red-600 dark:hover:text-red-500 transition-colors"
                >
                  bloodaid@pub.ac.bd
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <Phone size={14} className="shrink-0 text-red-500" />
                <a
                  href="tel:+8801700000000"
                  className="hover:text-red-600 dark:hover:text-red-500 transition-colors"
                >
                  +880 1700-000000
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:border-red-500 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Organization */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
              Organization
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.organization.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.support.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold bg-red-600 hover:bg-red-500 text-white rounded-full transition-all duration-200 shadow-md shadow-red-600/30"
            >
              <Droplets size={13} fill="currentColor" />
              Donate Blood
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-200 dark:border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} tanzid mondol.
          </p>
          <p className="text-xs text-zinc-500 flex items-center gap-1.5">
            Made with <Heart size={11} className="text-red-500 fill-red-500" />{" "}
            to save lives
          </p>
        </div>
      </div>
    </footer>
  );
}
