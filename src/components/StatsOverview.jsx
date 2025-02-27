function StatsOverview({ statistics }) {
  if (!statistics) {
    return <div>Loading...</div>;
  }

  const {
    total_generations,
    success_rate,
    average_duration,
    generations_last_24h,
  } = statistics.statistics;

  const parsedAverageDuration = parseFloat(average_duration);
  const formattedAverageDuration = !isNaN(parsedAverageDuration)
    ? parsedAverageDuration.toFixed(4)
    : "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Total Generations
        </h3>
        <div className="text-3xl font-bold text-gray-900">
          {total_generations ?? "N/A"}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-gray-500 text-sm font-medium mb-1">Success Rate</h3>
        <div className="text-3xl font-bold text-green-600">
          {success_rate ?? "N/A"}%
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Average Generation Time
        </h3>
        <div className="text-3xl font-bold text-gray-900">
          {formattedAverageDuration}s
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Generation for last 24 hours
        </h3>
        <div className="text-3xl font-bold text-blue-600">
          {generations_last_24h ?? "N/A"}
        </div>
      </div>
    </div>
  );
}

export default StatsOverview;
