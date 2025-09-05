import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Settings,
  BarChart3,
  Target,
  Users,
  Zap,
  TrendingUp,
  Bell,
  Link as LinkIcon,
  Key,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type UserModel = {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  industry?: string;
  status?: string;
  created_at?: string;
  last_login?: string;
};

const API_ME = "https://sociovia-py.onrender.com/api/me";

const Dashboard = (): JSX.Element => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [binding, setBinding] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Try local cache first (prototype-friendly), fallback to API
  useEffect(() => {
    const load = async () => {
      setLoadingUser(true);

      // 1) local cache (fast)
      const cached = localStorage.getItem("sv_user");
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as UserModel;
          setUser(parsed);
          setLoadingUser(false);
          return;
        } catch (err) {
          console.warn("Failed to parse cached user, clearing cache", err);
          localStorage.removeItem("sv_user");
        }
      }

      // 2) fallback: call API
      try {
        const res = await fetch(API_ME, { credentials: "include" });
        if (res.status === 401) {
          // server says unauthorized — go to login
          navigate("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch user");
        let data: any = null;
        try { data = await res.json(); } catch (err) { /* non-json */ }
        const u = data?.user ?? data;
        if (u) {
          setUser(u);
          // also cache for prototyping convenience
          try { localStorage.setItem("sv_user", JSON.stringify(u)); } catch {}
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Error loading user", err);
        navigate("/login"); // safe fallback
      } finally {
        setLoadingUser(false);
      }
    };

    load();
  }, [navigate]);

  const handleBindMeta = async () => {
    setBinding(true);
    try {
      toast({ title: "Bind Meta Business", description: "Start Meta binding flow (placeholder)." });
      // placeholder behavior — implement flow later
      setTimeout(() => toast({ title: "Bind started", description: "Follow the Meta flow to complete." }), 600);
    } catch {
      toast({ title: "Failed", description: "Could not start binding flow", variant: "destructive" });
    } finally {
      setBinding(false);
    }
  };

  const handleManageUsers = () => navigate("/workspace/users");

  const handleLogout = async () => {
    try {
      // optional server logout (ignore failure)
      await fetch("https://sociovia-py.onrender.com/api/logout", {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
    } catch {
      /* ignore */
    } finally {
      // clear local cache used for prototype
      localStorage.removeItem("sv_user");
      navigate("/login");
    }
  };

  if (loadingUser) {
    return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>;
  }

  if (!user) {
    return <div className="p-8 text-center text-destructive">No user data available.</div>;
  }

  const stats = [
    { title: "Active Campaigns", value: "3", icon: Target, hint: "Live campaigns" },
    { title: "Total Leads", value: "127", icon: Users, hint: "Collected leads" },
    { title: "Conversion Rate", value: "24.5%", icon: TrendingUp, hint: "Average" },
    { title: "Monthly ROI", value: "340%", icon: BarChart3, hint: "Performance" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Sociovia" className="h-8 w-auto" />
            <div>
              <h1 className="text-lg font-semibold text-secondary">Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage your workspace & accounts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary">
              Workspace • {user.business_name ?? "—"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => toast({ title: "Notifications", description: "No new notifications" })}>
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/settings")}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto p-6 grid gap-8 lg:grid-cols-3">
        {/* Left: Welcome + Stats */}
        <section className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardContent className="flex items-center justify-between gap-6 p-6">
              <div>
                <h2 className="text-2xl font-bold text-secondary">Welcome back, {user.name}.</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage campaigns, connect your Meta Business account, and control user permissions from here.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <Button onClick={() => navigate("/workspace/setup")} variant="cta">
                    <Zap className="h-4 w-4 mr-2" />Workspace Setup
                  </Button>
                  <Button onClick={() => navigate("/workspace/bind-meta")} variant="cta" >
                    <LinkIcon className="h-4 w-4 mr-2" />Bind Meta Business
                  </Button>
                  <Button onClick={handleManageUsers} variant="ghost">
                    <Key className="h-4 w-4 mr-2" />User & Permissions
                  </Button>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-end text-right">
                <div className="text-xs text-muted-foreground">Last login</div>
                <div className="font-medium">
                  {new Date(user.last_login ?? user.created_at ?? Date.now()).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-2">Status</div>
                <div className="mt-1">
                  <Badge className={`px-3 py-1 ${user.status === "approved" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-amber-700"}`}>
                    {user.status ?? "unknown"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.title} className="border-0 shadow-sm">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{s.title}</p>
                      <p className="text-xl font-semibold text-secondary mt-1">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.hint}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Workspace & Ads */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="p-5">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Workspace & Ads Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/20">
                  <div className="text-sm font-medium">Bind Meta</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Connect your Meta Business Manager to serve ads and sync inventories.
                  </div>
                  <div className="mt-3">
                    <Button onClick={handleBindMeta} className="w-full" variant="cta">Bind Meta</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/20">
                  <div className="text-sm font-medium">User & Permission Management</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Invite teammates and assign granular roles (Admin, Manager, Analyst).
                  </div>
                  <div className="mt-3">
                    <Button onClick={handleManageUsers} className="w-full" variant="outline">Manage Users</Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/20">
                  <div className="text-sm font-medium">Ad Accounts & Pixels</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Link ad accounts and pixels to track conversions and audiences.
                  </div>
                  <div className="mt-3">
                    <Button onClick={() => navigate("/workspace/ad-accounts")} className="w-full" variant="ghost">
                      Manage Ad Accounts
                    </Button>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground">
                Pro tip: Bind your Meta Business account first so we can automatically suggest audience segments and creatives.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Right: Account details */}
        <aside className="space-y-6">
          <Card className="sticky top-6 border-0 shadow-sm">
            <CardHeader className="p-5">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="text-sm text-muted-foreground">Owner</div>
              <div className="font-medium">{user.name}</div>
              <div className="mt-3 text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{user.email}</div>
              {user.phone && (
                <>
                  <div className="mt-3 text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium">{user.phone}</div>
                </>
              )}
              <div className="mt-3 text-sm text-muted-foreground">Business</div>
              <div className="font-medium">{user.business_name ?? "—"}</div>
              <div className="text-xs text-muted-foreground">{user.industry ?? "—"}</div>
              <div className="mt-4">
                <Button onClick={() => navigate("/settings/profile")} size="sm" variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Team preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="p-5">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Team & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div className="text-sm text-muted-foreground">Invite team members and give roles.</div>
              <div className="mt-3">
                <Button onClick={handleManageUsers} size="sm" className="w-full">
                  Manage team & permissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;
