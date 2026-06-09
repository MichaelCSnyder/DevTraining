import { randomUUID } from 'crypto';

import Account from "../../domain/Account/Account.js";
import AccountRepo from "../../domain/Account/AccountRepo.js";
import { AccountOpened } from "../../domain/events/index.js";

const accountRepo = new AccountRepo();

export default class AccountApplicationService {
	constructor() {

	}

	openAccount(params = {}) {
		const { accountHolderName, email, initialDeposit, accountType } = params;

		const event = new AccountOpened({
			accountId: randomUUID(),
			accountHolderName,
			accountType,
			initialDeposit,
			email,
		})

		const account = new Account({ events: [event] });
		accountRepo.upsert(account);

		return {
			id: account.id,
			email: account.email,
			accountHolderName: account.accountHolderName,
			accountType: account.accountType,
			balance: account.balance,
		};
	}

	depositMoney(params = {}) {

	}

	withdrawMoney() {

	}
}