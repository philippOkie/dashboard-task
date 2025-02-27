function CreditManagementTable({ projects }) {
  return (
    <div className="gap-6 mb-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">
          Projects - Available Credits
        </h2>
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="text-xs uppercase text-gray-700 bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">Project Name</th>
                <th className="px-3 py-2 text-left">Community ID</th>
                <th className="px-3 py-2 text-right">Shared Credits</th>
                <th className="px-3 py-2 text-right">Video Only Credits</th>
                <th className="px-3 py-2 text-right">Image Only Credits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects?.map(
                ({ project_id, project_name, community_id, credits }) => (
                  <tr key={project_id} className="text-sm">
                    <td className="px-3 py-2">{project_name}</td>
                    <td className="px-3 py-2">{community_id}</td>
                    {["shared", "video_only", "image_only"].map((type) => (
                      <td key={type} className="px-3 py-2 text-right">
                        {credits[type]}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreditManagementTable;
