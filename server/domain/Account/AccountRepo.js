import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import Account from './Account.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../../data/events.json');

export default class AccountRepo {
	findById(id) {
		// const events = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')).sort((a, b) => a.time - b.time);
		// const accountEvents = events.filter(events.accountId === id);
		//
		// return new Account({ events: accountEvents });
	}

	upsert(account) {
		const events = account.events;

		const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')).sort((a, b) => a.time - b.time);
		data.push(...events);

		fs.writeFileSync(DATA_FILE, JSON.stringify(data));
	}
}
