# Installation

1. Get an API token from the Tuya Iot Cloud platform  
  1.1. Go to https://iot.tuya.com/  
  1.2. Select "Cloud->Development" in the left sidebar  
  1.3. Add a Cloud Authorization for your project  
2. Configure your Air conditioner using the Tuya IR remote
3. Find the device IDs  
  3.1. Under "Cloud->Development->Devices" select the "All devices" tab  
  3.2. Look for Smart IR device ID (`ir_gateway_id` in add-on config)  
  3.3. Look for Air conditioner device ID (`ac_device_id` in add-on config)  
4. Install [mosquitto-broker](https://github.com/home-assistant/addons/tree/master/mosquitto) or any other MQTT add-on  
  4.1. Add MQTT user in HomeAssistant  
6. Configure the [MQTT HVAC](https://www.home-assistant.io/integrations/climate.mqtt/) integration  
  5.1. Tuya IR only supports Power, Mode, Temperature and Fan  
  5.2. The addon assumes that each topic has `/set` and `/state` subtopics  
  5.3. Example config for `MQTT HVAC`:  

  ```yaml
  mqtt:
  - climate:
      name: Bedroom air conditioner
      retain: true
      min_temp: 17
      max_temp: 30
      modes:
        - "off"
        - "cool"
        - "heat"
        - "dry"
        - "fan_only"
      fan_modes:
        - "auto"
        - "high"
        - "medium"
        - "low"
      power_command_topic: "smarthome/bedroom/ac/power/set"
      mode_command_topic: "smarthome/bedroom/ac/mode/set"
      mode_state_topic: "smarthome/bedroom/ac/mode/state"
      temperature_command_topic: "smarthome/bedroom/ac/temperature/set"
      temperature_state_topic: "smarthome/bedroom/ac/temperature/state"
      fan_mode_command_topic: "smarthome/bedroom/ac/fan/set"
      fan_mode_state_topic: "smarthome/bedroom/ac/fan/state"
  ```
6. Restart Home Assistant after changing `configuration.yaml`

## Add-on Configuration

```yaml
  tuya:
    base_url: "https://openapi.tuyaeu.com"
    access_key: "Access key from Tuya IoT platform"
    secret_key: "Secret key from Tuya IoT platform"
  device:
    ir_gateway_id: "IR gateway device ID from Tuya IoT platform"
    ac_device_id: "Air Conditioner device ID from Tuya IoT platform"
  mqtt:
    server_url: "mqtt://localhost:1883"
    username: mqtt
    password: mqtt
  mqtt_topics:
    power: "smarthome/bedroom/ac/power"
    mode: "smarthome/bedroom/ac/mode"
    temperature: "smarthome/bedroom/ac/temperature"
    fan: "smarthome/bedroom/ac/fan"
```
