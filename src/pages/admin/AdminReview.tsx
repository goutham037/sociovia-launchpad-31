import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

// Mock data - in real app this would come from API
const mockPendingUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@marketingpro.com",
    phone: "+1 (555) 123-4567",
    business_name: "Marketing Pro Agency",
    industry: "Marketing",
    created_at: "2024-01-20T10:30:00Z",
    status: "under_review"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@techstartup.io",
    phone: "+1 (555) 987-6543",
    business_name: "TechStartup Solutions",
    industry: "Technology",
    created_at: "2024-01-20T14:15:00Z",
    status: "under_review"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@healthcare-plus.com",
    phone: "",
    business_name: "Healthcare Plus",
    industry: "Healthcare",
    created_at: "2024-01-21T09:00:00Z",
    status: "under_review"
  }
];

const AdminReview = () => {
  const [pendingUsers, setPendingUsers] = useState(mockPendingUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch('/admin/logout');
      if (response.ok) {
        toast({
          title: "Logged out successfully",
          description: "Admin session ended.",
        });
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/admin/login');
    }
  };

  const handleApprove = async (userId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/approve/${userId}`, {
        method: 'POST',
      });

      if (response.ok) {
        setPendingUsers(users => users.filter(user => user.id !== userId));
        toast({
          title: "User approved! ✅",
          description: "The user has been notified and can now access their dashboard.",
        });
      } else {
        toast({
          title: "Approval failed",
          description: "There was an error approving this user.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Approval error:', error);
      toast({
        title: "Error",
        description: "An error occurred while approving the user.",
        variant: "destructive"
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
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("reason", reason);

      const response = await fetch(`/admin/reject/${userId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setPendingUsers(users => users.filter(user => user.id !== userId));
        setSelectedUser(null);
        setRejectionReason("");
        toast({
          title: "User rejected",
          description: "The user has been notified of the rejection.",
        });
      } else {
        toast({
          title: "Rejection failed",
          description: "There was an error rejecting this user.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Rejection error:', error);
      toast({
        title: "Error",
        description: "An error occurred while rejecting the user.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (hours < 1) return "Less than 1 hour ago";
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Sociovia" className="h-8 w-auto" />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-secondary">Admin Dashboard</h1>
                  <p className="text-sm text-muted-foreground">User Review Panel</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Reviews</p>
                  <p className="text-2xl font-bold text-secondary">{pendingUsers.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-secondary">47</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Approved Today</p>
                  <p className="text-2xl font-bold text-secondary">5</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Pending User Reviews
            </CardTitle>
            <CardDescription>
              Users waiting for account approval ({pendingUsers.length} total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingUsers.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary mb-2">All caught up!</h3>
                <p className="text-muted-foreground">No pending user reviews at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <Card key={user.id} className="border border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-secondary">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{getTimeAgo(user.created_at)}</p>
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              Under Review
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span>{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{user.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-muted-foreground" />
                              <span>{user.business_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-muted-foreground" />
                              <span>{user.industry}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>Submitted: {formatDate(user.created_at)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review User Application</DialogTitle>
                                <DialogDescription>
                                  Review the user details and decide whether to approve or reject their application.
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Full Name</Label>
                                    <p className="text-sm text-muted-foreground mt-1">{user.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Email Address</Label>
                                    <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Business Name</Label>
                                    <p className="text-sm text-muted-foreground mt-1">{user.business_name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Industry</Label>
                                    <p className="text-sm text-muted-foreground mt-1">{user.industry}</p>
                                  </div>
                                  {user.phone && (
                                    <div>
                                      <Label className="text-sm font-medium">Phone</Label>
                                      <p className="text-sm text-muted-foreground mt-1">{user.phone}</p>
                                    </div>
                                  )}
                                  <div>
                                    <Label className="text-sm font-medium">Application Date</Label>
                                    <p className="text-sm text-muted-foreground mt-1">{formatDate(user.created_at)}</p>
                                  </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                  <Label className="text-sm font-medium">Rejection Reason (if rejecting)</Label>
                                  <Textarea
                                    placeholder="Enter reason for rejection (optional if approving)"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    rows={3}
                                  />
                                </div>

                                <div className="flex gap-3 justify-end">
                                  <Button
                                    variant="outline"
                                    onClick={() => handleReject(user.id, rejectionReason)}
                                    disabled={loading}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button
                                    onClick={() => handleApprove(user.id)}
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReview;