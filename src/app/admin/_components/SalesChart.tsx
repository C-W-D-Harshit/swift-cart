"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", total: 2500 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 2800 },
  { name: "Apr", total: 3500 },
  { name: "May", total: 4000 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 4200 },
  { name: "Aug", total: 4500 },
  { name: "Sep", total: 4300 },
  { name: "Oct", total: 4800 },
  { name: "Nov", total: 5000 },
  { name: "Dec", total: 5500 },
];

export default function SalesChart() {
  return (
    <ResponsiveContainer className={"w-full"} width="100%" height={350}>
      <AreaChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          fill="url(#colorTotal)"
          fillOpacity={0.3}
        />
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
}
