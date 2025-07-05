import { useState } from "react";
// import axios from "axios";

export function Welcome() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [duration, setDuration] = useState("01:00");
  const [slots, setSlots] = useState([]);

  const submit = async () => {
    const formData = new FormData();
    // formData.append("file1", file1);
    // formData.append("file2", file2);
    formData.append("duration", duration);

    // const res = await axios.post(
    //   "http://localhost:3000/availability",
    //   formData
    // );
    // setSlots(res.data);
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div>
        <h2 className="flex items-center justify-center text-xl">
          Find Available Time Slots
        </h2>

        <br />

        <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
        <input type="file" onChange={(e) => setFile2(e.target.files[0])} />

        <br />
        <br />

        <div className="flex flex-row gap-6 items-center justify-center">
          <select
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          >
            <option value="00:15">15 minutes</option>
            <option value="00:30">30 minutes</option>
            <option value="01:00">1 hour</option>
          </select>

          <button
            onClick={submit}
            className="bg-blue-200 px-4 hover:cursor-pointer
          "
          >
            Find Slots
          </button>
        </div>

        <h3>Available Slots</h3>

        <table border="1">
          <thead>
            <tr>
              <th className="p-4">Start</th>
              <th className="p-4">End</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((s, i) => (
              <tr key={i}>
                <td className="p-4">{new Date(s.start).toLocaleString()}</td>
                <td className="p-4">{new Date(s.end).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
