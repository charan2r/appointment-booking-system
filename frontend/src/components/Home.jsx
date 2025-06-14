import Calendars from "./Calendar";
import Navbar from "./Navbar";
import { Calendar } from "lucide-react";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-blue-500 mb-4 tracking-tight text-center">
            <Calendar className="inline-block mr-2" />
            Book Your Appointment
          </h1>
        </div>

        <Calendars />
      </div>
    </>
  );
};

export default Home;
