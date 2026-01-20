"use client";

import { useTasks } from "@/hooks/useTasks";
import ApHomeHeader from "@/components/homeHeader";
import { Loader2, CheckCircle, Lock, Calendar, Star, Trophy } from "lucide-react";
import { toast } from "react-toastify"; // Assuming react-toastify is used, otherwise I'll check toast component
import { useState } from "react";

export default function TasksPage() {
  const { tasks, loading, error, claimTask, claimingId } = useTasks();


  const handleClaim = async (taskId: string) => {
    try {
      const result = await claimTask(taskId);
      if (result?.success) {
        toast.success(result.message || "Reward claimed successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to claim reward");
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "calendar":
        return <Calendar className="w-6 h-6 text-purple-600" />;
      case "star":
        return <Star className="w-6 h-6 text-yellow-500" />;
      case "trophy":
        return <Trophy className="w-6 h-6 text-orange-500" />;
      default:
        return <Star className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <div className=" ">
        <div className="bg-white rounded-2xl px-6 py-2 shadow-sm mb-6">
          <h1 className="text-md font-bold text-gray-800">Task Center</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Complete tasks to earn bonus rewards!
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-white rounded-xl">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all ${
                  task.isClaimable
                    ? "hover:border-purple-200 hover:shadow-md"
                    : "opacity-80"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    {getIcon(task.icon)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        +₦{task.reward} Reward
                      </span>
                      {task.type === "daily" && (
                        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          Daily
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  {task.status === "claimed" ? (
                    <button
                      disabled
                      className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-400 rounded-xl font-medium text-sm cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Claimed
                    </button>
                  ) : task.isClaimable ? (
                    <button
                      onClick={() => handleClaim(task._id)}
                      disabled={claimingId === task._id}
                      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-xl font-medium text-sm shadow-lg shadow-purple-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {claimingId === task._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Claim"
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex items-center gap-1 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl font-medium text-sm cursor-not-allowed border border-gray-100"
                    >
                      <Lock className="w-4 h-4" />
                      Pending
                    </button>
                  )}
                </div>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No tasks available right now. Check back later!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
