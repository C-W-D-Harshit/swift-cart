"use client";

import { useEffect, useState } from "react";

export default function AddedDate({ date }: { date: string }) {
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString());
  }, [date]);
  return formattedDate;
}
