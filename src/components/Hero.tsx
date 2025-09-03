import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-40 right-20 w-12 h-12 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-slide-up">
          <img 
            src={logo} 
            alt="Sociovia Technologies" 
            className="mx-auto h-24 w-auto mb-6"
          />
        </div>
        
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-slide-up">
          <Sparkles className="w-4 h-4" />
          <span>Launching Soon in 2025</span>
          <span className="text-lg">🚀</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6 animate-slide-up leading-tight">
          AI is the Future —
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Launching Soon
          </span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed">
          Revolutionizing ad automation and CRM for small businesses with AI-powered solutions. 
          Build, optimize, and scale your marketing effortlessly.
        </p>
        
        {/* CTA Button */}
        <div className="animate-slide-up">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
            Get Early Access
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        
        {/* Stats or Social Proof */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-fade-in">
          <div>
            <div className="text-2xl font-bold text-primary">AI-Powered</div>
            <div className="text-muted-foreground">Smart Automation</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">24/7</div>
            <div className="text-muted-foreground">Campaign Optimization</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">Direct CRM</div>
            <div className="text-muted-foreground">Lead Integration</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-soft">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full p-1">
          <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;