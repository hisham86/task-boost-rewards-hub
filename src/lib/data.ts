
export type TaskStatus = 'open' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  assignedTo: string;
  department: string;
  reward: number;
  completedOn?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  department: string;
  completedTasks: number;
  totalReward: number;
}

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Update client database schema",
    description: "Modify the current database schema to accommodate the new client requirements.",
    status: "open",
    dueDate: "2025-05-01",
    assignedTo: "1",
    department: "Engineering",
    reward: 50
  },
  {
    id: "2",
    title: "Create Q2 marketing campaign",
    description: "Design and implement a marketing campaign for the upcoming quarter.",
    status: "in-progress",
    dueDate: "2025-04-30",
    assignedTo: "2",
    department: "Marketing",
    reward: 75
  },
  {
    id: "3",
    title: "Implement new authentication system",
    description: "Develop and deploy a new authentication system for our web application.",
    status: "completed",
    dueDate: "2025-04-15",
    assignedTo: "1",
    department: "Engineering",
    reward: 100,
    completedOn: "2025-04-12"
  },
  {
    id: "4",
    title: "Conduct user interviews",
    description: "Schedule and conduct interviews with users to gather feedback on the new features.",
    status: "in-progress",
    dueDate: "2025-05-05",
    assignedTo: "3",
    department: "Product",
    reward: 60
  },
  {
    id: "5",
    title: "Fix responsive design issues",
    description: "Identify and fix responsive design issues on the mobile version of our app.",
    status: "open",
    dueDate: "2025-04-28",
    assignedTo: "1",
    department: "Engineering",
    reward: 40
  },
  {
    id: "6",
    title: "Prepare financial report",
    description: "Compile and prepare the monthly financial report for stakeholders.",
    status: "completed",
    dueDate: "2025-04-10",
    assignedTo: "4",
    department: "Finance",
    reward: 80,
    completedOn: "2025-04-08"
  },
  {
    id: "7",
    title: "Update company documentation",
    description: "Review and update the company documentation to reflect recent changes.",
    status: "open",
    dueDate: "2025-05-10",
    assignedTo: "3",
    department: "Product",
    reward: 45
  },
  {
    id: "8",
    title: "Revamp onboarding process",
    description: "Design and implement improvements to the employee onboarding process.",
    status: "in-progress",
    dueDate: "2025-05-15",
    assignedTo: "5",
    department: "HR",
    reward: 90
  }
];

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "/placeholder.svg",
    email: "alex.chen@example.com",
    role: "Senior Developer",
    department: "Engineering",
    completedTasks: 12,
    totalReward: 580
  },
  {
    id: "2",
    name: "Jamie Taylor",
    avatar: "/placeholder.svg",
    email: "jamie.taylor@example.com",
    role: "Marketing Specialist",
    department: "Marketing",
    completedTasks: 8,
    totalReward: 420
  },
  {
    id: "3",
    name: "Sam Rodriguez",
    avatar: "/placeholder.svg",
    email: "sam.rodriguez@example.com",
    role: "Product Manager",
    department: "Product",
    completedTasks: 10,
    totalReward: 510
  },
  {
    id: "4",
    name: "Morgan Williams",
    avatar: "/placeholder.svg",
    email: "morgan.williams@example.com",
    role: "Financial Analyst",
    department: "Finance",
    completedTasks: 6,
    totalReward: 390
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatar: "/placeholder.svg",
    email: "jordan.lee@example.com",
    role: "HR Manager",
    department: "HR",
    completedTasks: 9,
    totalReward: 450
  }
];

export const getTasksByStatus = (status: TaskStatus): Task[] => {
  return MOCK_TASKS.filter(task => task.status === status);
};

export const getUserById = (id: string): User | undefined => {
  return MOCK_USERS.find(user => user.id === id);
};

export const getTasksByUser = (userId: string): Task[] => {
  return MOCK_TASKS.filter(task => task.assignedTo === userId);
};

export const calculateTotalRewards = (): number => {
  return MOCK_USERS.reduce((total, user) => total + user.totalReward, 0);
};

export const getUserRanking = (): User[] => {
  return [...MOCK_USERS].sort((a, b) => b.totalReward - a.totalReward);
};
