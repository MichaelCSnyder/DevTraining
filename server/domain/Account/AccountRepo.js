import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import Account from './Account.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../../data/events.json');

export default class AccountRepo {
	find({ id }) {
		const events = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
			.filter((event) => event.accountId == id)
			.sort((a, b) => a.time - b.time);

		return new Account({ events });
	}

	upsert(account) {
		const newEvents = account.newEvents;

		const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')).sort((a, b) => a.time - b.time);

		let latestEventId = data.at(-1)?.id ?? 0;;
		data.push(...newEvents.map(event => {
			return {
				...event,
				id: latestEventId += 1,
			}
		}));

		fs.writeFileSync(DATA_FILE, JSON.stringify(data));
	}
}