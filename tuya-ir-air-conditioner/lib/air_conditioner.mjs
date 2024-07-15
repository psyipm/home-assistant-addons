import { TuyaConfig } from "./config.mjs";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";

const POWER = {
  "on": true,
  "off": false
}

const MODE = {
  "cool": 0,
  "heat": 1,
  "auto": 2,
  "fan_only": 3,
  "dry": 4
}

const FAN = {
  "auto": 0,
  "low": 1,
  "medium": 2,
  "high": 3
}

class AirConditioner {
  constructor({ gatewayId, deviceId }) {
    this.gatewayId = gatewayId;
    this.deviceId = deviceId;

    this.tuya = new TuyaContext({
      baseUrl: TuyaConfig.baseUrl,
      accessKey: TuyaConfig.accessKey,
      secretKey: TuyaConfig.secretKey
    });
  }

  async queryDeviceStatus() {
    const response = await this.tuya.request({
      path: `/v2.0/cloud/thing/${this.deviceId}/shadow/properties`,
      method: "GET",
      query: {
        "codes": ["switch_power", "mode", "temperature", "fan"].join(",")
      }
    })

    return new Promise((resolve, reject) => {
      if (response.success) {
        const mappedProperties = {};

        response.result.properties.map(({ code, value }) => {
          switch (code) {
            case "switch_power":
              mappedProperties.power = Object.keys(POWER).find(key => POWER[key] == value);
              break;
            case "mode":
              mappedProperties.mode = Object.keys(MODE).find(key => MODE[key] == value);
              break;
            case "temperature":
              mappedProperties.temperature = value;
              break;
            case "fan":
              mappedProperties.fan = Object.keys(FAN).find(key => FAN[key] == value);
              break;
          }
        });

        resolve(mappedProperties);
      } else {
        reject(response);
      }
    });
  }

  async setPower(value) {
    if (typeof POWER[value] === "undefined") {
      throw new Error(`Invalid power value ${value}`);
    }

    const result = await this.tuya.request({
      path: `/v1.0/infrareds/${this.gatewayId}/air-conditioners/${this.deviceId}/command`,
      method: "POST",
      body: {
        "code": "power",
        "value": value === "on" ? 1 : 0
      }
    })

    return new Promise((resolve, reject) => {
      if (result.success) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }

  async setMode(value) {
    if (value === "off") {
      return this.setPower(value);
    }

    if (typeof MODE[value] === "undefined") {
      throw new Error(`Invalid mode value ${value}`);
    }

    const result = await this.tuya.request({
      path: `/v1.0/infrareds/${this.gatewayId}/air-conditioners/${this.deviceId}/command`,
      method: "POST",
      body: {
        "code": "mode",
        "value": MODE[value]
      }
    });

    return new Promise((resolve, reject) => {
      if (result.success) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }

  async setTemperature(value) {
    const result = await this.tuya.request({
      path: `/v1.0/infrareds/${this.gatewayId}/air-conditioners/${this.deviceId}/command`,
      method: "POST",
      body: {
        "code": "temp",
        "value": value
      }
    });

    return new Promise((resolve, reject) => {
      if (result.success) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }

  async setFan(value) {
    if (typeof FAN[value] === "undefined") {
      throw new Error(`Invalid fan value ${value}`);
    }

    const result = await this.tuya.request({
      path: `/v1.0/infrareds/${this.gatewayId}/air-conditioners/${this.deviceId}/command`,
      method: "POST",
      body: {
        "code": "wind",
        "value": FAN[value]
      }
    });

    return new Promise((resolve, reject) => {
      if (result.success) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }
};

export { AirConditioner };
