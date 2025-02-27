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

function BarChartComp({ credits }) {
  if (
    !credits ||
    !credits.organization_totals ||
    !credits.organization_totals.total_credits ||
    !credits.organization_totals.total_spent
  ) {
    return <div>Loading...</div>;
  }

  const { total_credits, total_spent } = credits.organization_totals;

  const chartData = Object.keys(total_credits).map((type) => ({
    type,
    credits: total_credits[type],
    spent: total_spent[type],
  }));

  return (
    <div className="gap-6 mb-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Organization Totals</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="credits" fill="#8884d8" name="Credits" />
            <Bar dataKey="spent" fill="#82ca9d" name="Total Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComp;
