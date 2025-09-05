import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit } from "lucide-react";

interface Workspace {
  id: number;
  business_name: string;
  industry: string;
  business_type: string;
  website: string;
  usp: string;
  created_at: string;
  updated_at: string;
}

interface WorkspaceCap {
  name: string;
  used: number;
  limit: number;
}

export default function Workspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [caps, setCaps] = useState<WorkspaceCap[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  // ✅ load user from localStorage only once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sv_user");
      if (raw) {
        setUser(JSON.parse(raw));
      } else {
        setLoading(false); // no user, stop loading
      }
    } catch {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Fetch workspace details
        const res1 = await fetch(
          `http://127.0.0.1:5000/api/workspace/me?user_id=${user.id}`
        );
        const data1 = await res1.json();
        console.log("Workspace data:", data1);
        if (data1.success) setWorkspace(data1.workspace);

        // Fetch caps
        const res2 = await fetch(
          `http://127.0.0.1:5000/api/workspace/caps?user_id=${user.id}`
        );
        const data2 = await res2.json();
        if (data2.success) setCaps(data2.caps);
      } catch (err) {
        console.error("Error fetching workspace:", err);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div className="p-6">Loading workspace...</div>;
  }

  if (!user) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Not Logged In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Please log in to view your workspace.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>No Workspace Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You haven’t created a workspace yet. Set up your business details to continue.
            </p>
            <Button className="mt-4">Create Workspace</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Workspace Overview */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Workspace Overview</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Edit size={16} /> Edit
          </Button>
        </CardHeader>
        <CardContent className="grid gap-2">
          <p><strong>Business Name:</strong> {workspace.business_name}</p>
          <p><strong>Industry:</strong> {workspace.industry}</p>
          <p><strong>Business Type:</strong> {workspace.business_type}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={workspace.website} className="text-blue-600 underline">
              {workspace.website}
            </a>
          </p>
          <p><strong>USP:</strong> {workspace.usp}</p>
          <p className="text-sm text-gray-500">
            Last Updated: {new Date(workspace.updated_at).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Capings / Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caps.map((cap, idx) => {
          const percentage = Math.min((cap.used / cap.limit) * 100, 100);
          return (
            <Card key={idx} className="rounded-2xl shadow">
              <CardHeader>
                <CardTitle className="text-base font-semibold">{cap.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">
                    {cap.used} / {cap.limit}
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(percentage)}%
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
