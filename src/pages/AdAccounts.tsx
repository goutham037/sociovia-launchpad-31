import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type AdAccount = { id: string; name: string; connected_at?: string };

const API_LIST = "http://127.0.0.1:5000/api/workspace/ad-accounts";
const API_CONNECT = "http://127.0.0.1:5000/api/workspace/ad-accounts/connect";

const AdAccounts = (): JSX.Element => {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_LIST, { credentials: "include" });
        let data: any = null;
        try { data = await res.json(); } catch {}
        if (res.ok && data?.accounts) {
          setAccounts(data.accounts);
        } else {
          // prototype sample
          setAccounts([{ id: "act_1", name: "Demo Ad Account", connected_at: new Date().toISOString() }]);
        }
      } catch (err) {
        console.error("Ad accounts load error", err);
        setAccounts([{ id: "act_1", name: "Demo Ad Account", connected_at: new Date().toISOString() }]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const connect = async () => {
    // prototype: open Meta connect flow in popup
    const popupUrl = "https://example.com/connect-ad-account";
    window.open(popupUrl, "connect_ad", "width=900,height=700");
    toast({ title: "Connect started", description: "Complete the flow in the popup." });
  };

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Ad Accounts</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Connected ad accounts</div>
            <div>
              <Button onClick={connect}>Connect Ad Account</Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {loading && <div className="text-xs text-muted-foreground">Loading…</div>}
          {accounts.map(a => (
            <div key={a.id} className="p-3 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{a.name}</div>
                <div className="text-xs text-muted-foreground">ID: {a.id}</div>
              </div>
              <div className="text-xs text-muted-foreground">{a.connected_at ? new Date(a.connected_at).toLocaleString() : "—"}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdAccounts;
