import { randomUUID } from 'crypto';

import Account from "../../domain/Account/Account.js";
import AccountRepo from "../../domain/Account/AccountRepo.js";
import { AccountOpened } from "../../domain/events/index.js";

const accountRepo = new AccountRepo();

const AccountType = {
	CHECKING: 'checking',
}

export default class AccountApplicationService {
	constructor() {

	}

	openAccount(params = {}) {
		const { accountHolderName, email, initialDeposit } = params;

		const event = new AccountOpened({
			accountId: randomUUID(),
			accountHolderName,
			accountType: AccountType.CHECKING,
			initialDeposit,
			email,
		})

		const account = new Account({ events: [event] });
		accountRepo.upsert(account);

		return account;
	}

	depositMoney() {

	}

	withdrawMoney() {

	}
}
