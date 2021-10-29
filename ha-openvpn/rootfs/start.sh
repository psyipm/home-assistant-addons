#!/bin/bash

echo "Starting..."

if [ -f "$OPENVPN/ovpn_env.sh" ]
then
  ln -s $OPENVPN/pki /etc/openvpn/pki
  ovpn_run
else
  echo "Not configured"
  sleep 3600 # 1 hour
fi
