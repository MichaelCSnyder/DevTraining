import {
	AccountOpened,
	MoneyDeposited,
	MoneyWithdrawn,
	OverdraftOccurred,
} from '../events/index.js';

export default class Account {
	#id;
	#events;
	#accountHolderName;
	#accountType;
	#email;
	#balance;
	#createdAt;

	constructor(ctorParams = {}) {
		const { events } = ctorParams;

		this.#id = ctorParams.id;
		this.#accountHolderName = ctorParams.accountHolderName;
		this.#email = ctorParams.email;

		events.forEach((event) => this.#applyEvent(event))
		this.#events = events.filter((event) => !event.id)
	}

	get events() {
		return this.#events;
	}

	get id() {
		return this.#id;
	}

	get email() {
		return this.#email;
	}

	get accountHolderName() {
		return this.#accountHolderName;
	}

	get accountType() {
		return this.#accountType;
	}

	get balance() {
		return this.#balance;
	}

	debit(amount) {
		if (amount <= 0) {
			throw new Error('Debit amount must be positive');
		}
		if (this.#balance < amount) {
			throw new Error('Insufficient funds');
		}
		this.#balance -= amount;
	}

	credit(amount) {
		if (amount <= 0) {
			throw new Error('Credit amount must be positive');
		}
		this.#balance += amount;
	}

	isActive() {
		return this.#balance >= 0;
	}

	#applyEvent(event) {
		switch (event.type) {
			case (AccountOpened.name): {
				this.#applyAccountOpened({ event });
				break;
			}
			case (MoneyDeposited.name): {
				this.#applyMoneyDeposited({ event });
				break;
			}
			case (MoneyWithdrawn.name): {
				this.#applyMoneyWithdrawn({ event });
				break;
			}
			case (OverdraftOccurred.name): {
				this.#appplyOverdraftOccurred({ event });
				break;
			}
			default: {
				console.log(`Ignoring event: ${JSON.stringify(event)}`)
			}
		}

	}

	#applyAccountOpened({ event }) {
		this.#id = event.accountId;
		this.#email = event.email;
		this.#balance = event.initialDeposit ?? 0;
		this.#createdAt = event.time;
		this.#accountType = event.accountType;
		this.#accountHolderName = event.accountHolderName;
	}

	#applyMoneyDeposited({ event }) {

	}

	#applyMoneyWithdrawn({ event }) {

	}

	#appplyOverdraftOccurred({ event }) {

	}
}
