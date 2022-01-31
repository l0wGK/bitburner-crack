/** @param {NS} ns **/
export async function main(ns) {
	var args = ns.args.toString().split(" ");
	const server = args[0];
	const threads = parseInt(args[1]);
	
	if (server == "undefined") return;

	while (true) {
		var serverSecurity = ns.getServerSecurityLevel(server);
		var serverSecurityThresh = ns.getServerMinSecurityLevel(server) + 5;
		var serverMoney = ns.getServerMoneyAvailable(server);
		var serverMoneyThresh = ns.getServerMaxMoney(server)/2;
		var sWeakenTime = ns.getWeakenTime(server);
		var sGrowTime = ns.getGrowTime(server);
		var sHackTime = ns.getHackTime(server);
		var host = ns.getHostname();
		var time = new Date().toLocaleString();
		
		if (serverMoney < 1000) {
			await ns.writePort(1, `${time} >> Stopped attacking ${server} on ${host}`);
			return ns.exec('crack_2.js', 'home');
		}

		if (serverSecurityThresh < serverSecurity) {
			await ns.writePort(1, `${time} >> Weakening ${server} on ${host} [${ns.tFormat(sWeakenTime)}]`);
			var weakened = await ns.weaken(server);
			await ns.writePort(1, `${time} >> Weakened ${server} on ${host} with ${weakened}`);
		} else if (serverMoneyThresh > serverMoney) {
			await ns.writePort(1, `${time} >> Growing ${server} on ${host} [${ns.tFormat(sGrowTime)}]`);
			await ns.grow(server);
			await ns.writePort(1, `${time} >> Grew ${server} on ${host} with ${ns.nFormat(ns.getServerMoneyAvailable(server) - serverMoney, '0.0a')}`);
		} else {
			await ns.writePort(1, `${time} >> Hacking ${server} on ${host} [${ns.tFormat(sHackTime)}]`);
			var hacked = await ns.hack(server);
			if (hacked > 0) {
				await ns.writePort(1, `${time} >> Hacked ${server} on ${host} +\$${hacked}`);
				await ns.writePort(2, `${time} >> +\$${ns.nFormat(hacked, '0.0a')}`);
			}
		}

		await ns.sleep(2500);
	}
}
