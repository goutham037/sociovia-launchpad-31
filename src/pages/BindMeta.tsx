import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  PlugZap,
  ShieldCheck,
  ShieldAlert,
  Link2,
  RefreshCw,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Lock,
  Users,
} from "lucide-react";

// =============================================
// Types
// =============================================

export type SocialAccount = {
  id: number;
  provider: "facebook" | "meta";
  provider_user_id: string;
  name?: string;
  business_name?: string;
  token_expires_at?: string | null;
  scopes?: string[];
  status?: "linked" | "expired" | "revoked" | "error";
  profile?: Record<string, any>;
};

export type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
};

export type AppPermission =
  | "view_ads"
  | "create_campaigns"
  | "manage_assets"
  | "read_insights";

export type MemberPermissions = {
  userId: number;
  adAccountId?: string;
  permissions: Record<AppPermission, boolean>;
};

// =============================================
// Helpers
// =============================================
const fetchJSON = async <T,>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch("http://127.0.0.1:5000" + url, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
};

const niceDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso || "—";
  }
};

const chipForStatus = (status?: SocialAccount["status"]) => {
  switch (status) {
    case "linked":
      return (
        <Badge variant="secondary" className="gap-1">
          <CheckCircle className="h-3 w-3" /> Linked
        </Badge>
      );
    case "expired":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" /> Expired
        </Badge>
      );
    case "revoked":
      return (
        <Badge variant="outline" className="gap-1">
          <ShieldAlert className="h-3 w-3" /> Revoked
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// =============================================
// Main Component
// =============================================

type Props = {
  workspaceId?: number; // now optional
};

export default function MetaLinkingAndPermissions({ workspaceId }: Props) {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [linking, setLinking] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [adAccounts, setAdAccounts] = useState<{ id: string; name: string }[]>([]);
  const [matrix, setMatrix] = useState<MemberPermissions[]>([]);
  const [saving, setSaving] = useState(false);
  const popupRef = useRef<Window | null>(null);

  const grantedScopes = useMemo(() => {
    const all = new Set<string>();
    accounts.forEach((a) => (a.scopes || []).forEach((s) => all.add(s)));
    return Array.from(all);
  }, [accounts]);

  // Initial load
  useEffect(() => {
    if (!workspaceId) return; // guard
    let alive = true;
    const run = async () => {
      try {
        setLoading(true);
        const [accRes, teamRes, permsRes, adsRes] = await Promise.all([
          fetchJSON<{ success: boolean; accounts: SocialAccount[] }>(`/api/social/accounts?provider=meta`),
          fetchJSON<{ success: boolean; members: TeamMember[] }>(`/api/team?workspace_id=${workspaceId}`),
          fetchJSON<{ success: boolean; data: MemberPermissions[] }>(`/api/social/permissions?workspace_id=${workspaceId}`),
          fetchJSON<{ success: boolean; data: { id: string; name: string }[] }>(`/api/social/meta/ad-accounts`),
        ]);
        if (!alive) return;
        setAccounts(accRes.accounts || []);
        setMembers(teamRes.members || []);
        setMatrix(permsRes.data || []);
        setAdAccounts(adsRes.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [workspaceId]);

  // Link flow
  const beginLink = async () => {
    if (!workspaceId) return;
    try {
      setLinking(true);
      const { url } = await fetchJSON<{ success: boolean; url: string }>(
        `/api/social/meta/auth-url?workspace_id=${workspaceId}`
      );
      popupRef.current = window.open(
        url,
        "meta_oauth",
        "width=900,height=750,menubar=no,toolbar=no,location=no,status=no"
      );
      const timer = setInterval(async () => {
        if (!popupRef.current || popupRef.current.closed) {
          clearInterval(timer);
          try {
            const accRes = await fetchJSON<{ success: boolean; accounts: SocialAccount[] }>(
              `/api/social/accounts?provider=meta`
            );
            setAccounts(accRes.accounts || []);
          } catch (e) {
            console.error(e);
          } finally {
            setLinking(false);
          }
        }
      }, 750);
    } catch (e) {
      console.error(e);
      setLinking(false);
    }
  };

  const unlink = async (accountId: number) => {
    try {
      await fetchJSON(`/api/social/meta/unlink`, {
        method: "POST",
        body: JSON.stringify({ account_id: accountId }),
      });
      setAccounts((prev) => prev.filter((a) => a.id !== accountId));
    } catch (e) {
      console.error(e);
    }
  };

  const setCell = (userId: number, perm: AppPermission, value: boolean, adAccountId?: string) => {
    setMatrix((prev) => {
      const copy = [...prev];
      let row = copy.find((r) => r.userId === userId && (!adAccountId || r.adAccountId === adAccountId));
      if (!row) {
        row = {
          userId,
          adAccountId,
          permissions: { view_ads: false, create_campaigns: false, manage_assets: false, read_insights: false },
        };
        copy.push(row);
      }
      row.permissions = { ...row.permissions, [perm]: value };
      if (adAccountId) row.adAccountId = adAccountId;
      return copy;
    });
  };

  const save = async () => {
    if (!workspaceId) return;
    try {
      setSaving(true);
      await fetchJSON(`/api/social/permissions/save`, {
        method: "POST",
        body: JSON.stringify({ workspace_id: workspaceId, data: matrix }),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full mx-auto grid gap-6">
      {/* Linking */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <PlugZap className="h-5 w-5" /> Link Meta (Facebook) Business
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={beginLink} disabled={!workspaceId || linking} className="gap-2">
              {linking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
              {linking ? "Connecting..." : "Link Account"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                setLoading(true);
                try {
                  const accRes = await fetchJSON<{ success: boolean; accounts: SocialAccount[] }>(
                    `/api/social/accounts?provider=meta`
                  );
                  setAccounts(accRes.accounts || []);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-sm text-muted-foreground">No Meta account linked yet.</div>
          ) : (
            <div className="grid gap-3">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between rounded-xl border p-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {acc.business_name || acc.name || `Account #${acc.id}`}
                      </span>
                      {chipForStatus(acc.status)}
                    </div>
                    <div className="text-xs text-muted-foreground">User ID: {acc.provider_user_id}</div>
                    <div className="text-xs text-muted-foreground">Token Expires: {niceDate(acc.token_expires_at)}</div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(acc.scopes || []).map((s) => (
                        <Badge key={s} variant="outline" className="text-[11px]">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 md:pt-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2" onClick={beginLink}>
                          <ShieldCheck className="h-4 w-4" /> Re-auth
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Re-authorize to refresh expired scopes/tokens</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="destructive" size="sm" className="gap-2" onClick={() => unlink(acc.id)}>
                          <LogOut className="h-4 w-4" /> Unlink
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Disconnect this account</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" /> App Permissions
          </CardTitle>
          <Button onClick={save} disabled={!workspaceId || saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {members.length === 0 ? (
            <div className="text-sm text-muted-foreground">No team members yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[720px] grid grid-cols-12 gap-2 items-center px-2 py-1 text-xs text-muted-foreground">
                <div className="col-span-4 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" /> Member
                </div>
                <div className="col-span-3">Ad Account</div>
                <div className="col-span-1 text-center">View</div>
                <div className="col-span-1 text-center">Create</div>
                <div className="col-span-1 text-center">Manage</div>
                <div className="col-span-1 text-center">Insights</div>
                <div className="col-span-1 text-center">
                  <Lock className="h-3.5 w-3.5 mx-auto" />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                {members.map((m) => (
                  <div key={m.id} className="grid grid-cols-12 gap-2 items-center rounded-xl border p-2">
                    <div className="col-span-4">
                      <div className="font-medium text-sm">
                        {m.name} <span className="text-xs text-muted-foreground">({m.role})</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{m.email}</div>
                    </div>
                    <div className="col-span-3">
                      <Select
                        onValueChange={(val) => {
                          setMatrix((prev) => {
                            const copy = [...prev];
                            let row = copy.find((r) => r.userId === m.id && r.adAccountId === val);
                            if (!row) {
                              copy.push({
                                userId: m.id,
                                adAccountId: val,
                                permissions: {
                                  view_ads: false,
                                  create_campaigns: false,
                                  manage_assets: false,
                                  read_insights: false,
                                },
                              });
                            }
                            return copy;
                          });
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={adAccounts.length ? "Select ad account" : "No ad accounts"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {adAccounts.map((a) => (
                            <SelectItem key={a.id} value={a.id}>
                              {a.name} ({a.id})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {(["view_ads", "create_campaigns", "manage_assets", "read_insights"] as AppPermission[]).map(
                      (perm) => {
                        const current = matrix.find((r) => r.userId === m.id);
                        const checked = current?.permissions?.[perm] || false;
                        return (
                          <div key={perm} className="col-span-1 flex items-center justify-center">
                            <Switch checked={checked} onCheckedChange={(v) => setCell(m.id, perm, v)} />
                          </div>
                        );
                      }
                    )}
                    <div className="col-span-1 text-center">
                      {m.role === "Owner" ? (
                        <Badge variant="secondary">All</Badge>
                      ) : (
                        <Badge variant="outline">Custom</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-xs text-muted-foreground pt-2">
            These are app-level permissions. Facebook/Meta scopes (e.g., <code>ads_management</code>) are granted via
            OAuth above.
          </div>
        </CardContent>
      </Card>

      {/* Granted Scopes */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" /> Granted Meta Scopes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {grantedScopes.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No scopes yet. Link a Meta account to grant scopes like <code>ads_management</code>,{" "}
              <code>business_management</code>, <code>pages_show_list</code>.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {grantedScopes.map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Info */}
      <div className="text-[11px] text-muted-foreground">
        Workspace: {workspaceId ?? "none"} · Accounts: {accounts.length} · Members: {members.length} · AdAccounts:{" "}
        {adAccounts.length}
      </div>
    </div>
  );
}
