
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { User, Task } from "@/lib/data";
import { DollarSign, CheckCircle, Award, Calendar } from "lucide-react";

interface UserProfileProps {
  user: User;
  tasks: Task[];
}

const UserProfile: React.FC<UserProfileProps> = ({ user, tasks }) => {
  const completedTasks = tasks.filter(task => task.status === "completed");
  const inProgressTasks = tasks.filter(task => task.status === "in-progress");
  const openTasks = tasks.filter(task => task.status === "open");
  
  // Calculate metrics
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
  const thisMonthRewards = completedTasks.reduce((sum, task) => sum + task.reward, 0);
  
  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">My Profile</CardTitle>
            <CardDescription>Performance and rewards overview</CardDescription>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium text-sm">{user.name}</h3>
            <p className="text-xs text-muted-foreground">{user.role} • {user.department}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Task Completion Rate</span>
              <span className="text-sm font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card flex flex-col items-center justify-center text-center">
              <DollarSign className="h-5 w-5 text-reward mb-1" />
              <span className="text-lg font-bold">${user.totalReward}</span>
              <span className="text-xs text-muted-foreground">Total Rewards</span>
            </div>
            
            <div className="stat-card flex flex-col items-center justify-center text-center">
              <CheckCircle className="h-5 w-5 text-success mb-1" />
              <span className="text-lg font-bold">{user.completedTasks}</span>
              <span className="text-xs text-muted-foreground">Completed Tasks</span>
            </div>
          </div>
          
          <div className="pt-2">
            <h3 className="text-sm font-medium mb-2">Current Tasks Status</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-md bg-blue-500/10 p-2 text-center">
                <span className="text-xs text-blue-500 font-medium">{openTasks.length}</span>
                <p className="text-xs mt-1">Open</p>
              </div>
              <div className="rounded-md bg-progress/10 p-2 text-center">
                <span className="text-xs text-progress font-medium">{inProgressTasks.length}</span>
                <p className="text-xs mt-1">In Progress</p>
              </div>
              <div className="rounded-md bg-success/10 p-2 text-center">
                <span className="text-xs text-success font-medium">{completedTasks.length}</span>
                <p className="text-xs mt-1">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-xs text-muted-foreground">This Month</span>
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 text-reward mr-1" />
              <span className="text-xs font-medium">${thisMonthRewards} in bonuses</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
