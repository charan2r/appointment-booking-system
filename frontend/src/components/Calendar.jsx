/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AppointmentModal = ({ isOpen, closeModal, selectedSlot, onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error("No slot selected");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/appointment/book",
        {
          name,
          date: format(new Date(selectedSlot.date), "yyyy-MM-dd"),
          time_slot: selectedSlot.time_slot,
        }
      );
      toast.success("Appointment booked successfully");
      onSubmit();
      closeModal();
      console.log("Booking response:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error booking appointment");
    }
  };

  if (!isOpen || !selectedSlot) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Your Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <p>Date: {format(new Date(selectedSlot.date), "yyyy-MM-dd")}</p>
            <p>Time Slot: {selectedSlot.time_slot}</p>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
          >
            Confirm Booking
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-3 text-blue-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const Calendar = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/timeslot/slots")
      .then((res) => setSlots(res.data))
      .catch((err) => console.error("Error fetching slots:", err));
  }, []);

  const events = useMemo(() => {
    return slots.map((slot) => {
      const [hour, minute] = slot.time_slot.split(":");
      // Use moment to parse date and set time
      const start = moment(slot.date)
        .set({ hour: +hour, minute: +minute, second: 0, millisecond: 0 })
        .toDate();
      const end = moment(start).add(30, "minutes").toDate();
      return {
        id: slot.id,
        title: slot.available
          ? `Available - ${slot.time_slot}`
          : `Booked - ${slot.time_slot}`,
        start,
        end,
        allDay: false,
        slot,
        isAvailable: slot.available,
      };
    });
  }, [slots]);

  const handleSelectEvent = (event) => {
    if (!event.isAvailable) {
      toast.warn("This time slot is already booked");
      return;
    }
    setSelectedSlot(event.slot);
    setIsModalOpen(true);
  };

  const handleBookingComplete = () => {
    axios
      .get("http://localhost:5000/timeslot/slots")
      .then((res) => setSlots(res.data));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Book an Appointment
      </h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["month", "week", "day"]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.isAvailable ? "#3B82F6" : "#9CA3AF",
            color: "white",
            borderRadius: "5px",
            border: "none",
            padding: "2px 6px",
          },
        })}
      />
      <AppointmentModal
        isOpen={isModalOpen}
        selectedSlot={selectedSlot}
        closeModal={() => setIsModalOpen(false)}
        onSubmit={handleBookingComplete}
      />
      <ToastContainer />
    </div>
  );
};

export default Calendar;
