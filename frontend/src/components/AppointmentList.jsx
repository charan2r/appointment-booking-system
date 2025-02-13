/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointment/view");
      setAppointments(response.data);
    } catch (error) {
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (appt) => {
    setSelectedAppointment(appt);
    setOpenDialog(true);
  };

  const confirmCancel = async () => {
    if (!selectedAppointment) return;

    try {
      await axios.delete(`http://localhost:5000/appointment/cancel/${selectedAppointment.id}`);
      setAppointments(appointments.map(appt => appt.id === selectedAppointment.id ? { ...appt, status: "cancelled" } : appt));
      toast.success("Appointment canceled successfully!");
    } catch (error) {
      toast.error("Error canceling appointment.");
    } finally {
      setOpenDialog(false);
      setSelectedAppointment(null);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading appointments...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center">Appointment List</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time Slot</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appt) => (
            <TableRow key={appt.id} className="border-b">
              <TableCell>{appt.id}</TableCell>
              <TableCell>{appt.user_id}</TableCell>
              <TableCell>{appt.date}</TableCell>
              <TableCell>{appt.time_slot}</TableCell>
              <TableCell className={appt.status === "cancelled" ? "text-red-500" : "text-green-500"}>{appt.status}</TableCell>
              <TableCell>
                {appt.status !== "cancelled" && (
                  <Button onClick={() => handleCancelClick(appt)} className="bg-red-500 hover:bg-red-600 text-white">Cancel</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">No</Button>
          <Button onClick={confirmCancel} color="secondary">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppointmentList;
