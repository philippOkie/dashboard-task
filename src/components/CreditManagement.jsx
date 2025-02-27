import { Plus, Minus } from "lucide-react";

function CreditManagement({
  credits,
  creditAmount,
  handleTopUp,
  setCreditAmount,
}) {
  const transactionHistory = credits?.transactionHistory || [];

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Credit Management</h2>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Current Balance</span>
          <span className="font-semibold">
            {credits.currentCredits} credits
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${
                (credits.currentCredits / credits.totalPurchased) * 100
              }%`,
            }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {Math.round((credits.currentCredits / credits.totalPurchased) * 100)}%
          of total purchased
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Top Up Credits</h3>
        <div className="flex items-center">
          <button
            onClick={() => setCreditAmount(Math.max(50, creditAmount - 50))}
            className="p-2 bg-gray-100 rounded-l-md"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={creditAmount}
            onChange={(e) => setCreditAmount(Number(e.target.value))}
            className="p-2 w-20 text-center border-y outline-none"
            min="50"
            step="50"
          />
          <button
            onClick={() => setCreditAmount(creditAmount + 50)}
            className="p-2 bg-gray-100 rounded-r-md"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={handleTopUp}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Credits
          </button>
        </div>
      </div>

      <h3 className="font-medium mb-2">Transaction History</h3>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead className="text-xs uppercase text-gray-700 bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-right">Amount</th>
              <th className="px-3 py-2 text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactionHistory.map((transaction, index) => (
              <tr key={index} className="text-sm">
                <td className="px-3 py-2">{transaction.created_at}</td>
                <td className="px-3 py-2">
                  <span
                    className={
                      transaction.type === "topup"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <span
                    className={
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  {credits.currentCredits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreditManagement;
