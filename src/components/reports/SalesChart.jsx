import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 250 },
  { day: "Wed", sales: 180 },
  { day: "Thu", sales: 320 },
  { day: "Fri", sales: 280 },
  { day: "Sat", sales: 450 },
  { day: "Sun", sales: 200 },
];

const SalesChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-bold text-lg mb-4">Sales Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
