import { MapPin, Clock, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest-deep text-cream/80">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Endereço */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gold" />
              <h4 className="font-serif text-lg text-cream">Endereço</h4>
            </div>
            <p className="text-sm leading-relaxed font-sans">
              Balneário Camboriú, SC
            </p>
          </div>

          {/* Horas */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-gold" />
              <h4 className="font-serif text-lg text-cream">Horário</h4>
            </div>
            <p className="text-sm font-sans">Segunda-feira — Sexta-feira</p>
            <p className="text-sm font-sans">8h — 18h</p>
          </div>

          {/* Contato */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-gold" />
              <h4 className="font-serif text-lg text-cream">Contato</h4>
            </div>
            <a
              href="mailto:parakletosconsultoriaeinovacao@gmail.com"
              className="text-sm font-sans hover:text-gold transition-colors break-all"
            >
              parakletosconsultoriaeinovacao@gmail.com
            </a>
            <div className="flex items-center gap-2 mt-3">
              <Instagram className="w-4 h-4 text-gold" />
              <a
                href="https://instagram.com/institutoparakletos_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans hover:text-gold transition-colors"
              >
                @institutoparakletos_
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center">
          <p className="font-serif text-lg text-cream mb-1">
            Instituto <span className="text-gradient-gold">Parakletos</span>
          </p>
          <p className="text-xs text-cream/40 font-sans">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
