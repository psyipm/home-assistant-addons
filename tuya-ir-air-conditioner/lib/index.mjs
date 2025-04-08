import { DeviceConfig } from "./config.mjs";
import { AirConditioner } from "./air_conditioner.mjs";
import { MQTTClient } from "./mqtt_client.mjs";
import { log } from "./logger.mjs";
import process from "process";

const airConditioner = new AirConditioner(DeviceConfig);

let state = await airConditioner.queryDeviceStatus();

const mqttClient = new MQTTClient({
  onConnect: publishState,
  onMessage: handleMessage
});

async function publishState() {
  state = await airConditioner.queryDeviceStatus();

  log(JSON.stringify(state))

  Object.keys(state).forEach(key => {
    if (key === "mode" && state.power === "off") {
      mqttClient.publishState(key, "off");
    } else {
      mqttClient.publishState(key, state[key]);
    }
  });
}

async function handleMessage(topic, message) {
  const [topicName, _action] = topic.split("/").slice(-2); // eslint-disable-line no-unused-vars
  const value = message.toString().toLowerCase();

  if ((state.power === "off" && ![ "power", "mode" ].includes(topicName))) {
    log("Device is off, ignoring message");
    return;
  }

  log(`Setting ${topicName} to ${value}`);

  try {
    switch (topicName) {
      case "power":
        await airConditioner.setPower(value);
        break;
      case "mode":
        await airConditioner.setMode(value);
        break;
      case "temperature":
        await airConditioner.setTemperature(value);
        break;
      case "fan":
        await airConditioner.setFan(value);
        break;
    }
  } catch (error) {
    console.error(error);
  } finally {
    await publishState();
  }
}

["SIGINT", "SIGTERM"].map((signal) => {
  process.on(signal, () => {
    log(`Received ${signal}, exiting`);
    mqttClient.client.end();
  })
})
