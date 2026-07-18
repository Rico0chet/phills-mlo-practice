import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, User } from "lucide-react";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";

export function AccountMenu() {
  const { user, loading } = useSession();

  if (loading) {
    return <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />;
  }

  if (!user) {
    return (
      <Link
        to="/auth"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:border-primary hover:bg-accent"
      >
        <LogIn className="h-4 w-4" />
        Sign in
      </Link>
    );
  }

  const label = user.email ?? "Account";

  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-sm">
      <User className="h-4 w-4 text-muted-foreground" />
      <span className="max-w-[10rem] truncate text-foreground">{label}</span>
      <button
        type="button"
        onClick={() => supabase.auth.signOut()}
        aria-label="Sign out"
        title="Sign out"
        className="ml-1 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
