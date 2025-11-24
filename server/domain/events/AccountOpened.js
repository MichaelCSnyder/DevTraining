export default class AccountOpened {
	constructor(params = {}) {
		this.type = this.constructor.name;
		this.time = params.time ?? new Date().toISOString();
		this.eventId = params.id;
		this.accountId = params.accountId;

		this.email = params.email;
		this.accountHolderName = params.accountHolderName;
		this.accountType = params.accountType;
		this.initialDeposit = params.initialDeposit;
	}
}
