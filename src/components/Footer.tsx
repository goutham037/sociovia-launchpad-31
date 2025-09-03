import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Early Access", href: "#early-access" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="Sociovia Technologies" className="h-12 w-auto" />
                <div>
                  <h3 className="text-xl font-bold">Sociovia Technologies</h3>
                  <p className="text-secondary-foreground/70 text-sm">Private Limited</p>
                </div>
              </div>
              
              <p className="text-secondary-foreground/80 leading-relaxed mb-6 max-w-md">
                Revolutionizing small business marketing with AI-powered automation. 
                Build, optimize, and scale your business effortlessly with our 
                cutting-edge platform.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-secondary-foreground/70">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>hello@sociovia.com</span>
                </div>
                <div className="flex items-center gap-3 text-secondary-foreground/70">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>Coming Soon</span>
                </div>
                <div className="flex items-center gap-3 text-secondary-foreground/70">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>India</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-secondary-foreground/70 hover:text-accent transition-smooth hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal & Social */}
            <div>
              <h4 className="font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-3 mb-8">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-secondary-foreground/70 hover:text-accent transition-smooth hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Social Media */}
              <div>
                <h5 className="font-semibold mb-4">Follow Us</h5>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-accent-foreground hover:shadow-accent hover:-translate-y-1 transition-smooth"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/20 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-secondary-foreground/70 text-sm">
            © {new Date().getFullYear()} Sociovia Technologies Private Limited. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-accent">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-soft" />
              <span>Launching Soon in 2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;