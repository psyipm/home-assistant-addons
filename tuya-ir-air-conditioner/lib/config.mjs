import process from "process";

const TuyaConfig = {
  baseUrl: process.env.TUYA_BASE_URL,
  accessKey: process.env.TUYA_ACCESS_KEY,
  secretKey: process.env.TUYA_SECRET_KEY,
};

const DeviceConfig = {
  gatewayId: process.env.TUYA_GATEWAY_ID,
  deviceId: process.env.TUYA_DEVICE_ID,
}

const MQTTConfig = {
  url: `mqtt://${process.env.MQTT_SERVER_URL}`,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const MQTTTopics = {
  "power": process.env.MQTT_POWER_TOPIC,
  "mode": process.env.MQTT_MODE_TOPIC,
  "fan": process.env.MQTT_FAN_TOPIC,
  "temperature": process.env.MQTT_TEMPERATURE_TOPIC,
};

export { TuyaConfig, DeviceConfig, MQTTConfig, MQTTTopics };
