"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Electronics", value: 400, color: "#0088FE" },
  { name: "Apparel", value: 300, color: "#00C49F" },
  { name: "Footwear", value: 200, color: "#FFBB28" },
  { name: "Accessories", value: 100, color: "#FF8042" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: //   index,
{
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs sm:text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function RevenueBreakdown() {
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const updateChartWidth = () => {
      const cardWidth =
        document.getElementById("revenue-breakdown-card")?.offsetWidth || 0;
      setChartWidth(Math.min(cardWidth - 32, 400)); // 32px for padding, max width of 400px
    };

    updateChartWidth();
    window.addEventListener("resize", updateChartWidth);
    return () => window.removeEventListener("resize", updateChartWidth);
  }, []);

  return (
    <Card id="revenue-breakdown-card" className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Revenue Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] sm:h-[400px] flex flex-col sm:flex-row items-center justify-center">
          <div className="w-full sm:w-2/3 h-[200px] sm:h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={chartWidth * 0.25}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`$${value}`, name]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "6px",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
            <ul className="space-y-2">
              {data.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-sm">{item.name}</span>
                  <span className="ml-auto text-sm font-medium">
                    ${item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
