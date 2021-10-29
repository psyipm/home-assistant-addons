#!/bin/bash

echo "Configuring"
echo "Enter server DNS, without port (e.g. myserver.duckdns.org):"

read SERVER_NAME
echo "Generating config for '$SERVER_NAME'..."
ovpn_genconfig -u udp://$SERVER_NAME

echo "Running `init_pki`..."
ovpn_initpki

mv /etc/openvpn/pki $OPENVPN/pki

echo "Done. Please restart the addon and generate a client"
