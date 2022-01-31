/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('ALL');

	await ns.wget('https://raw.githubusercontent.com/l0wGK/bitburner-crack/main/crack_2.js', 'crack_2.js');
	ns.print("Installed crack_2.js");
	await ns.wget('https://raw.githubusercontent.com/l0wGK/bitburner-crack/main/track_2.js', 'track_2.js');
	ns.print("Installed track_2.js");
	await ns.wget('https://raw.githubusercontent.com/l0wGK/bitburner-crack/main/hack_2.js', 'hack_2.js');
	ns.print("Installed hack_2.js")
	await ns.wget('https://raw.githubusercontent.com/l0wGK/bitburner-crack/main/transactions.js', 'transactions.js');
	ns.print("Installed transactions.js");
}
