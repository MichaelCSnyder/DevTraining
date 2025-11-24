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

	const account = accountApplicationService.openAccount({ accountHolderName, email, initialDeposit, accountType })

	res.status(201).json({
		message: 'Account created successfully',
		account: {
			id: account.id,
			email: account.email,
			accountHolderName: account.accountHolderName,
			accountType: account.accountType,
			balance: account.balance,
		}
	});
})

app.post('/accounts/:id/deposit', async (req, res) => {
	try {
		const { amount } = req.body;

		const accountId = req.params.id;

		const account = accountApplicationService.depositMoney({ accountId, amount });

		res.json({
			message: 'Deposit successful',
			newBalance: account.balance,
			depositAmount: amount
		});
	} catch (error) {
		if (error.message === 'Account not found') {
			return res.status(404).json({ error: error.message });
		}
		res.status(400).json({ error: error.message });
	}
});

app.use(express.static('client'));

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
})
