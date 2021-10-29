# Home Assistant Add-on: OpenVPN

### How to use

Generate configuration:

* Install and start the addon
* It should print `Unconfigured` in logs
* Connect to Home Assistant via SSH
* Find the ID of `ha-openvpn` container:

```bash
  $ docker ps | grep ha-openvpn
```

* Start a shell to the container:

```bash
  $ docker exec -it 30fdfc9bd967 sh
```

* Run `configure.sh` and follow instructions
* Restart the addon

Generate a client certificate without a passphrase:

* Start s shell to the `ha-openvpn` container
* Generate a client certificate with `easyrsa`:

```bash
  $ export CLIENTNAME=some_client
  $ easyrsa build-client-full $CLIENTNAME nopass
```

* Get the generated client certificate:

```bash
  $ ovpn_getclient $CLIENTNAME > $CLIENTNAME.ovpn
```
