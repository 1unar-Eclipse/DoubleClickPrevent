// Double Click Prevent: Adds artificial debounce time, in case your mouse has no way to adjust it or servers want it at a specific value

// basic module stuff
let mod = new Module(
    "DoubleClickPrevent",
    "Double Click Prevent",
    "Adds a window after clicking where subsequent ones are ignored. (Only works with mouse buttons)",
    KeyCode.None
);
client.getModuleManager().registerModule(mod);

// option
let optDebounce = mod.addNumberSetting(
    "debounce",
    "Debounce Time (ms)",
    "Window where subsequent clicks are ignored",
    0,
    50,
    1,
    0
);

// limit
let lastValidClickTimeLeft: number = 0, // time of the last valid click
    lastValidClickTimeRight: number = 0;
    
client.on("click", e => {
    // return cases:
    if(!mod.isEnabled()) return; // module off
    if(!e.isDown) return; // button lifts

    if(e.button == MouseButton.Left) { // left click case
        let clickTimeLeft = Date.now();
        // if the time of the last valid click plus the interval (the max time after the click) is greater than the current time [if the click is within debounce time],
        if(lastValidClickTimeLeft + optDebounce.getValue() > clickTimeLeft) {
            // cancel the click
            e.cancel = true;
            // clientMessage("Cancelled!");
        }
        // otherwise [if the click is not within debounce time],
        else {
            // do not cancel the click and update the valid timestamp
            e.cancel = false;
            lastValidClickTimeLeft = clickTimeLeft;
            // clientMessage("Not cancelled.");
        }
    }

    if(e.button == MouseButton.Right) { // right click case
        let clickTimeRight = Date.now();
        if(lastValidClickTimeRight + optDebounce.getValue() > clickTimeRight) {
            e.cancel = true;
            // clientMessage("Cancelled!");
        }
        else {
            e.cancel = false;
            lastValidClickTimeRight = clickTimeRight;
            // clientMessage("Not cancelled.");
        }
    }
});