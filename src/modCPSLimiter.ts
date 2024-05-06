// CPS Limiter: Forces a hard limit on clicks per second

let modCPSLimiter = new Module(
    "CPSLimiter",
    "CPS Limiter",
    "Forces a hard limit on clicks per second",
    KeyCode.None
);
let optionLimit = modCPSLimiter.addNumberSetting(
    "limit",
    "CPS Limit",
    "The limit to how many clicks can be sent per second",
    0,
    20,
    1,
    10
);
let optionLeft = modCPSLimiter.addBoolSetting(
    "left",
    "Left Click",
    "Controls whether left click CPS is limited",
    true
);
let optionRight = modCPSLimiter.addBoolSetting(
    "right",
    "Right Click",
    "Controls whether right click CPS is limited",
    true
);
client.getModuleManager().registerModule(modCPSLimiter);

let clicks = [0, 0];

client.on("click", e => {

    if(!modCPSLimiter.isEnabled()) return; // module off
    if(!e.isDown) return; // button lifts
    if(!(e.button == MouseButton.Left || e.button == MouseButton.Right)) return; // only let left and right clicks through
    if(e.cancel) return; // if the click wasn't cancelled from some other plugin

    let button = e.button - 1;
    if(clicks[button] >= optionLimit.getValue()) { // if the amount of stored clicks is above the limit
        e.cancel = true; // cancel the click (thus limiting the cps)
    }
    else { // if underneath,
        clicks[button]++; // add 1 to the global click variable
        setTimeout(() => {
            clicks[button]--;
        }, 1000); // remove it 1 second later
    }
});