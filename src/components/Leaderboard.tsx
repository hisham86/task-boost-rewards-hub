
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Star } from "lucide-react";
import { User } from "@/lib/data";

interface LeaderboardProps {
  users: User[];
  limit?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, limit = 5 }) => {
  const sortedUsers = [...users].sort((a, b) => b.totalReward - a.totalReward).slice(0, limit);
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Star className="text-reward mr-2 h-5 w-5" />
          Top Performers
        </CardTitle>
        <CardDescription>Employees with the highest reward earnings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedUsers.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted-foreground/10 mr-4">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.department}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Badge variant="outline" className="bg-reward/10 text-reward border-0 flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {user.totalReward}
                </Badge>
                <span className="text-xs text-muted-foreground mt-1">{user.completedTasks} tasks</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
