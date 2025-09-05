import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import UnderReview from "./pages/UnderReview";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminReview from "./pages/admin/AdminReview";

// Workspace pages
import WorkspaceSetup from "./pages/WorkspaceSetup";
import BindMeta from "./pages/BindMeta";
import UserManagement from "./pages/UserManagement";
import AdAccounts from "./pages/AdAccounts";
import Workspace from "./pages/workspace";
import { workerData } from "node:worker_threads";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/under-review" element={<UnderReview />} />

          {/* User dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Workspace routes */}
          <Route path="/workspace/setup" element={<WorkspaceSetup />} />
          <Route path="/workspace/bind-meta" element={<BindMeta />} />
          <Route path="/workspace/users" element={<UserManagement />} />
          <Route path="/workspace/ad-accounts" element={<AdAccounts />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/review" element={<AdminReview />} />
          <Route path="/workspace" element={<Workspace/>}/>
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
