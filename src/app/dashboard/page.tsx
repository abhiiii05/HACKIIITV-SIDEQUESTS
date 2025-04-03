"use client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button 
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h3 className="text-lg font-medium">Total Score</h3>
            <p className="text-3xl font-bold text-green-500">150</p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h3 className="text-lg font-medium">Questions Solved</h3>
            <p className="text-3xl font-bold text-blue-500">3/10</p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h3 className="text-lg font-medium">Current Rank</h3>
            <p className="text-3xl font-bold text-purple-500">#42</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 p-6 bg-zinc-900 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              "Solved Challenge: Hidden in Plain Sight",
              "Earned 50 points",
              "Started Challenge: Binary Beats",
            ].map((activity, index) => (
              <div key={index} className="p-3 bg-zinc-800 rounded-md">
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}