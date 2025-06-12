import Calendar from "./Calendar";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center  p-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mt-20 mb-10">
            📅 Available Slots
          </h1>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Home;
