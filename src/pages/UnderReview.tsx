import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const UnderReview = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: CheckCircle2,
      title: "AI-Powered Automation",
      description: "Advanced algorithms to optimize your campaigns"
    },
    {
      icon: CheckCircle2,
      title: "CRM Integration",
      description: "Seamless lead management and customer tracking"
    },
    {
      icon: CheckCircle2,
      title: "24/7 Optimization",
      description: "Continuous improvement of your marketing performance"
    },
    {
      icon: CheckCircle2,
      title: "Real-time Analytics",
      description: "Detailed insights and performance metrics"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="Sociovia Technologies" className="mx-auto h-20 w-auto mb-6" />
        </div>

        <Card className="border-2 border-primary/20 shadow-soft">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 primary-gradient rounded-full flex items-center justify-center mx-auto animate-pulse-soft">
              <Clock className="w-10 h-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              Your Account is Under Review
            </CardTitle>
            <CardDescription className="text-lg">
              Thank you for joining Sociovia! Our team is currently reviewing your application.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Status Info */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Review in Progress</span>
              </div>
              
              <p className="text-muted-foreground">
                We typically review applications within 24-48 hours. 
                You'll receive an email notification once your account is approved.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center mb-6">What happens next?</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Application Submitted</div>
                    <div className="text-sm text-muted-foreground">Your account details have been received</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-lg border-l-4 border-accent">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Clock className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Under Review</div>
                    <div className="text-sm text-muted-foreground">Our team is verifying your information</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg opacity-60">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">Account Approved</div>
                    <div className="text-sm text-muted-foreground">You'll receive email confirmation and can access your dashboard</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center">What you'll get access to:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                    <feature.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center space-y-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Questions about your application? 
              </p>
              <p className="text-sm">
                Contact us at{" "}
                <a href="mailto:support@sociovia.com" className="text-primary hover:underline font-medium">
                  support@sociovia.com
                </a>
              </p>
              
              <div className="pt-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Current Time */}
            <div className="text-center text-xs text-muted-foreground">
              Last updated: {currentTime.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnderReview;