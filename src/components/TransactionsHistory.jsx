import LowCreditWarning from "./LowCreditWarning";

function TransactionsHistory({ credits, projects }) {
  console.log(projects);
  return (
    <div className="gap-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Transactions History</h2>
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="text-xs uppercase text-gray-700 bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">Project Id</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-right">Credits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects?.map((project) =>
                project.recent_transactions
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((activity, index) => (
                    <tr key={index} className="text-sm">
                      <td className="px-3 py-2">{project.project_id}</td>
                      <td className="px-3 py-2">
                        {new Date(activity.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {activity.amount}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <LowCreditWarning credits={credits} />
      </div>
    </div>
  );
}

export default TransactionsHistory;
