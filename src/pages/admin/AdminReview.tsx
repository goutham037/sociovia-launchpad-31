import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Building,
  Briefcase,
  Phone,
  Calendar,
  LogOut,
  Shield,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type PendingUser = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  industry?: string;
  created_at: string;
  status: string;
  rejection_reason?: string | null;
};

const AdminReview = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Fetch pending users with hardcoded login
  const fetchPendingUsers = async () => {
    try {
      const res = await fetch("https://sociovia-py.onrender.com/api/admin/review", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@sociovia.com",
          password: "admin123",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPendingUsers(data.users || []);
      } else {
        toast({
          title: "Failed to load users",
          description: data.error || "Check your admin credentials.",
          variant: "destructive",
        });
        navigate("/admin/login");
      }
    } catch (err) {
      console.error("Failed to fetch pending users:", err);
      toast({
        title: "Error",
        description: "Could not fetch pending users.",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (userId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://sociovia-py.onrender.com/api/admin/approve/${userId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@sociovia.com",
          password: "admin123",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPendingUsers(users => users.filter(u => u.id !== userId));
        toast({
          title: "User approved! ✅",
          description: "The user has been notified.",
        });
      } else {
        toast({
          title: "Approval failed",
          description: data.error || "Error approving user.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Approval error:", error);
      toast({
        title: "Error",
        description: "An error occurred while approving the user.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (userId: number, reason: string) => {
    if (!reason.trim()) {
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/admin/reject/${userId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@sociovia.com",
          password: "admin123",
          reason,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPendingUsers(users => users.filter(u => u.id !== userId));
        setSelectedUser(null);
        setRejectionReason("");
        toast({
          title: "User rejected",
          description: "The user has been notified.",
        });
      } else {
        toast({
          title: "Rejection failed",
          description: data.error || "Error rejecting user.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Rejection error:", error);
      toast({
        title: "Error",
        description: "An error occurred while rejecting the user.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (hours < 1) return "Less than 1 hour ago";
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Sociovia Logo" className="h-8" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <Button
            onClick={() => navigate("/admin/login")}
            variant="ghost"
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Pending User Approvals</span>
        </h2>

        {pendingUsers.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            <p>No pending users for review 🎉</p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingUsers.map((user) => (
              <Card key={user.id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{user.name}</span>
                    <Badge variant="outline">{user.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center text-sm text-muted-foreground space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.business_name && (
                    <div className="flex items-center text-sm text-muted-foreground space-x-2">
                      <Building className="h-4 w-4" />
                      <span>{user.business_name}</span>
                    </div>
                  )}
                  {user.industry && (
                    <div className="flex items-center text-sm text-muted-foreground space-x-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{user.industry}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(user.created_at)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{getTimeAgo(user.created_at)}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="default"
                      disabled={loading}
                      onClick={() => handleApprove(user.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>

                    <Dialog
                      open={selectedUser?.id === user.id}
                      onOpenChange={() => setSelectedUser(user)}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject User</DialogTitle>
                          <DialogDescription>
                            Provide a reason for rejecting <strong>{user.name}</strong>.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                          <Label htmlFor="reason">Rejection Reason</Label>
                          <Textarea
                            id="reason"
                            placeholder="Enter reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedUser(null);
                              setRejectionReason("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleReject(user.id, rejectionReason)
                            }
                            disabled={loading}
                          >
                            Reject
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminReview;
