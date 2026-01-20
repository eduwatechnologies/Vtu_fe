import { useState, useEffect, useCallback } from "react";
import { fetchTasks, claimTaskReward, Task } from "@/services/taskService";
import { useDispatch } from "react-redux";
// Assuming there's a way to update user wallet in Redux, if not we'll just handle local state for now
// or trigger a user reload.
// I'll check userSlice later, for now let's just focus on task state.

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchTasks();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const claimTask = async (taskId: string) => {
    try {
      setClaimingId(taskId);
      const response = await claimTaskReward(taskId);
      if (response.success) {
        // Refresh tasks to update status
        await loadTasks();
        return response;
      }
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Failed to claim task");
    } finally {
      setClaimingId(null);
    }
  };

  return { tasks, loading, error, claimTask, claimingId, refreshTasks: loadTasks };
};
