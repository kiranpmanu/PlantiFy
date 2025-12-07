import { NavLink } from "@/components/NavLink";
import { Home, Camera, Leaf, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/identify", icon: Camera, label: "Identify" },
    { to: "/my-plants", icon: Leaf, label: "My Plants" },
    { to: "/about", icon: Info, label: "About" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-accent"
            activeClassName="text-primary bg-accent"
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-5 w-5", isActive && "scale-110")} />
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
