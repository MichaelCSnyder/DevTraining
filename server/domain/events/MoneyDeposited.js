export default class MoneyDeposited {
	constructor(params = {}) {
		this.type = this.constructor.name;
		this.timestamp = params.time ?? new Date().toISOString();
		this.eventId = params.id;
		this.accountId = params.accountId;

		this.amount = params.amount;
		this.depositMethod = params.depositMethod; // 'cash', 'check', 'transfer', 'direct_deposit'
		this.reference = params.reference;
		this.depositedBy = params.depositedBy;
	}
}
