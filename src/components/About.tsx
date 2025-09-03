import { Bot, TrendingUp, Users } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
            About <span className="text-primary">Sociovia</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We help small businesses automate their ad campaigns, build smart funnels, 
            and sync leads directly into their CRM—all powered by cutting-edge AI technology.
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group hover-lift">
            <div className="w-16 h-16 primary-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-primary">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-4">AI-First Approach</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our advanced AI algorithms optimize your campaigns in real-time, 
              ensuring maximum ROI and performance across all platforms.
            </p>
          </div>

          <div className="text-center group hover-lift">
            <div className="w-16 h-16 accent-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-accent">
              <TrendingUp className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-4">Smart Automation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Automate complex marketing workflows with intelligent decision-making 
              that adapts to your business needs and market conditions.
            </p>
          </div>

          <div className="text-center group hover-lift">
            <div className="w-16 h-16 primary-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-primary">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-4">Small Business Focus</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built specifically for small businesses with limited resources, 
              providing enterprise-level capabilities at an affordable price.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center feature-gradient p-8 md:p-12 rounded-3xl shadow-soft">
          <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-6">
            Our Mission
          </h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To democratize advanced marketing technology by making AI-powered ad automation 
            accessible to every small business, enabling them to compete with larger enterprises 
            and achieve sustainable growth in the digital marketplace.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;