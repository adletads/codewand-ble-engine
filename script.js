const connectButton = document.getElementById('connect-button');
const deviceInfo = document.getElementById('device-info');
const deviceNameSpan = document.getElementById('device-name');
const flashContainer = document.getElementById('flash-container');
const firmwareFile = document.getElementById('firmware-file');
const flashButton = document.getElementById('flash-button');
const statusMessages = document.getElementById('status-messages');

let bleDevice;
let gattServer;

function log(message) {
    statusMessages.textContent += message + '\n';
}

// Log the bluetooth object to see if it's available
console.log('navigator.bluetooth:', navigator.bluetooth);

connectButton.addEventListener('click', async () => {
    try {
        log('Requesting Bluetooth device...');
        bleDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            // You should filter for specific services if you know them
            // optionalServices: ['your-service-uuid'] 
        });

        log('Connecting to GATT Server...');
        gattServer = await bleDevice.gatt.connect();

        log(`Connected to ${bleDevice.name}`);
        deviceNameSpan.textContent = bleDevice.name;
        deviceInfo.classList.remove('hidden');
        flashContainer.classList.remove('hidden');
        connectButton.classList.add('hidden');

    } catch (error) {
        log(`Error: ${error}`);
    }
});

flashButton.addEventListener('click', async () => {
    if (!firmwareFile.files[0]) {
        log('Please select a firmware file.');
        return;
    }

    if (!gattServer || !gattServer.connected) {
        log('Device not connected.');
        return;
    }

    log('Starting firmware flash...');
    const file = firmwareFile.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
        const firmwareData = event.target.result;
        log(`Firmware size: ${firmwareData.byteLength} bytes`);

        try {
            // --- Placeholder for actual flashing logic ---
            // You will need to replace this with the actual GATT service and
            // characteristic UUIDs for your device's DFU (Device Firmware Update) process.

            // 1. Get the DFU service
            // const dfuService = await gattServer.getPrimaryService('your-dfu-service-uuid');

            // 2. Get the control point and packet characteristics
            // const controlPointChar = await dfuService.getCharacteristic('your-control-point-uuid');
            // const packetChar = await dfuService.getCharacteristic('your-packet-uuid');

            // 3. Write commands to the control point to start the update
            //    (e.g., start DFU, send firmware size).
            //    await controlPointChar.writeValue(new Uint8Array([1, ...]));

            // 4. Send the firmware data in chunks via the packet characteristic.
            //    const chunkSize = 20; // Or whatever the device supports
            //    for (let i = 0; i < firmwareData.byteLength; i += chunkSize) {
            //        const chunk = firmwareData.slice(i, i + chunkSize);
            //        await packetChar.writeValueWithoutResponse(chunk);
            //        log(`Sent chunk ${i / chunkSize + 1}`);
            //    }

            // 5. Write a final command to the control point to activate the new firmware.
            //    await controlPointChar.writeValue(new Uint8Array([4]));

            log('--- Flashing simulation ---');
            log('This is a placeholder. Implement actual flashing logic here.');
            log('Firmware flash successful (simulation).');

        } catch (error) {
            log(`Error during flashing: ${error}`);
        }
    };

    fileReader.readAsArrayBuffer(file);
