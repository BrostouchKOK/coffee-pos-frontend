const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-2xl font-bold mt-1">{value}</h2>
        </div>

        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
