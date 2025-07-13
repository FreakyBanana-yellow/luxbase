import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function RevenueChart({ supabase, creatorId, preisVIP }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchRevenueData() {
      const { data: users, error } = await supabase
        .from("vip_users")
        .select("joined_at")
        .eq("creator_id", creatorId);

      if (error || !users) return;

      const monthMap = {};

      for (const user of users) {
        const date = new Date(user.joined_at);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        if (!monthMap[key]) {
          monthMap[key] = 0;
        }
        monthMap[key] += 1;
      }

      const sorted = Object.keys(monthMap).sort();

      setData({
        labels: sorted,
        datasets: [
          {
            label: "Monatlicher Umsatz (€)",
            data: sorted.map((key) => monthMap[key] * preisVIP),
            backgroundColor: "#eab308",
          },
        ],
      });
    }

    fetchRevenueData();
  }, [supabase, creatorId, preisVIP]);

  if (!data) {
    return <p className="text-sm text-gray-400">Lade Umsatzdaten …</p>;
  }

  return (
    <div className="bg-zinc-900 p-6 border border-luxgold rounded-xl shadow mt-10">
      <h3 className="text-lg font-bold text-luxgold mb-4">📈 Umsatzentwicklung</h3>
      <Bar data={data} options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "€" + value;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }} />
    </div>
  );
}
