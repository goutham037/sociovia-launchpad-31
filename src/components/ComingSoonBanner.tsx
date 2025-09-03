import { Rocket, Sparkles } from "lucide-react";

const ComingSoonBanner = () => {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 primary-gradient opacity-90" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 animate-pulse-soft" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-4 left-10 w-12 h-12 bg-white/20 rounded-full animate-float" />
      <div className="absolute bottom-4 right-10 w-8 h-8 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-8 right-20 w-6 h-6 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Sparkles className="w-8 h-8 text-white animate-pulse-soft" />
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Launching Soon in 2025
          </h2>
          <Rocket className="w-8 h-8 text-white animate-bounce" />
        </div>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          The future of AI-powered marketing automation is almost here. 
          Get ready to revolutionize your business growth!
        </p>
        
        {/* Countdown or Progress Indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-2xl md:text-3xl font-bold text-white">AI</div>
            <div className="text-white/80 text-sm">Powered</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
            <div className="text-white/80 text-sm">Automation</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-2xl md:text-3xl font-bold text-white">∞</div>
            <div className="text-white/80 text-sm">Scalability</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-2xl md:text-3xl font-bold text-white">2025</div>
            <div className="text-white/80 text-sm">Launch Year</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8">
          <div className="bg-white/20 rounded-full h-3 max-w-md mx-auto overflow-hidden">
            <div className="bg-white rounded-full h-full w-3/4 shadow-soft animate-pulse-soft" />
          </div>
          <p className="text-white/80 mt-2 text-sm">Development Progress: 75% Complete</p>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonBanner;