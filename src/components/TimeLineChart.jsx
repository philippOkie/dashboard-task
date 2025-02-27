import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TimeLiveChart({ statistics }) {
  const { daily_generation_counts, success_rate_trend } = statistics || {};

  if (!daily_generation_counts || !success_rate_trend) {
    return <div>Loading...</div>;
  }

  const dailyGenerations = daily_generation_counts.map(({ date, count }) => {
    const formattedDate = date.split(" ")[0].slice(5);
    return { date: formattedDate, count };
  });

  const successRateTrend = success_rate_trend.map(({ date, rate }) => {
    const formattedDate = date.split(" ")[0].slice(5);
    return { date: formattedDate, successRate: rate };
  });

  const chartData = dailyGenerations.map((gen) => {
    const successRateData = successRateTrend.find(
      (trend) => trend.date === gen.date
    );
    return {
      ...gen,
      successRate: successRateData ? successRateData.successRate : null,
    };
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Daily Generations</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
            name="Generations"
          />
          <Line
            type="monotone"
            dataKey="successRate"
            stroke="#34D399"
            activeDot={{ r: 8 }}
            name="Success Rate"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TimeLiveChart;
