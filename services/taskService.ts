import axiosInstance from "@/redux/apis/common/aixosInstance";

export interface Task {
  _id: string;
  title: string;
  description: string;
  reward: number;
  type: "daily" | "one_time" | "milestone";
  icon: string;
  status: "pending" | "completed" | "claimed";
  isClaimable: boolean;
  progress?: number;
  criteria?: any;
}

export const fetchTasks = async () => {
  const response = await axiosInstance.get<{ success: boolean; data: Task[] }>(
    "/tasks"
  );
  return response.data;
};

export const claimTaskReward = async (taskId: string) => {
  const response = await axiosInstance.post<{
    success: boolean;
    message: string;
    data: { newBalance: number; taskId: string };
  }>("/tasks/claim", { taskId });
  return response.data;
};
