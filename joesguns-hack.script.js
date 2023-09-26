// Defines the "target server"
var target = "joesguns";

// Defines how much money a server should have before we hack it
var moneyThresh = getServerMaxMoney(target) * 0.75;

// Defines the maximum security level the target server can
// have
var securityThresh = getServerMinSecurityLevel(target) + 5;

// If we have various brute force programs, use them 
// to open ports on the target server
if (fileExists("BruteSSH.exe", "home")) {
    brutessh(target);
}
if (fileExists("FTPCrack.exe", "home")) {
    ftpcrack(target);
}
if (fileExists("HTTPWorm.exe", "home")) {
    httpworm(target);
}
if (fileExists("relaySMTP.exe", "home")) {
    relaysmtp(target);
}
if (fileExists("SQLInject.exe", "home")) {
    sqlinject(target);
}

// Get root access to target server
nuke(target);

// Infinite loop that continously hacks/grows/weakens the target server
while(true) {
    if (getServerSecurityLevel(target) > securityThresh) {
        // If the server's security level is above our threshold, weaken it
        weaken(target);
    } else if (getServerMoneyAvailable(target) < moneyThresh) {
        // If the server's money is less than our threshold, grow it
        grow(target);
    } else {
        // Otherwise, hack it
        hack(target);
    }
}

/*
  FUTURE:
  - Replace hardcoded target w/ input parameter for something like $HOTSNAME
*/