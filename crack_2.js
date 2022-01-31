/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('ALL');
	const neighbours = ns.scan('home');

	async function findChildren(neighbour) {
		const parent = ns.scan(neighbour);
		for (const child of parent) {
			if (!neighbours.includes(child) && child != 'home') neighbours.push(child);
		}
	}

	async function infectHost(host) {
		var hostRequiredPorts = ns.getServerNumPortsRequired(host);
		var hostUnlockedPorts = 0;
		if (!ns.hasRootAccess(host)) {
			if (hostRequiredPorts > 0) {
				if (ns.fileExists('BruteSSH.exe') && hostRequiredPorts != hostUnlockedPorts) {
					ns.brutessh(host);
					hostUnlockedPorts++;
				}
				if (ns.fileExists('FTPCrack.exe') && hostRequiredPorts != hostUnlockedPorts) {
					ns.ftpcrack(host);
					hostUnlockedPorts++;
				}
				if (ns.fileExists('HTTPWorm.exe') && hostRequiredPorts != hostUnlockedPorts) {
					ns.httpworm(host);
					hostUnlockedPorts++;
				}
				if (ns.fileExists('relaySMTP.exe') && hostRequiredPorts != hostUnlockedPorts) {
					ns.relaysmtp(host);
					hostUnlockedPorts++;
				}
			}

			if (hostRequiredPorts == hostUnlockedPorts) {
				ns.nuke(host);
				ns.print(`Gained root access to ${host}`);
			}
		}
		if (ns.hasRootAccess(host)) {
			if (ns.fileExists('hack_2.js', host)) ns.rm('hack_2.js', host);
			await ns.scp('hack_2.js', host);
			ns.print(`Infected ${host}`);
		} else neighbours.splice(neighbours.indexOf(host), 1);
	}

	var targets = [];
	async function mostMoney(server) {
		if (ns.hasRootAccess(server)) {
			var serverMoney = ns.getServerMoneyAvailable(server) * ns.hackAnalyzeChance(server);
			if (ns.getServerMoneyAvailable(server) <= 100000000) return;
			if (!targets[0]) {
				targets.push(server);
			} else {
				for (const target of targets) {
					var targetMoney = ns.getServerMoneyAvailable(target) * ns.hackAnalyzeChance(target);
					if (serverMoney > targetMoney && !targets.includes(server)) {
						targets.splice(targets.indexOf(target) - 1, 0, server).join();
					}
				}
			}
		}
	}

	var currentThreads = 0;
	async function attackServer(host, target, threads) {
		if (!target) return;
		if (currentThreads >= 2500) {
			currentThreads = 0;
			return targets.splice(targets.indexOf(target), 1);
		}
		currentThreads = currentThreads + threads;
		var args = `${target} ${threads}`
		ns.exec('hack_2.js', host, threads, args);
		ns.print(`Started attacking ${target} on ${host} [${ns.nFormat(threads, '0.0a')}]`);
	}

	for (const neighbour of neighbours) {
		await findChildren(neighbour);
	}

	for (const neighbour of neighbours) {
		await infectHost(neighbour);
	}

	for (const neighbour of neighbours) {
		await mostMoney(neighbour);
	}

	ns.print(`Targets: ${targets}`);

	await ns.writePort(1, "");
	await ns.writePort(2, "");

	for (const neighbour of neighbours) {
		var hostAvailableRAM = ns.getServerMaxRam(neighbour) - ns.getServerUsedRam(neighbour);
		var scriptRAM = ns.getScriptRam('hack.js', neighbour);
		var hostUseThreads = Math.floor(hostAvailableRAM/scriptRAM);
		var target = targets[0];
		if (hostUseThreads > 0) {
			if (hostUseThreads > 2500) hostUseThreads = 2500;
			await attackServer(neighbour, target, hostUseThreads); 
		} 
	}

	ns.exec('track_2.js', 'home');
	ns.tail('track_2.js', 'home');
	ns.exec('transactions.js', 'home');
	ns.tail('transactions.js', 'home');

	while (true) {
		await ns.sleep(1000);
	}
}
