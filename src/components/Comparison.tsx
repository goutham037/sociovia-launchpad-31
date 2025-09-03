import { Check, X, Crown } from "lucide-react";

const Comparison = () => {
  const comparisonData = [
    {
      feature: "Setup Time",
      traditional: "Weeks to months",
      sociovia: "Minutes",
      traditionlIcon: X,
      socioviaIcon: Check
    },
    {
      feature: "Cost Structure",
      traditional: "High upfront fees + % of ad spend",
      sociovia: "Affordable monthly subscription",
      traditionlIcon: X,
      socioviaIcon: Check
    },
    {
      feature: "Campaign Optimization",
      traditional: "Manual adjustments by humans",
      sociovia: "24/7 AI-powered optimization",
      traditionlIcon: X,
      socioviaIcon: Check
    },
    {
      feature: "Lead Integration",
      traditional: "Manual exports and imports",
      sociovia: "Automatic CRM sync",
      traditionlIcon: X,
      socioviaIcon: Check
    },
    {
      feature: "Funnel Creation",
      traditional: "Requires technical expertise",
      sociovia: "Drag-and-drop builder",
      traditionlIcon: X,
      socioviaIcon: Check
    },
    {
      feature: "Performance Insights",
      traditional: "Weekly/monthly reports",
      sociovia: "Real-time AI analytics",
      traditionlIcon: X,
      socioviaIcon: Check
    }
  ];

  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
            Why Choose <span className="text-primary">Sociovia</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how we stack up against traditional marketing agencies and outdated tools.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="feature-gradient rounded-3xl shadow-elegant p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Headers */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-secondary mb-4">Traditional Agencies</h3>
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                <X className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-muted-foreground mb-4">VS</h3>
              <div className="w-1 h-16 bg-border mx-auto rounded-full" />
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Sociovia AI</h3>
              <div className="w-16 h-16 primary-gradient rounded-2xl flex items-center justify-center mx-auto shadow-primary">
                <Crown className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Comparison Items */}
          <div className="space-y-6">
            {comparisonData.map((item, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-6 p-6 bg-background/50 rounded-2xl">
                {/* Traditional */}
                <div className="flex items-center gap-4">
                  <X className="w-6 h-6 text-destructive flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-secondary mb-1">{item.feature}</div>
                    <div className="text-sm text-muted-foreground">{item.traditional}</div>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-px h-12 bg-border" />
                </div>
                
                {/* Sociovia */}
                <div className="flex items-center gap-4">
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-secondary mb-1">{item.feature}</div>
                    <div className="text-sm text-muted-foreground">{item.sociovia}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Message */}
          <div className="text-center mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/20">
            <h4 className="text-xl font-bold text-primary mb-2">The Future is Here</h4>
            <p className="text-muted-foreground">
              Stop paying premium prices for outdated methods. 
              Join the AI revolution and scale your business effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;