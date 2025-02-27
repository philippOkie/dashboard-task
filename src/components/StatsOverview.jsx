function StatsOverview({ statistics, credits }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Total Generations
        </h3>
        <div className="text-3xl font-bold text-gray-900">
          {statistics.totalGenerations}
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-gray-500 text-sm font-medium mb-1">Success Rate</h3>
        <div className="text-3xl font-bold text-green-600">
          {statistics.successRate}%
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Average Generation Time
        </h3>
        <div className="text-3xl font-bold text-gray-900">
          {statistics.averageGenerationTime}s
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Available Credits
        </h3>
        <div className="text-3xl font-bold text-blue-600">
          {credits.currentCredits}
        </div>
      </div>
    </div>
  );
}

export default StatsOverview;
