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

function GenerationTypeChart({ statistics }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Generations</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={statistics.monthlyStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="generations"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenerationTypeChart;
