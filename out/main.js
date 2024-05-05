let mod = new Module("DoubleClickPrevent", "Double Click Prevent", "Adds a window after clicking where subsequent ones are ignored. (Only works with mouse buttons)", 0);
client.getModuleManager().registerModule(mod);
let optDebounce = mod.addNumberSetting("debounce", "Debounce Time (ms)", "Window where subsequent clicks are ignored", 0, 50, 1, 0);
let lastValidClickTimeLeft = 0, lastValidClickTimeRight = 0;
client.on("click", e => {
    if (!mod.isEnabled())
        return;
    if (!e.isDown)
        return;
    if (e.button == 1) {
        let clickTimeLeft = Date.now();
        if (lastValidClickTimeLeft + optDebounce.getValue() > clickTimeLeft) {
            e.cancel = true;
        }
        else {
            e.cancel = false;
            lastValidClickTimeLeft = clickTimeLeft;
        }
    }
    if (e.button == 2) {
        let clickTimeRight = Date.now();
        if (lastValidClickTimeRight + optDebounce.getValue() > clickTimeRight) {
            e.cancel = true;
        }
        else {
            e.cancel = false;
            lastValidClickTimeRight = clickTimeRight;
        }
    }
});
