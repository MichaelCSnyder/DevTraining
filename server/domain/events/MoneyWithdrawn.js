export default class MoneyWithdrawn {
	constructor(params = {}) {
		this.type = this.constructor.name;
		this.timestamp = params.time ?? new Date().toISOString();
		this.eventId = params.id;
		this.accountId = params.accountId;

		this.amount = params.amount;
	}
}
