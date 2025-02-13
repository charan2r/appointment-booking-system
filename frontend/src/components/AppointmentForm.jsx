/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentForm = ({ selectedDate, availableSlots }) => {
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !contact || !timeSlot) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/appointment/book", {
        user_name: userName,
        contact,
        date: selectedDate,
        time_slot: timeSlot,
      });
      toast.success("Appointment booked successfully!");
    } catch (error) {
      toast.error("Failed to book appointment.");
    }
  };

  return (
    <form className="p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold">Book Appointment</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="input input-bordered w-full mt-2"
      />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="input input-bordered w-full mt-2"
      />
      <select
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
        className="select select-bordered w-full mt-2"
      >
        <option value="">Select a Time Slot</option>
        {availableSlots.map((slot) => (
          <option key={slot.id} value={slot.time_slot}>
            {slot.time_slot}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary w-full mt-4">
        Book Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
