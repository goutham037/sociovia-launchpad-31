import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Shield, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const VerifyEmail = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Countdown timer for resend button
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("code", formData.code);

      const response = await fetch('/verify-email', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.redirected || response.ok) {
        toast({
          title: "Email verified successfully! ✅",
          description: "Your account is now under review.",
        });
        navigate('/under-review');
      } else {
        const text = await response.text();
        setError("Invalid verification code or email");
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!formData.email) {
      setError("Please enter your email first");
      return;
    }

    setResending(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);

      const response = await fetch('/resend-code', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        toast({
          title: "Code resent! 📧",
          description: "Check your email for the new verification code.",
        });
        setCountdown(60); // 60 second cooldown
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } catch (error) {
      console.error('Resend error:', error);
      setError("An error occurred while resending code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="Sociovia Technologies" className="mx-auto h-16 w-auto mb-4" />
          <h1 className="text-2xl font-bold text-secondary">Verify Your Email</h1>
          <p className="text-muted-foreground">Enter the verification code sent to your email</p>
        </div>

        <Card className="border-2 border-primary/20 shadow-soft">
          <CardHeader className="space-y-1 text-center">
            <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a 6-digit verification code to your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-destructive/50">
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={formData.code}
                    onChange={(e) => handleChange("code", e.target.value)}
                    className="pl-10 text-center text-lg font-mono tracking-wider"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" variant="cta" disabled={loading}>
                {loading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResendCode}
                  disabled={resending || countdown > 0}
                  className="w-full"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${resending ? 'animate-spin' : ''}`} />
                  {countdown > 0 ? `Resend in ${countdown}s` : resending ? "Sending..." : "Resend Code"}
                </Button>
              </div>

              <div className="text-center">
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  ← Back to Login
                </Link>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                🔒 Check your spam folder if you don't see the email. 
                The code expires in 10 minutes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;