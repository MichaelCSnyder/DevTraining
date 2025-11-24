function BankViewModel() {
	var self = this;

	self.CurrentView = ko.observable('viewLogin');

	// login form observables
	self.AccountHolderName = ko.observable('');
	self.Email = ko.observable('');
	self.AccountType = ko.observable('checking');
	self.InitialDeposit = ko.observable(0);

	self.AccountId = ko.observable('');
	self.Balance = ko.observable('');
	self.Message = ko.observable('');

	self.DepositAmount = ko.observable(0);
	self.WithdrawAmount = ko.observable(0);

	self.OnClickCreateAccount = async function() {
		if (!self.AccountHolderName()) {
			return self.Message('Please enter your name');
		}
		if (!self.Email()) {
			return self.Message('Please enter your email');
		}

		const response = await fetch('/accounts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				accountHolderName: self.AccountHolderName(),
				email: self.Email(),
				accountType: 'checking',
				initialDeposit: 100
			})
		});

		const result = await response.json();

		if (response.ok) {
			self.Message('Account created successfully!');
			setTimeout(() => {
				self.Message('');
			}, 3000);

			self.AccountId(result.account.id);
			self.Balance(result.account.balance);

			self.CurrentView('viewAccount');
		} else {
			self.Message('Error: ' + result.error);
		}
	};

	self.OnClickDepositMoney = async function() {
		// implement this
		console.log('depositing money');
	}

	self.OnClickWithdrawMoney = async function() {
		// implement this
		console.log('withdrawing money');
	}
}

const viewModel = new BankViewModel();
ko.applyBindings(viewModel);
window.viewModel = viewModel;
