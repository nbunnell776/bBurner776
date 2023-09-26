// Def script to copy (replace w/ input var or generic template script later)
var hackScript = "joesguns-hack.script";

// Def memory required to run script
var memReq = getScriptRam(hackScript);

// Def function to call SCP & EXEC on target
function copyExec(target, script) {
  // Result of scp() function call
  // Returns true on success, false on error
  var result = scp(script, target);
  
  if (result != 1) {
    tprint("Error copying script to ", target);
    return -1;
  } else { 
    tprint("Success copying script to ", target);
  }

  // Calculate number of threads to call by taking available RAM 
  // div by RAM req's for script to run and subtracting any decimal
  // value to get an integer result
  //var serverRAM = getserverram(target); 
  var availRAM = getServerMaxRam(target) - getServerUsedRam(target);
  var numThreads = (availRAM/memReq) - ((availRAM/memReq)%1);

  // DEBUG
  /*tprint("\n### DEBUG ###");
  tprint("availRAM ", availRAM);
  tprint("memReq ", memReq);
  tprint("availRAM/memReq ", availRAM/memReq);
  tprint("availRAM%memReq ", availRAM%memReq);
  tprint("Thread calc was ", numThreads);
  tprint("### END DEBUG ###\n");
  */

  if (numThreads < 1) {
    tprint("Not enough available RAM to execute script on ", target)
    return -2
  } else {
    tprint("Executing ", script, " on ", target, " with ", numThreads, " threads\n");
  }

  // Result of exec() function call
  // Returns ID of new process on success, 0 on error
  var id = exec(script, target, numThreads);
  
  if (id == 1) {
    tprint("Error executing script on ", target);
    return -3;
  } else {
    tprint("Success executing script on ", target);
  }

  return 0;
}

// Call copyExec on each discovered host
copyExec("n00dles", hackScript);
copyExec("foodnstuff", hackScript);
copyExec("sigma-cosmetics", hackScript);
copyExec("joesguns", hackScript);
copyExec("hong-fang-tea", hackScript);
copyExec("harakiri-sushi", hackScript);
copyExec("iron-gym", hackScript);

/* 
  FUTURE:
  - Replace hardcoded script w/ input parameter and/ or generic template script
  - move multiple copyExec calls into loop structure

var serverList[] = getServerNames();
for (var i = 0; i < serverList.Length(); i++) {
  copyExec(serverList[i], hackScript);
}

*/
