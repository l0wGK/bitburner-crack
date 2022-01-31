/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('ALL');

	while (true) {
		var message = await ns.readPort(2);
		if (!message.includes("NULL PORT DATA") && message != "") ns.print(message); 
		await ns.sleep(100);
	}	
}
