import React, { useState } from "react";
import axios from "axios";

interface ISlot {
  start: string;
  end: string;
}

export default function App() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [duration, setDuration] = useState("01:00");
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [error, setError] = useState<string | null>();

  const submit = async () => {
    const formData = new FormData();
    formData.append("slotA", file1!);
    formData.append("slotB", file2!);
    formData.append("duration", duration);

    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:3000/time-slote",
        formData,
      );
      if (res.status === 201) {
        setSlots(res.data);
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Find Available Time Slots
      </h2>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          onChange={(e) => setFile1(e.target.files[0])}
          className="block w-full max-w-md text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={(e) => setFile2(e.target.files[0])}
          className="block w-full max-w-md text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
          <select
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            className="select select-bordered w-48"
          >
            <option value="00:15">15 minutes</option>
            <option value="00:30">30 minutes</option>
            <option value="01:00">1 hour</option>
          </select>

          <button
            onClick={submit}
            className="btn btn-primary px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Find Slots
          </button>
        </div>
      </div>

      <h3 className="text-xl font-medium mt-8 mb-4 text-center">
        Available Slots
      </h3>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {slots.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th colSpan={2} className="py-2 px-4 border">
                  Between
                </th>
              </tr>
            </thead>
            <tbody>
              {slots.map((s, i) => (
                <tr key={i}>
                  <td className="py-2 px-4 border">
                    {new Date(s.start).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(s.end).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
