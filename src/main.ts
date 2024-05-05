// Double Click Prevent: Adds artificial debounce time, in case your mouse has no way to adjust it or servers want it at a specific value

// basic module stuff
let mod = new Module(
    "DoubleClickPrevent",
    "Double Click Prevent",
    "Adds a window after clicking where subsequent clicks are ignored. (Only works with mouse buttons)",
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
let lastValidClickTime: number[] = [0, 0];
    
client.on("click", e => {
    // return cases:
    if(!mod.isEnabled()) return; // module off
    if(!e.isDown) return; // button lifts
    if(!(e.button == MouseButton.Left || e.button == MouseButton.Right)) return; // only let left and right clicks through

    let clickTime = Date.now();
    // if the time of the last valid click plus the interval (the max time after the click) is greater than the current time [if the click is within debounce time],
    if(lastValidClickTime[e.button - 1] + optDebounce.getValue() > clickTime) { // note: e.button - 1 is always 0 or 1
        e.cancel = true; // cancel the click
    }
    else { // otherwise [if the click is not within debounce time],
        lastValidClickTime[e.button - 1] = clickTime; // update the valid timestamp (not cancelled in case other plugins mess with it)
    }
});