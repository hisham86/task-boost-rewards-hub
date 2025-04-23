
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, Calendar, Award } from "lucide-react";

interface RewardsTrackerProps {
  currentRewards: number;
  targetRewards: number;
  totalEmployees: number;
  averageCompletion: number;
  upcomingPayout: string;
}

const RewardsTracker: React.FC<RewardsTrackerProps> = ({
  currentRewards,
  targetRewards,
  totalEmployees,
  averageCompletion,
  upcomingPayout
}) => {
  const progressPercentage = Math.min(100, Math.round((currentRewards / targetRewards) * 100));
  
  return (
    <Card className="shadow-md border-reward/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Award className="text-reward mr-2 h-5 w-5" />
          Rewards Dashboard
        </CardTitle>
        <CardDescription>Track bonuses and team performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Total Rewards Earned</span>
              <span className="text-reward font-bold">${currentRewards}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-muted" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">Current</span>
              <span className="text-xs text-muted-foreground">Target: ${targetRewards}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="stat-card flex items-center">
              <DollarSign className="h-8 w-8 text-reward mr-3" />
              <div>
                <p className="text-xs text-muted-foreground">Next Payout</p>
                <p className="font-medium">{upcomingPayout}</p>
              </div>
            </div>
            
            <div className="stat-card flex items-center">
              <Users className="h-8 w-8 text-primary mr-3" />
              <div>
                <p className="text-xs text-muted-foreground">Team Members</p>
                <p className="font-medium">{totalEmployees}</p>
              </div>
            </div>
            
            <div className="stat-card flex items-center">
              <Calendar className="h-8 w-8 text-progress mr-3" />
              <div>
                <p className="text-xs text-muted-foreground">Avg. Completion</p>
                <p className="font-medium">{averageCompletion} tasks</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsTracker;
