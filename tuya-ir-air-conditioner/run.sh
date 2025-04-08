#!/usr/bin/with-contenv bashio

export TUYA_BASE_URL=$(bashio::config 'tuya.base_url')
export TUYA_ACCESS_KEY=$(bashio::config 'tuya.access_key')
export TUYA_SECRET_KEY=$(bashio::config 'tuya.secret_key')

export TUYA_GATEWAY_ID=$(bashio::config 'device.ir_gateway_id')
export TUYA_DEVICE_ID=$(bashio::config 'device.ac_device_id')

export MQTT_SERVER_URL=$(bashio::services mqtt 'host')
export MQTT_USERNAME=$(bashio::services mqtt 'username')
export MQTT_PASSWORD=$(bashio::services mqtt 'password')

export MQTT_POWER_TOPIC=$(bashio::config 'mqtt_topics.power')
export MQTT_MODE_TOPIC=$(bashio::config 'mqtt_topics.mode')
export MQTT_FAN_TOPIC=$(bashio::config 'mqtt_topics.fan')
export MQTT_TEMPERATURE_TOPIC=$(bashio::config 'mqtt_topics.temperature')

npm start
