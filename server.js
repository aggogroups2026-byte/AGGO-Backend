const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// INGA UNGA MONGODB CONNECTION STRING-AI PASTE PANRUNGA (Username & Password-oda)
const MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB Connected Successfully!'))
.catch(err => console.log('DB Connection Error:', err));

const TransactionSchema = new mongoose.Schema({
    transactor: String,
    category: String,
    amount: Number,
    upi: String,
    date: String,
    time: String
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

// API Routes
app.get('/api/transactions', async (req, res) => {
    try {
        const data = await Transaction.find().sort({ _id: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/transactions', async (req, res) => {
    try {
        const newTxn = new Transaction(req.body);
        await newTxn.save();
        res.status(201).json(newTxn);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/transactions/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));