import { 
  UserPlus, 
  Link, 
  Rocket, 
  Target, 
  BarChart3,
  ArrowRight 
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your Sociovia account in minutes. No complex setup or technical knowledge required.",
      color: "primary"
    },
    {
      icon: Link,
      title: "Connect Meta",
      description: "Securely link your Facebook and Instagram accounts with one-click integration.",
      color: "accent"
    },
    {
      icon: Rocket,
      title: "Launch Ads",
      description: "Our AI creates and launches optimized campaigns based on your business goals and target audience.",
      color: "primary"
    },
    {
      icon: Target,
      title: "Capture Leads",
      description: "High-converting landing pages and funnels automatically capture and qualify your leads.",
      color: "accent"
    },
    {
      icon: BarChart3,
      title: "Track Results",
      description: "Monitor performance in real-time with detailed analytics and AI-powered insights for continuous improvement.",
      color: "primary"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From setup to success in 5 simple steps. Our AI handles the complexity 
            while you focus on growing your business.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 md:space-y-0">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="grid md:grid-cols-12 gap-8 items-center">
                {/* Step Number & Icon */}
                <div className={`md:col-span-2 flex flex-col items-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative">
                    <div className={`w-20 h-20 ${step.color === 'primary' ? 'primary-gradient' : 'accent-gradient'} rounded-3xl flex items-center justify-center shadow-soft hover:shadow-${step.color} transition-smooth`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`md:col-span-8 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className={`feature-gradient p-8 rounded-3xl shadow-soft hover-lift ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'} text-${step.color} font-semibold`}>
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>

                {/* Empty space for balance */}
                <div className={`md:col-span-2 ${index % 2 === 0 ? 'md:order-3' : 'md:order-3'}`}>
                </div>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="w-px h-16 bg-gradient-to-b from-primary to-accent opacity-30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="feature-gradient p-8 rounded-3xl shadow-soft max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join the waitlist and be among the first to experience 
              the future of AI-powered marketing automation.
            </p>
            <div className="flex items-center justify-center gap-4 text-primary font-semibold">
              <Rocket className="w-5 h-5" />
              <span>Launching Soon in 2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;