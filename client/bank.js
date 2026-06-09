function BankViewModel() {
	var self = this;

	self.CurrentView = ko.observable('viewLogin');

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

		return self.SendRequest.deferred({
			path: '/accounts',
			method: 'POST',
			data: {
				accountHolderName: self.AccountHolderName(),
				email: self.Email(),
				accountType: self.AccountType(),
				initialDeposit: Number(self.InitialDeposit()),
			}
		}).then((response) => {
			self.Message('Account created successfully!');
			setTimeout(() => {
				self.Message('');
			}, 3000);

			self.AccountId(response.id);
			self.AccountType(response.accountType)
			self.Email(response.email);
			self.AccountHolderName(response.accountHolderName);
			self.Balance(response.balance);

			self.CurrentView('viewAccount');
		}).catch((ignore) => { })
	};

	self.OnClickDepositMoney = async function() {
		// finish implementing this
		return self.SendRequest.deferred({
			path: '/accounts/deposit',
			method: 'POST',
			data: {
				accountId: self.AccountId(),
				amount: Number(self.DepositAmount()),
			}
		}).then((response) => {
			console.log({ response });
		}).catch((ignore) => { })
	}

	self.OnClickWithdrawMoney = async function() {
		// finish implementing this
		const withdrawalAmount = Number(self.WithdrawAmount());
	}


	self.SendRequest = {
		deferred: async ({ data = {}, method = 'POST', path = '/accounts' }) => {
			const response = await fetch(path, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			const result = await response.json();

			if (response.ok) {
				return new Promise((resolve) => resolve(result.response))
			} else {
				self.Message('Error: ' + result.error);
				return new Promise((resolve, reject) => reject(result))
			}
		}
	}
}

const viewModel = new BankViewModel();
ko.applyBindings(viewModel);
window.viewModel = viewModel;