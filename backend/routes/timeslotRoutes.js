const express = require('express');
const pool = require('../config/db');

const router = express.Router();

// GET all timeslots
router.get('/slots', async (req, res) => {
    try {
        const allTimeslots = await pool.query('SELECT * FROM time_slots');
        res.json(allTimeslots.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(404).json('No timeslots were found');
    }
});

// GET a timeslot
router.get('/slots/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const timeslot = await pool.query('SELECT * FROM time_slots WHERE id = $1', [id]);
        if(timeslot.rows.length === 0) {
            return res.status(404).json('Timeslot not found');
        }
        res.json(timeslot.rows[0]);
    } catch (error) {
        console.error(error.message);
        return res.status(404).json('Timeslot not found');
    }
});

// Get Available Timeslots
router.get('/available', async (req, res) => {
    try {
        const availableTimeslots = await pool.query('SELECT * FROM time_slots WHERE available = true');
        res.json(availableTimeslots.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(404).json('No available timeslots were found');
    }
});

module.exports = router;