import { MapPin, Clock, Mail, Instagram } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import type { FooterContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";

type FooterProps = {
  content?: FooterContent;
};

const Footer = ({ content = defaultLandingContent.footer }: FooterProps) => {
  return (
    <footer className="bg-forest-deep text-cream/80">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gold" />
              <h4 className="font-serif text-lg text-cream">Endereço</h4>
            </div>
            <p className="text-sm leading-relaxed font-sans">{content.address}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-gold" />
              <h4 className="font-serif text-lg text-cream">{content.hoursTitle}</h4>
            </div>
            {content.hours.map((hour) => (
              <p key={hour} className="text-sm font-sans">
                {hour}
              </p>
            ))}
          </div>

          <div>
            <h4 className="font-serif text-lg text-cream mb-4">{content.subscribersTitle}</h4>
            <NavLink to="/login" className="text-sm font-sans hover:text-gold transition-colors">
              {content.studentAreaLabel}
            </NavLink>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-gold" />
              <h4 className="font-serif text-lg text-cream">Contato</h4>
            </div>
            <a
              href={`mailto:${content.email}`}
              className="text-sm font-sans hover:text-gold transition-colors break-all"
            >
              {content.email}
            </a>
            <div className="flex items-center gap-2 mt-3">
              <Instagram className="w-4 h-4 text-gold" />
              <a
                href={content.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans hover:text-gold transition-colors"
              >
                {content.instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center">
          <p className="font-serif text-lg text-cream mb-1">
            {content.brand.split("Parakletos")[0]}
            <span className="text-gradient-gold">Parakletos</span>
          </p>
          <p className="text-xs text-cream/40 font-sans">
            © {new Date().getFullYear()} {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
