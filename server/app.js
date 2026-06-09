import express from 'express';
import AccountApplicationService from './application/services/AccountApplicationService.js';

const app = express();
const port = 3000;

const accountApplicationService = new AccountApplicationService();

app.use(express.json());

app.post('/accounts', (req, res) => {
	const { accountHolderName, email, accountType, initialDeposit = 0 } = req.body;

	if (!accountHolderName || !email || !accountType) {
		return res.status(400).json({
			error: 'Missing required fields: accountId, email, accountHolderName, accountType'
		});
	}

	try {
		const response = accountApplicationService.openAccount({ accountHolderName, email, initialDeposit, accountType })

		return res.status(201).json({
			message: 'Account created successfully',
			response,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
})

app.post('/accounts/deposit', async (req, res) => {
	const { amount, accountId } = req.body;

	try {
		const response = accountApplicationService.depositMoney({ accountId, amount });

		res.json({
			message: 'Deposit successful',
			response,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

app.post('/accounts/withdraw', async (req, res) => {
	const { amount, accountId } = req.body;

	try {
		const response = accountApplicationService.withdrawMoney({ accountId, amount });

		res.json({
			message: 'Withdrawal successful',
			response,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

app.use(express.static('client'));

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}. HTML served at http://localhost:${port}/bank.html`);
});