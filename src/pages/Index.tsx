
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import RewardsTracker from "@/components/RewardsTracker";
import Leaderboard from "@/components/Leaderboard";
import UserProfile from "@/components/UserProfile";
import AddTaskModal from "@/components/AddTaskModal";

import { 
  MOCK_TASKS, 
  MOCK_USERS, 
  getTasksByStatus, 
  getUserById,
  getTasksByUser, 
  calculateTotalRewards,
  Task, 
  TaskStatus 
} from "@/lib/data";

const Index = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [activeTab, setActiveTab] = useState<"all" | "open" | "in-progress" | "completed">("all");
  
  // For demo purposes, we'll use the first user as the current user
  const currentUser = MOCK_USERS[0];
  const userTasks = getTasksByUser(currentUser.id);
  
  useEffect(() => {
    toast({
      title: "Welcome to TaskHero!",
      description: "Complete tasks to earn rewards and get paid with your next salary.",
    });
  }, []);
  
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task, 
          status: newStatus,
          completedOn: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };
  
  const handleAddTask = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };
  
  const getFilteredTasks = () => {
    if (activeTab === "all") return tasks;
    return tasks.filter(task => task.status === activeTab);
  };
  
  const openTasks = tasks.filter(task => task.status === 'open').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Hero Rewards Hub</h1>
            <p className="text-muted-foreground">
              Complete tasks, earn rewards, get paid with your salary.<br />
              <span className="text-primary font-medium">
                Empower internal talent: Maximize team potential, ensure privacy, and reward directly.
              </span>
            </p>
          </div>
          <AddTaskModal users={MOCK_USERS} onAddTask={handleAddTask} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RewardsTracker 
              currentRewards={calculateTotalRewards()}
              targetRewards={2500}
              totalEmployees={MOCK_USERS.length}
              averageCompletion={Math.round(completedTasks / MOCK_USERS.length)}
              upcomingPayout="April 30, 2025"
            />
          </div>
          <div>
            <UserProfile user={currentUser} tasks={userTasks} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Tasks</TabsTrigger>
                  <TabsTrigger value="open" className="flex gap-2">
                    Open <span className="bg-blue-500/20 text-blue-500 px-1.5 rounded-full text-xs">{openTasks}</span>
                  </TabsTrigger>
                  <TabsTrigger value="in-progress" className="flex gap-2">
                    In Progress <span className="bg-progress/20 text-progress px-1.5 rounded-full text-xs">{inProgressTasks}</span>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex gap-2">
                    Completed <span className="bg-success/20 text-success px-1.5 rounded-full text-xs">{completedTasks}</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredTasks().map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      user={getUserById(task.assignedTo)} 
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="open" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredTasks().map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      user={getUserById(task.assignedTo)} 
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="in-progress" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredTasks().map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      user={getUserById(task.assignedTo)} 
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredTasks().map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      user={getUserById(task.assignedTo)} 
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Leaderboard users={MOCK_USERS} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
