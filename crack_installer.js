/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('ALL');

	await ns.wget('https://github.com/l0wGK/bitrunner-crack/blob/main/crack_2.js', 'crack_2.js');
	ns.print("Installed crack_2.js");
	await ns.wget('https://github.com/l0wGK/bitrunner-crack/blob/main/track_2.js', 'track_2.js');
	ns.print("Installed track_2.js");
	await ns.wget('https://github.com/l0wGK/bitrunner-crack/blob/main/hack_2.js', 'hack_2.js');
	ns.print("Installed hack_2.js")
	await ns.wget('https://github.com/l0wGK/bitrunner-crack/blob/main/transactions.js', 'transactions.js');
	ns.print("Installed transactions.js");
	ns.print("You may now kill this script");

	while (true) {
		await ns.sleep(100);
	}
}
