
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  MessageSquare, 
  Settings,
  User
} from "lucide-react";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
};

const NavItem = ({ href, icon, title, active }: NavItemProps) => (
  <Link to={href}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-2 py-2 mb-1",
        active && "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:text-pink-600 hover:bg-pink-100 dark:hover:bg-pink-900/30 dark:hover:text-pink-400"
      )}
    >
      {icon}
      <span>{title}</span>
    </Button>
  </Link>
);

const CreatorSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 border-r border-border h-screen fixed top-0 left-0 bg-background pt-20">
      <div className="flex flex-col p-4">
        <div className="mb-6">
          <h2 className="font-semibold text-lg px-2 mb-4">Creator Dashboard</h2>
          <div className="space-y-1">
            <NavItem
              href="/creator-dashboard"
              icon={<LayoutDashboard size={20} />}
              title="Dashboard"
              active={location.pathname === "/creator-dashboard"}
            />
            <NavItem
              href="/creator-portfolio"
              icon={<Briefcase size={20} />}
              title="Portfolio"
              active={location.pathname === "/creator-portfolio"}
            />
            <NavItem
              href="/creator-projects"
              icon={<CheckSquare size={20} />}
              title="Projects"
              active={location.pathname === "/creator-projects"}
            />
            <NavItem
              href="/creator-messages"
              icon={<MessageSquare size={20} />}
              title="Messages"
              active={location.pathname === "/creator-messages"}
            />
          </div>
        </div>
        <div className="px-2">
          <h3 className="font-medium text-sm text-muted-foreground mb-3">Account</h3>
          <div className="space-y-1">
            <NavItem
              href="/profile"
              icon={<User size={20} />}
              title="Profile"
              active={location.pathname === "/profile"}
            />
            <NavItem
              href="/settings"
              icon={<Settings size={20} />}
              title="Settings"
              active={location.pathname === "/settings"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorSidebar;
