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

	let account;
	try {
		account = accountApplicationService.openAccount({ accountHolderName, email, initialDeposit, accountType })

		return res.status(201).json({
			message: 'Account created successfully',
			account: {
				id: account.id,
				email: account.email,
				accountHolderName: account.accountHolderName,
				accountType: account.accountType,
				balance: account.balance,
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
})

app.post('/accounts/:id/deposit', async (req, res) => {
	const { amount } = req.body;

	const accountId = req.params.id;

	const account = accountApplicationService.depositMoney({ accountId, amount });

	res.json({
		message: 'Deposit successful',
		newBalance: account.balance,
		depositAmount: amount
	});
});

app.use(express.static('client'));

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}. HTML served at http://localhost:${port}/bank.html`);
})
