const Ticket = require('../Models/tickets');
const nodemailer = require('../nodemailer-config');
const user=require('../Models/employees');

// POST - create a new ticket
const addTicket= async (req, res) => {
  try {
    const currentUserId = req.userid;
    if (!currentUserId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    const newTicket = new Ticket({...req.body,userid : currentUserId});
    const saved = await newTicket.save();
    res.status(201).json({ message: 'Ticket created', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Error creating ticket', error: err.message });
  }
};

// // GET - fetch all tickets
const getTicket=async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tickets', error: err.message });
  }
};

// GET - fetch single ticket by ID
const getTicketByid = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketid: req.params.id });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ticket', error: err.message });
  }
};

// PUT - update a ticket by ID
const updateTicketById = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findOneAndUpdate({ticketid : req.params.id}, req.body, { new: true }  );
    if (!updatedTicket) return res.status(404).json({ message: 'Ticket not found' });

    //email if closed
    if(req.body.status==='closed')
    {
      const userRecord = await user.findOne({ empid: updatedTicket.userid });
      if(userRecord && userRecord.email)
      {
      const mailOptions = {
        from: 'itteamilink@gmail.com',
        to: userRecord.email, 
        subject: `Ticket ${updatedTicket.ticketid} Closed`,
        text: `Your ticket "${updatedTicket.subject}" has been closed. Thank you for using Helpdesk.`
      };

      await nodemailer.sendMail(mailOptions);
    }
    }
    else {
        console.warn(`No user found or email missing for empid: ${updatedTicket.userid}`);
      }

    res.status(200).json({ message: 'Ticket updated', data: updatedTicket });
  } catch (err) {
    res.status(500).json({ message: 'Error updating ticket', error: err.message });
  }
};


//User Tickets - Fetch all ticket for a User
const getUserTickets = async(req,res) => {

  try
  {
    const tickets = await Ticket.find({userid:req.userid});
     if (tickets.length===0) {
      return res.status(404).json({ message: 'No tickets found for this user' });
    }
    res.status(200).json(tickets)
  }
  catch (err)
  {
    res.status(500).json({message:'Error fetching user tickets' , error:err.message});
  }
};


const getItTicket = async(req, res) => {
  try {
    const itId = req.userid;  //fetched from middleware

    if (!itId) {
      return res.status(400).json({ message: 'User ID missing' });
    }

    const tickets = await Ticket.find({ itid: itId });

    if (!tickets.length) {
      return res.status(404).json({ message: 'No tickets found for this user' });
    }

    res.status(200).json(tickets);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching user tickets', error: err.message });
  }
};



module.exports = {addTicket,getTicket,getTicketByid,updateTicketById,getUserTickets,getItTicket};
