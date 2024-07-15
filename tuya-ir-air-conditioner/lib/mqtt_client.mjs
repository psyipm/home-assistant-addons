import { MQTTConfig, MQTTTopics } from "./config.mjs";
import mqtt from "mqtt";

class MQTTClient {
  constructor({ onConnect, onMessage }) {
    this.client = mqtt.connect(MQTTConfig.url, {
      username: MQTTConfig.username,
      password: MQTTConfig.password
    });

    this.client.on("connect", onConnect);

    this.client.subscribe(Object.values(MQTTTopics).map(topic => `${topic}/set`), (err) => {
      if (err) {
        console.error(err);
      }
    });

    this.client.on("message", onMessage);
  }

  publishState(name, value) {
    // console.log(`Publishing ${name} with value ${value}`)

    const topic = MQTTTopics[name];
    if (!topic) {
      throw new Error(`Name ${name} not found`);
    }

    this.client.publish(`${topic}/state`, value.toString());
  }
}

export { MQTTClient };
