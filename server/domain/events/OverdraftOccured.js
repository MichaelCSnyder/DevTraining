export default class OverdraftOccurred {
	constructor(params = {}) {
		this.type = this.constructor.name;
		this.timestamp = params.time ?? new Date().toISOString();
		this.eventId = params.id;
		this.accountId = params.accountId;

		this.attemptedAmount = params.attemptedAmount;
		this.feeAssessed = params.feeAssessed;
	}
}
