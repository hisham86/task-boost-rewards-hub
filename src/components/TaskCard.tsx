
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, CheckCircle } from "lucide-react";
import { Task, User } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface TaskCardProps {
  task: Task;
  user?: User;
  onStatusChange?: (taskId: string, newStatus: 'open' | 'in-progress' | 'completed') => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, user, onStatusChange }) => {
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState<'open' | 'in-progress' | 'completed'>(task.status);
  
  const handleStatusChange = (newStatus: 'open' | 'in-progress' | 'completed') => {
    setCurrentStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
    
    if (newStatus === 'completed') {
      toast({
        title: "Task Completed! 🎉",
        description: `You earned a $${task.reward} bonus for completing "${task.title}"`,
      });
    } else if (newStatus === 'in-progress') {
      toast({
        title: "Task Started",
        description: `You've started working on "${task.title}"`,
      });
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-progress';
      case 'completed':
        return 'bg-success';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getDueDateDisplay = () => {
    if (currentStatus === 'completed') {
      return (
        <div className="flex items-center text-success">
          <CheckCircle className="mr-1 h-4 w-4" />
          <span className="text-xs">Completed {task.completedOn ? formatDistanceToNow(new Date(task.completedOn), { addSuffix: true }) : 'recently'}</span>
        </div>
      );
    }
    
    try {
      const dueDate = new Date(task.dueDate);
      return (
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span className="text-xs">Due {formatDistanceToNow(dueDate, { addSuffix: true })}</span>
        </div>
      );
    } catch (e) {
      return (
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span className="text-xs">Due date not set</span>
        </div>
      );
    }
  };
  
  return (
    <Card className={`task-card ${currentStatus === 'completed' ? 'border-success/50 bg-success/5' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <span className={`task-status-chip ${getStatusColor(currentStatus)}`}>
              {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
            </span>
            <CardTitle className="mt-2">{task.title}</CardTitle>
          </div>
          <div className="reward-badge">
            <DollarSign className="h-4 w-4" />
            <span>{task.reward}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex items-center justify-between mt-4">
          {getDueDateDisplay()}
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground mr-2">{task.department}</span>
            {user && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </CardContent>
      {currentStatus !== 'completed' && (
        <CardFooter className="pt-0">
          {currentStatus === 'open' ? (
            <Button 
              variant="outline" 
              className="w-full text-progress" 
              onClick={() => handleStatusChange('in-progress')}
            >
              Start Task
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full text-success" 
              onClick={() => handleStatusChange('completed')}
            >
              Complete Task
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskCard;
