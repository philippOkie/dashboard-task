import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function GenerationTypesChart({ statistics }) {
  console.log(statistics);

  // Ensure credits and total_spent exist before attempting to transform the data
  const credits = statistics?.credits;
  const totalSpent = statistics?.total_spent;

  // If credits or total_spent are missing, return early with a loading message
  if (!credits || !totalSpent) {
    return <div>Loading...</div>;
  }

  // Transform the data for charting
  const chartData = Object.keys(credits).map((type) => ({
    type,
    credits: credits[type],
    totalSpent: totalSpent[type],
  }));

  return (
    <div className="gap-6 mb-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Generation Types</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="credits" fill="#8884d8" name="Credits" />
            <Bar dataKey="totalSpent" fill="#82ca9d" name="Total Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GenerationTypesChart;
