The navigator object in our web worker doesn't include navigator,
so we don't have access to BLE. console debug:

-- cut --

appCodeName: "Mozilla"
appName: "Netscape"
appVersion: "5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"
connection: NetworkInformation {onchange: null, effectiveType: "4g", rtt: 200, downlink: 1.05, saveData: false}
deviceMemory: 4
hardwareConcurrency: 4
language: "en-US"
languages: (2) ["en-US", "en"]
locks: LockManager {}
mediaCapabilities: MediaCapabilities {}
onLine: true
permissions: Permissions {}
platform: "MacIntel"
product: "Gecko"
storage: StorageManager {}
usb: USB {onconnect: null, ondisconnect: null}
userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"
__proto__: WorkerNavigator

-- cut --

No navigator.bluetooth :(
