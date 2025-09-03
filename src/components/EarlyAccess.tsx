import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EarlyAccess = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to join the waitlist.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Welcome to the waitlist! 🎉",
      description: "You'll be notified as soon as Sociovia launches in 2025.",
    });
    
    // Reset form after delay
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
            Get <span className="text-primary">Early Access</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Be among the first to experience AI-powered marketing automation. 
            Join our exclusive waitlist and get early access when we launch.
          </p>
        </div>

        {/* Form Container */}
        <div className="primary-gradient p-1 rounded-3xl shadow-primary max-w-2xl mx-auto">
          <div className="bg-background rounded-3xl p-8 md:p-12">
            {!isSubmitted ? (
              <>
                {/* Benefits List */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Early access to AI features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Special launch pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Priority customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Exclusive updates & insights</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary shadow-soft"
                      required
                    />
                  </div>
                  
                  <Button type="submit" variant="cta" size="lg" className="w-full h-14 text-lg rounded-2xl">
                    <Send className="w-5 h-5 mr-2" />
                    Join the Waitlist
                  </Button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    🔒 Your email is safe with us. No spam, just early access updates.
                  </p>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 primary-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-primary">
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  You're In! 🎉
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Welcome to the Sociovia early access list. 
                  We'll notify you as soon as we launch in 2025.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                  <Mail className="w-5 h-5" />
                  <span>Check your email for confirmation</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full text-lg font-semibold">
            <span>🚀</span>
            <span>Launching in 2025 - Be Ready!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;