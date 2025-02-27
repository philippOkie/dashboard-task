import { RefreshCw } from "lucide-react";

function Header({ refreshData }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={refreshData}
          className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;
