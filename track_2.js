/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('ALL');

	while (true) {
		var message = await ns.readPort(1);
		if (message != "NULL PORT DATA" && message != "") ns.print(message);
		await ns.sleep(100);
	}
}
