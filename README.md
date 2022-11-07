<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="artwork/oeeLogo.png" alt="Project logo"></a>
</p>

<h3 align="center">Smart OEE System</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()


</div>

---


<p align="center"> Smart OEE System
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [RPiClient Installation](#Installation)
- [Circuit](#circuit)
- [Usage](#usage)
- [WebApp](#webapp)
- [Built Using](#built_using)
- [Authors](#authors)


## 🧐 About <a name = "about"></a>

This repo contains

- Firmware
- Circuit Diagram
- Detailed instructions

for Smart OEE System.



## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your system.


### Prerequisites

Things you need to install the FW.

```
- Arduino IDE
```

### Installing <a name = "installing"></a>

A step by step series that tell you how to get the Firmware and Backend running

#### ESP32 Configuration

You should have Arduino IDE Installed

  1.  Add ESP32 Board to your Arduino IDE
    1. In your Arduino IDE, go to File> Preferences
        Installing ESP32 Add-on in Arduino IDE Windows, Mac OS X, Linux open preferences
    2. Enter ```https://dl.espressif.com/dl/package_esp32_index.json``` 
        into the “Additional Board Manager URLs” field then, click the “OK” button:
        Note: if you already have the ESP32 boards URL, you can separate the URLs with a comma(each board will go to neaw line) as follows:
        ```https://dl.espressif.com/dl/package_esp32_index.json,\n http://arduino.esp8266.com/stable/package_esp8266com_index.json```
    
    
  2. Open the Boards Manager. Go to Tools > Board > Boards Manager…
  3. Search for ESP32 and press install button for the ESP32 by Espressif Systems“:
  4. That’s it. It should be installed after a few seconds.
  5.   In your Arduino sketchbook directory, create tools directory if it doesn't exist yet.
  6.  Unpack the tool into tools directory(present in libs/ESP32FS-1.0.zip) (the path will look like <home_dir>/Arduino/tools/ESP32FS/tool/esp32fs.jar).
  7.  Close and re-open the Arduino IDE.

  8.  Now copy the contents of the libs folder to the libraries directory of your Arduino
      1. If you are using windows, the libraries directory will be Documents/Arduino/libraries

##### ESP32 Node FW Uploading
  1.  Select ESP32 Dev Module from Tools->Board->ESP32
  2.  Select the correct port from Tools->Port
  3.  Then open Firmware.ino file,
  4.  Select Tools > ESP32 Sketch Data Upload menu item. This should start uploading the files into ESP32 flash file system.
  5.  Now Upload the Code to your ESP32 Dev Module.
  6.  Your ESP32 is now ready to be used.



## Circuit <a name = "circuit"></a>


### ESP32 Dev Module Pinout


Follow the pinout diagram given below to connect different components to your TTGO LORA32 board.

![LoraPinout](Circuit/ESP32-Pinout.jpg)

### Other Components

```http
Other components pin connection details
```


#### Temperature Sensor DHT22

```DHT22 Connections```

| DHT22 Pins | ESP32 Dev Module Pins| 
| :--- | :--- | 
| `DATA OUT` | `23` |
| `VCC` | `5V` |
| `GND` | `GND` | 

#### Photoelectric Sensor

```Photoelectric Sensor Connections```


`From 2x 10K Resistors' center to Pin 18 of ESP32`

#### Status LED

```LED Connections```

| LED Pins | ESP32 Dev Module | 
| :--- | :--- | 
| `Anode` | `D2 via 220Ω resistor` |
| `Cathode` | `GND` |
*D2 is also connected to the internal LED of ESP32 Dev Module*

#### SCT-013 

```SCT-013 Connections```

-   Voltage Divider with 2x 100KΩ resistors.
-   10uF capacitor connected between Voltage Divider Circuit Output and GND
-   3.5mm Audio Jack connected between Voltage Divider Circuit Output and ESP32 Pin 34.

The overall SCT-013 connection assembly will look something like shown in the diagram below.

![SCTConnection](Circuit/sctWiring.jpg)

The photoelectric sensor has three wires as shown below

![PESConnection](Circuit/pesSch.jpg)

### Complete Circuit Diagram

Here's the complete circuit diagram of the system.

![CircuitDiagram](Circuit/Circuit_bb.png)

## Usage <a name = "usage"></a>

1.  Power on your ESP32, it will present you with an AP named ```OEE``` (while ```OEE``` can be changed in the portal)
2.  Default captive portal password `12345678AP` which can be changed in captive portal.
3.  Connect to the ESP32 access point and open the web-browser and navigate to the link ```http://esp32.local/_ac```. This link will work on most of the operating systems but if your operating system is not allowing to open it, you may want to check the captive portal IP Address from the serial monitor and can use that IP address inplace of the above mentioned URL.
4.  The default access IP Address is ```http://192.168.4.1/_ac```
5.  You will be presented with a main dashboard as shown below(based on your device)
   ![SCR1](artwork/scr1.png)

5.  Once connected to a WiFi network, you can again access the captive portal using same URL or the IP Address from the Serial monitor.
6.  The data is published to the MQTT Topic ```OEE/{hostname}``` while the hostname is the one which you can define in Settings page of the captive portal.


### Changing Timezone

1.  Open Settings tab
2.  Enter timezone string from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones 'TZ database name' column.
3.  Click Save&Start

### API Endpoints and HTML URLS
```API Endpoints```

| Endpoint | Description | 
| :--- | :--- | 
| `/api-now` | `API: live sensor readings in JSON format` |
| `/api` | `API: historical sensors data in JSON format` |
| `/LiveSensors` | `HTML PAGE: Live Sensor Data` |
| `/data` | `HTML PAGE: Historical Sensor Data` | 
| `/mqtt_settings` | `HTML PAGE: Settings. Default username: AP Name, Default Password: admin` | 
| `/_ac` | `HTML PAGE: Main Captive portal page` | 
| `/` | `HTML PAGE: Historical Sensor Data` | 


1.  **Connect to WiFi** tab allows searching of nearby WiFi APs and adding them to the ESP32.
   ![SCR3](artwork/scr3.png)
7.  **Saved WiFi Networks** tab allows connecting to the saved access points.
   ![SCR4](artwork/scr4.png)
8.  **Reset...** tab allows reseting of the device to factory settings.
    ![SCR5](artwork/scr5.png)
9.  **Settings** tab contains settings related to MQTT and sensors.
    ![SCR6](artwork/scr6.png)
10. **api-now** tab gives the live-sensor data in JSON format.
    ![SCR7](artwork/scr7.png)
11. **api** tab gives the historical sensor data acquired after every 5 mintues.
    ![SCR9](artwork/scr9.png)
13. **LiveSensors** tab shows live values of the sensors.
    ![SCR8](artwork/scr8.png)
12. **HOME** tab shows historical sensor data in a HTML table form acquired after every 5 minutes.
    ![SCR10](artwork/scr10.png)

## Web App <a name="webapp"></a>

[Dashboard Link: https://smartoeesystem.production.rehanshakir.com/](https://smartoeesystem.production.rehanshakir.com/)

You can access the webapp with following test acccount credentials

**Test Client**

*   Email Address: `howto0158@gmail.com`
*   Password: `1234`

**Admin**

*   Email Address: `admin@smartoee.com`
*   Password: `12345678`

### Dashboard Screenshots

 ![SCR11](artwork/db1.png) - Sign-in
 ![SCR12](artwork/db2.png) - Sign-up

 **Admin Dashboard**

 ![SCR13](artwork/db3.png) - Main Dashboard
 ![SCR14](artwork/db4.png) - Devices/Sensors Page
 ![SCR15](artwork/db5.png) - Adding a new Device/Sensor
 ![SCR16](artwork/db6.png) - Devices Management Page
 ![SCR17](artwork/db7.png) - User Profile

 **Client Dashboard**
 ![SCR18](artwork/cdb1.png) - Main Client Dashboard
 ![SCR19](artwork/cbd2.png) - Updating energy cost
 ![SCR20](artwork/cdb3.png) - Devices Management
 ![SCR21](artwork/cdb4.png) - Adding a new device
 ![SCR22](artwork/cdb5.png) - User Profile


### MQTT Details

From Device the data should be published to the topic `smartoee/data/#` in the format below:
* Replace `#` with the device MAC Address.

```json
{
  "macAddress": "FE064CSF",
  "oee":"20",
  "temperature":"30",
  "humidity":"45",
  "watts":"19"
}
```

Any change detected in the values will generate an alarm(as set in the dashboard) and will publish the value on the topic `{MAC Address}/smartoee` of the device.


## List of Components <a name = "list"></a>

Following components are used to make this project

1.  [ESP32 Dev Kit Module](https://www.amazon.com/HiLetgo-ESP-WROOM-32-Development-Microcontroller-Integrated/dp/B0718T232Z/ref=sr_1_3?crid=5EOAXOANUSCU&dchild=1&keywords=esp32+nodemcu&qid=1629587138&sprefix=esp32+node%2Caps%2C201&sr=8-3)

2.  [Current Sensor (SCT-013)](https://www.amazon.com/dp/B083S6YG36/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B083S6YG36&pd_rd_w=lyRRH&pf_rd_p=887084a2-5c34-4113-a4f8-b7947847c308&pd_rd_wg=ARQkk&pf_rd_r=9X6KNTP47QE6X1QG8RGX&pd_rd_r=92990704-e6cd-4c90-9b74-93726cb99938&smid=A1G4TRJSF885ET&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFWVzdCSUhXNFU2VEwmZW5jcnlwdGVkSWQ9QTAxODU2MTcxQjNFVUI5M1ZTSUEwJmVuY3J5cHRlZEFkSWQ9QTA3OTA4NTcxR0ZGQ1JOQUFHSFFPJndpZGdldE5hbWU9c3BfZGV0YWlsJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==)

or

2.  [Current Sensor 200A](https://www.amazon.com/Current-Sensor-Transformer-Energy-Meter/dp/B0B91R55TS/ref=sr_1_1_sspa?keywords=200%2Bamp%2Bcurrent%2Btransformer&qid=1665830554&qu=eyJxc2MiOiIzLjI5IiwicXNhIjoiMS41MCIsInFzcCI6IjEuMDAifQ%3D%3D&sprefix=200amps%2Bcurrent%2B%2Caps%2C172&sr=8-1-spons&th=1)

3.  [DHT22 Temperature and Humidity Sensor](https://www.amazon.com/Gowoops-Temperature-Humidity-Measurement-Raspberry/dp/B073F472JL/ref=sr_1_7?dchild=1&keywords=dht22&qid=1624855583&sr=8-7)

4.  [Vibration Sensor (IMU) (MPU6050)](https://www.amazon.com/HiLetgo-MPU-6050-Accelerometer-Gyroscope-Converter/dp/B00LP25V1A/ref=sr_1_1?dchild=1&keywords=mpu6050&qid=1624855642&sr=8-1)

5. [Photoelectric Sensor](https://www.amazon.com/IKSACE-Photoelectric-Switchable-Retroreflective-photoelectric/dp/B08KRQ7M1P/ref=sr_1_2_sspa?crid=AFC4R8W4ZACQ&keywords=photoelectric+sensor&qid=1658931884&sprefix=photo+electric+sensor%2Caps%2C164&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzQjVGMTdENVE3Ukg3JmVuY3J5cHRlZElkPUEwMTEzMDE5MjVIUDc4WU1RTDZZSSZlbmNyeXB0ZWRBZElkPUExMDQ1MDY0MjU5UFUySEsyS1lDNiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=)


6.  [Generic 3.5mm Green/Red/Blue LEDs](https://www.amazon.com/MCIGICM-Circuit-Assorted-Science-Experiment/dp/B07PG84V17/ref=sr_1_7?crid=3HENJ8ZXU0S5Z&keywords=3.5mm+green+led+diode&qid=1661962154&sprefix=3.5mm+green+led+diod%2Caps%2C145&sr=8-7)

7.  [Generic 3.5mm Audio Jack with Screw Terminals](https://www.amazon.com/Cerrxian-Terminal-Headphone-Converter-Adapter/dp/B06WRRGYMM/ref=sr_1_4?keywords=3.5mm+audio+jack+with+screw+terminals&qid=1661962196&sprefix=3.5mm+audio+jack+screw+term%2Caps%2C149&sr=8-4)

8.  [Generic 10uF 25v Capacitor](https://www.amazon.com/Tnisesm-Electrolytic-Capacitor-Aluminum-10UF-25V-4X7/dp/B089YCK59V/ref=sr_1_3?crid=1C9R0W2QOGYKM&keywords=10uF+25v+Capacitor&qid=1661962266&sprefix=10uf+25v+capacitor%2Caps%2C150&sr=8-3)

9.  [Generic 220Ω Resistors](https://www.amazon.com/BOJACK-Single-Resistor-Resistors-200pcs/dp/B07PFFF1VK/ref=sr_1_2_sspa?keywords=220+ohm+resistor&qid=1661962286&sprefix=220+ohm+re%2Caps%2C170&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExSjBDS01TWFVLMDROJmVuY3J5cHRlZElkPUEwOTg2MTI1MVFWUkdHOVlMSlJRNCZlbmNyeXB0ZWRBZElkPUEwMDk4MDUwMUFSWVpURzBOQjI1WiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=)

10. [Generic 10KΩ Resistors](https://www.amazon.com/EDGELEC-Resistor-Tolerance-Multiple-Resistance/dp/B07QJB31M7/ref=sr_1_3?crid=2HI6SLRAJA89Y&keywords=10k+ohm+resistor&qid=1661962337&sprefix=10k+ohm+resistor%2Caps%2C156&sr=8-3)

11. [Generic 100KΩ Resistors](https://www.amazon.com/Resistor-Tolerance-Resistors-Limiting-Certificated/dp/B08QRSQB18/ref=sr_1_5?crid=22PVPZ27SRB46&keywords=100k+ohm+resistor&qid=1661962371&sprefix=100k+ohm+resistor%2Caps%2C152&sr=8-5)

12.  [Generic 5V USB Micro B cable and adapter](https://www.amazon.com/Travel-Charger-Adapter-Samsung-Galaxy/dp/B0117O020U/ref=sr_1_2?crid=1B8DC0ISE9184&keywords=micro+usb+adapter+2a&qid=1661962423&sprefix=micro+usb+adapter+2a%2Caps%2C150&sr=8-2)

13. [Micro USB Cable](https://www.amazon.com/Android-Charger-sweguard-Charging-Phone-Grey/dp/B09MT18H3J/ref=sr_1_2_sspa?keywords=micro+usb+cable&qid=1661962441&sprefix=micro+usb+%2Caps%2C181&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzVkw1N1RQVTVHTVA3JmVuY3J5cHRlZElkPUEwODYyODU0MUdBSDQwTjBWVDZVSiZlbmNyeXB0ZWRBZElkPUEwODMyNjQyMVo4WU1VOVQ5UlMzQiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=)

14. [Breadboard, Jumper Wires and Power Supply Module](https://www.amazon.com/HUAREW-Breadboard-Wires%EF%BC%8CBattery-Clip%EF%BC%8C830-tie-Points/dp/B09TX9CMG1/ref=sr_1_1_sspa?crid=37A14NI37887J&keywords=breadboard&qid=1661962059&sprefix=breadboar%2Caps%2C174&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzUFNNSFNZMlMwUlM1JmVuY3J5cHRlZElkPUEwNzIwOTA3MzNCWFhSWUxTSDNNOCZlbmNyeXB0ZWRBZElkPUEwMjkzNTA3UzVYTU9OSTBaSEJDJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==)

15. [Jumper Wires](https://www.amazon.com/EDGELEC-Breadboard-Optional-Assorted-Multicolored/dp/B07GD2BWPY/ref=sr_1_1_sspa?crid=1EFHAMLH1TF1Q&keywords=jumper+wires&qid=1661962101&sprefix=jumper+wire%2Caps%2C197&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFHUFdBUzFHMDVOSlUmZW5jcnlwdGVkSWQ9QTAwNTYwNTAyVDNTNFI5RVI4TTNQJmVuY3J5cHRlZEFkSWQ9QTA5NDU0MzYxSkE3VExKQkZEQUxaJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==)

16. [12V 3A Adapter](https://www.amazon.com/GOOKYO-Charger-Switching-Replacement-Adapter/dp/B095S61GFH/ref=sr_1_1_sspa?crid=1SJAZEJ5JMJ3I&keywords=12v+3a+adapter&qid=1661962542&sprefix=12v+3a+adapte%2Caps%2C165&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyNDlPU0xXVFA1Q0hUJmVuY3J5cHRlZElkPUEwMDUzMjA3MkpPOE02VktHUk1HQyZlbmNyeXB0ZWRBZElkPUEwMDA1NTYxMUY4SU9ITERHVFYxVSZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=)

## ⛏️ Built Using <a name = "built_using"></a>

- [Python](https://www.python.org/) - For Cloud Gateway Pogramming
- [Arduino](https://www.arduino.cc/) - Embedded Framework and IDE - For Sensor Node Design

## 📹 Demo Videos <a name = "demo"></a>

-   [Device Demo Video](https://youtu.be/jB85V6VlB9w) - OEE Device Demo Video

## ✍️ Authors <a name = "authors"></a>

- [@Nauman3S](https://github.com/Nauman3S) - Development and Deployment
