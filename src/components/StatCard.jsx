function StatCard({ title, value, className }) {
  return (
    <div className={`bg-white rounded-lg p-6 shadow ${className}`}>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <div className="text-3xl font-bold">{value ?? "N/A"}</div>
    </div>
  );
}

export default StatCard;
