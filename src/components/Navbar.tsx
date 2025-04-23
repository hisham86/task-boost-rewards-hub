
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Navbar: React.FC = () => {
  const { toast } = useToast();
  
  const showNotification = () => {
    toast({
      title: "New Task Available",
      description: "A new high-reward task has been added to your dashboard!",
    });
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart4 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">TaskBoost</h1>
          <Badge variant="outline" className="ml-2">Rewards Hub</Badge>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-sm font-medium hover:text-primary" href="#">Dashboard</a>
          <a className="text-sm font-medium hover:text-primary" href="#">My Tasks</a>
          <a className="text-sm font-medium hover:text-primary" href="#">Leaderboard</a>
          <a className="text-sm font-medium hover:text-primary" href="#">Rewards</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={showNotification}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
