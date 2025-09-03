import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Briefcase, 
  LogOut, 
  Settings,
  BarChart3,
  Target,
  Users,
  Zap,
  TrendingUp,
  Calendar,
  Bell
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

// Mock user data - in real app this would come from API
const mockUser = {
  name: "John Smith",
  email: "john@example.com", 
  phone: "+1 (555) 123-4567",
  business_name: "Smith Marketing Agency",
  industry: "Marketing",
  status: "approved",
  created_at: "2024-01-15",
  last_login: new Date().toISOString()
};

const Dashboard = () => {
  const [user, setUser] = useState(mockUser);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout');
      if (response.ok) {
        toast({
          title: "Logged out successfully",
          description: "See you next time!",
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback - still navigate to login
      navigate('/login');
    }
  };

  const stats = [
    {
      title: "Active Campaigns",
      value: "3",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Total Leads",
      value: "127",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Conversion Rate",
      value: "24.5%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Monthly ROI",
      value: "340%",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  const quickActions = [
    {
      title: "Create Campaign",
      description: "Launch a new AI-powered marketing campaign",
      icon: Zap,
      action: () => toast({ title: "Feature coming soon!", description: "Campaign creation will be available in the full release." })
    },
    {
      title: "View Analytics",
      description: "Check your performance metrics and insights",
      icon: BarChart3,
      action: () => toast({ title: "Feature coming soon!", description: "Analytics dashboard will be available in the full release." })
    },
    {
      title: "Manage Leads",
      description: "Review and organize your customer leads",
      icon: Users,
      action: () => toast({ title: "Feature coming soon!", description: "Lead management will be available in the full release." })
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Sociovia" className="h-8 w-auto" />
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-secondary">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Zap className="w-3 h-3 mr-1" />
                Pro Account
              </Badge>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="primary-gradient p-1 rounded-2xl">
          <div className="bg-background rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">
                  Welcome to Sociovia, {user.name}! 🎉
                </h2>
                <p className="text-muted-foreground">
                  Your AI-powered marketing automation platform is ready. Start creating campaigns and managing leads effortlessly.
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Last login</div>
                <div className="font-medium">{new Date(user.last_login).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Get started with these essential features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    onClick={action.action}
                    className="flex items-center gap-4 p-4 border border-primary/20 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-secondary">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">Account Owner</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Primary Email</p>
                    </div>
                  </div>

                  {user.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{user.phone}</p>
                        <p className="text-xs text-muted-foreground">Phone Number</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{user.business_name}</p>
                      <p className="text-xs text-muted-foreground">Business Name</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{user.industry}</p>
                      <p className="text-xs text-muted-foreground">Industry</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">Member Since</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <Card className="border-2 border-accent/20">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 accent-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">
              Full Platform Launching Soon! 🚀
            </h3>
            <p className="text-muted-foreground mb-4">
              This is a preview of your dashboard. The complete AI-powered marketing automation platform 
              will be available when Sociovia officially launches in 2025.
            </p>
            <Link to="/">
              <Button variant="accent">
                Learn More About Sociovia
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;