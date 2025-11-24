export default class MoneyWithdrawn {
	constructor(params = {}) {
		this.type = 'MoneyWithdrawn';
		this.timestamp = params.time ?? new Date().toISOString();
		this.eventId = params.id;
		this.accountId = params.accountId;

		this.amount = params.amount;
		this.withdrawalMethod = params.withdrawalMethod; // 'atm', 'check', 'transfer', 'debit_card'
		this.location = params.location;
		this.withdrawnBy = params.withdrawnBy;
	}
}
