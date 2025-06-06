const express = require('express');
const router = express.Router();
const Ticket = require('../Models/tickets');

// POST - create a new ticket
const addticket= async (req, res) => {
  console.log("called");
  try {
    const newTicket = new Ticket(req.body);
    const saved = await newTicket.save();
    res.status(201).json({ message: 'Ticket created', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Error creating ticket', error: err.message });
  }
};

// // GET - fetch all tickets
const getticket=async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tickets', error: err.message });
  }
};

// GET - fetch single ticket by ID
const getbyid = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketid: req.params.id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ticket', error: err.message });
  }
};

// PUT - update a ticket by ID
const putbyid = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findOneAndUpdate({ticketid : req.params.id}, req.body, { new: true }  );
    if (!updatedTicket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json({ message: 'Ticket updated', data: updatedTicket });
  } catch (err) {
    res.status(500).json({ message: 'Error updating ticket', error: err.message });
  }
};

// DELETE - delete a ticket by ID
const deletebyid = async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ticket', error: err.message });
  }
};


//User Tickets - Fetch all ticket for a User
const getuserticket = async(req,res) => {

  try
  {
    const tickets = await Ticket.find({userid:req.params.userid});
     if (!tickets.length) {
      return res.status(404).json({ message: 'No tickets found for this user' });
    }
    res.status(200).json(tickets)
  }
  catch (err)
  {
    res.status(500).json({message:'Error fetching user tickets' , error:err.message});
  }
};

module.exports = {addticket,getticket,getbyid,putbyid,deletebyid,getuserticket};
