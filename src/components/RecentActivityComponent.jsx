import LowCreditWarning from "./LowCreditWarning";

function RecentActivityComponent({ statistics, credits }) {
  return (
    <div className="gap-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="text-xs uppercase text-gray-700 bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Credits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {statistics.recentActivity.map((activity, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-3 py-2">{activity.date}</td>
                  <td className="px-3 py-2">{activity.type}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        activity.status === "Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">{activity.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <LowCreditWarning credits={credits} />
      </div>
    </div>
  );
}

export default RecentActivityComponent;
