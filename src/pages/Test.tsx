import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Test() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="p-20">
      <h1>Datepicker Test</h1>
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        className="border px-4 py-2"
      />
    </div>
  );
}
