export default class OverdraftOccurred {
	constructor(params = {}) {
		this.type = 'OverdraftOccurred';
		this.timestamp = params.time ?? new Date().toISOString();
		this.eventId = params.id;
		this.accountId = params.accountId;

		this.attemptedAmount = params.attemptedAmount;
		this.availableBalance = params.availableBalance;
		this.overdraftAmount = params.overdraftAmount;
		this.feeAssessed = params.feeAssessed;
		this.triggeringTransaction = params.triggeringTransaction;
	}
}
