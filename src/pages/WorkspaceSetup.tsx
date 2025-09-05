import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const API = "https://sociovia-py.onrender.com/api/workspace/setup";
const businessTypes = ["Pvt Ltd", "Sole Proprietorship", "Partnership", "Public"];

const WorkspaceSetup = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState(businessTypes[0]);
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [b2bB2c, setB2bB2c] = useState("B2B");
  const [industry, setIndustry] = useState("");
  const [describeBusiness, setDescribeBusiness] = useState("");
  const [describeAudience, setDescribeAudience] = useState("");
  const [website, setWebsite] = useState("");
  const [directCompetitors, setDirectCompetitors] = useState("");
  const [indirectCompetitors, setIndirectCompetitors] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [usp, setUsp] = useState("");
  const [additionalRemarks, setAdditionalRemarks] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [creatives, setCreatives] = useState<File[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getUser = () => {
    try {
      const raw = localStorage.getItem("sv_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setLogoFile(f);
  };

  const handleCreatives = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files ? Array.from(e.target.files) : [];
    setCreatives(list);
  };

  const validate = () => {
    const errors: string[] = [];
    if (!businessName.trim()) errors.push("Business name is required");
    if (!registeredAddress.trim()) errors.push("Registered address is required");
    if (!industry.trim()) errors.push("Industry is required");
    if (describeBusiness.trim().length < 100) errors.push("Describe business must be at least 100 chars");
    if (describeAudience.trim().length < 100) errors.push("Describe audience must be at least 100 chars");
    if (!usp.trim()) errors.push("USP is required");
    if (!logoFile) errors.push("Logo file is required");
    const d = (directCompetitors || "").split(",").map(s => s.trim()).filter(Boolean);
    const i = (indirectCompetitors || "").split(",").map(s => s.trim()).filter(Boolean);
    if (d.length < 2) errors.push("At least 2 direct competitors required");
    if (i.length < 2) errors.push("At least 2 indirect competitors required");
    return errors;
  };

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const user = getUser();
    if (!user) {
      toast({ title: "Not signed in", description: "Please sign in to save workspace", variant: "destructive" });
      navigate("/login");
      return;
    }

    const errors = validate();
    if (errors.length) {
      toast({ title: "Validation failed", description: errors.join("; "), variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("business_name", businessName);
      fd.append("business_type", businessType);
      fd.append("registered_address", registeredAddress);
      fd.append("b2b_b2c", b2bB2c);
      fd.append("industry", industry);
      fd.append("describe_business", describeBusiness);
      fd.append("describe_audience", describeAudience);
      if (website) fd.append("website", website);
      fd.append("direct_competitors", directCompetitors);
      fd.append("indirect_competitors", indirectCompetitors);
      if (socialLinks) fd.append("social_links", socialLinks);
      fd.append("usp", usp);
      if (additionalRemarks) fd.append("additional_remarks", additionalRemarks);
      if (logoFile) fd.append("logo", logoFile);
      creatives.forEach((f, idx) => fd.append("creatives", f, f.name));

      // IMPORTANT: include user_id so backend can resolve user without server session
      fd.append("user_id", String(user.id));

      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      let data: any = null;
      try { data = await res.json(); } catch { /* if non-json response */ }

      if (res.ok && data?.success) {
        toast({ title: "Workspace saved", description: "Workspace created successfully" });
        try { localStorage.setItem("sv_workspace", JSON.stringify(data.workspace || {})); } catch {}
        navigate("/workspace");
      } else if (res.status === 401) {
        toast({ title: "Unauthorized", description: "Please log in", variant: "destructive" });
        navigate("/login");
      } else {
        toast({ title: "Save failed", description: data?.errors?.join?.(", ") || data?.error || "Unknown error", variant: "destructive" });
      }
    } catch (err) {
      console.error("Workspace submit error", err);
      toast({ title: "Error", description: "Failed to save workspace", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Workspace Setup</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="business_name">Business name</Label>
            <Input id="business_name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_type">Business type</Label>
              <select id="business_type" className="w-full p-2 border rounded" value={businessType} onChange={e => setBusinessType(e.target.value)}>
                {businessTypes.map(bt => <option key={bt} value={bt}>{bt}</option>)}
              </select>
            </div>

            <div>
              <Label htmlFor="b2b_b2c">B2B / B2C</Label>
              <select id="b2b_b2c" className="w-full p-2 border rounded" value={b2bB2c} onChange={e => setB2bB2c(e.target.value)}>
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="registered_address">Registered address</Label>
            <Textarea id="registered_address" value={registeredAddress} onChange={(e) => setRegisteredAddress(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="describe_business">Describe your business (min 100 chars)</Label>
            <Textarea id="describe_business" value={describeBusiness} onChange={(e) => setDescribeBusiness(e.target.value)} rows={5} />
          </div>

          <div>
            <Label htmlFor="describe_audience">Describe your audience (min 100 chars)</Label>
            <Textarea id="describe_audience" value={describeAudience} onChange={(e) => setDescribeAudience(e.target.value)} rows={5} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="direct_competitors">Direct competitors (comma separated)</Label>
              <Input id="direct_competitors" value={directCompetitors} onChange={(e) => setDirectCompetitors(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="indirect_competitors">Indirect competitors (comma separated)</Label>
              <Input id="indirect_competitors" value={indirectCompetitors} onChange={(e) => setIndirectCompetitors(e.target.value)} />
            </div>
          </div>

          <div>
            <Label htmlFor="social_links">Social links (comma or JSON array)</Label>
            <Input id="social_links" value={socialLinks} onChange={(e) => setSocialLinks(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="usp">Unique selling proposition (USP)</Label>
            <Input id="usp" value={usp} onChange={(e) => setUsp(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="additional_remarks">Additional remarks</Label>
            <Textarea id="additional_remarks" value={additionalRemarks} onChange={(e) => setAdditionalRemarks(e.target.value)} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4 items-start">
            <div>
              <Label htmlFor="logo">Logo (png, jpg, webp)</Label>
              <input id="logo" type="file" accept="image/*" onChange={handleLogo} />
            </div>

            <div>
              <Label htmlFor="creatives">Creatives (optional — multiple)</Label>
              <input id="creatives" type="file" accept="image/*" multiple onChange={handleCreatives} />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save workspace"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkspaceSetup;
