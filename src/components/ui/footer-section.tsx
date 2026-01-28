"use client";

import * as React from "react";
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const data = {
  instaLink: "https://www.instagram.com/nxtgen_2k26/",
  services: {
    tracks: "#tracks",
    format: "#format",
    workshops: "#workshops",
    prizes: "#prizes",
  },
  about: {
    vision: "#vision",
    pitch: "#pitch",
    mentors: "#mentors",
    sponsors: "#sponsors",
  },
  help: {
    faqs: "#faq",
    contact: "#contact",
    venue: "#venue",
  },
  contact: {
    email: "hackathon@srmrmp.com",
    instagram: "@nxtgen_2k26",
    address: "IVB, Express Avenue, Chennai, TamilNadu",
  },
  company: {
    name: "NXTGEN'26",
    description:
      "International Hackathon under TEXUS 2026. Organised by SRM Institute of Science and Technology, Ramapuram.",
    logo: "/assets/logo/logo.png",
  },
};

const socialLinks = [];

const aboutLinks = [
  { text: "About", href: data.about.vision },
  { text: "Pitch", href: data.about.pitch },
  { text: "Mentors", href: data.about.mentors },
  { text: "Sponsors", href: data.about.sponsors },
];

const serviceLinks = [
  { text: "Tracks", href: data.services.tracks },
  { text: "Format", href: data.services.format },
  { text: "Workshops", href: data.services.workshops },
  { text: "Prizes", href: data.services.prizes },
];

const helpfulLinks = [
  { text: "FAQs", href: data.help.faqs },
  { text: "Contact", href: data.help.contact },
  { text: "Venue", href: data.help.venue },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email, href: `mailto:${data.contact.email}` },
  { icon: Instagram, text: data.contact.instagram, href: "https://www.instagram.com/nxtgen_2k26/" },
  { icon: MapPin, text: data.contact.address, isAddress: true, href: "#venue" },
];

export function Footerdemo() {
  return (
    <footer id="footer" className="bg-black w-full mt-auto">
      <div className="w-full px-4 pt-8 pb-6 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center sm:justify-start">
              <img
                src={data.company.logo || "/placeholder.svg"}
                alt="logo"
                className="h-auto w-auto max-w-[200px]"
                loading="lazy"
              />
            </div>

            <p className="text-white font-body font-bold text-lg md:text-xl mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              {data.company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-400 transition"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-xl md:text-2xl font-body font-bold text-white">About Us</p>
              <ul className="mt-8 space-y-4 text-base md:text-lg">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-white font-body font-bold transition hover:text-purple-400"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xl md:text-2xl font-body font-bold text-white">Our Services</p>
              <ul className="mt-8 space-y-4 text-base md:text-lg">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-white font-body font-bold transition hover:text-purple-400"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xl md:text-2xl font-body font-bold text-white">Helpful Links</p>
              <ul className="mt-8 space-y-4 text-base md:text-lg">
                {helpfulLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className="text-white font-body font-bold transition hover:text-purple-400"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xl md:text-2xl font-body font-bold text-white">Contact Us</p>
              <ul className="mt-8 space-y-4 text-base md:text-lg">
                {contactInfo.map(({ icon: Icon, text, isAddress, href }) => (
                  <li key={text}>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start"
                      href={href || '#'}
                    >
                      <Icon className="text-purple-500 size-5 shrink-0 shadow-sm" />
                      {isAddress ? (
                        <address className="text-white font-body font-bold -mt-0.5 flex-1 not-italic transition">
                          {text}
                        </address>
                      ) : (
                        <span className="text-white font-body font-bold flex-1 transition">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-base md:text-lg font-body font-bold text-white">
              <span className="block sm:inline">All rights reserved.</span>
            </p>

            <p className="text-white font-body font-bold mt-4 text-base md:text-lg transition sm:order-first sm:mt-0">
              &copy; 2026 {data.company.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
