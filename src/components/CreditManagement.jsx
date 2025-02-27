import { Plus, Minus } from "lucide-react";
import { useState } from "react";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function CreditManagement({
  creditAmount,
  communityId,
  credits,
  setCreditAmount,
  setCommunityId,
  onFetchCredits,
  refreshData,
}) {
  const topUp = async () => {
    if (!communityId) {
      alert("Community ID is required to top up credits.");
      return;
    }

    const payload = {
      amount: creditAmount,
      credit_type: selectedCreditType,
      description: "",
      payment_reference: "0x1234...",
      payment_method: "ethereum",
      payment_status: "completed",
      invoice_number: "INV-2023-001",
      payment_details: {
        transaction_id: uuidv4(),
        customer_reference: "customer-123",
        payment_provider: "Coinbase",
        additional_notes: "User deposit via ETH",
      },
    };

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/credits/deployment/${communityId}/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to add credits");
      }

      alert(response.data.message);
      setCreditAmount(0);
      refreshData();
    } catch (error) {
      console.error("Error adding credits:", error);
      alert("There was an error adding credits.");
    }
  };

  const { shared, video_only, image_only } = credits.credits || {};

  const [selectedCreditType, setSelectedCreditType] = useState("shared");

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Credit Management</h2>

      <div className="mb-4">
        <label htmlFor="communityId" className="block font-medium mb-2">
          Community ID
        </label>
        <input
          id="communityId"
          type="text"
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          placeholder="Enter community ID"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={onFetchCredits}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Check Balance
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Current Balance</span>
          <span className="font-semibold">
            {credits?.currentCredits} credits
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${
                credits?.totalPurchased
                  ? (credits?.currentCredits / credits?.totalPurchased) * 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shared Credits</span>
          <span className="font-semibold">{shared} credits</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Video-Only Credits</span>
          <span className="font-semibold">{video_only} credits</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Image-Only Credits</span>
          <span className="font-semibold">{image_only} credits</span>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="creditType" className="block font-medium mb-2">
          Select Credit Type
        </label>
        <select
          id="creditType"
          value={selectedCreditType}
          onChange={(e) => setSelectedCreditType(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="shared">Shared Credits</option>
          <option value="video_only">Video-Only Credits</option>
          <option value="image_only">Image-Only Credits</option>
        </select>
      </div>

      <div className="flex flex-direction-row justify-end">
        <div className="flex items-center mb-4">
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
        </div>

        <button
          onClick={topUp}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Credits
        </button>
      </div>
    </div>
  );
}

export default CreditManagement;
