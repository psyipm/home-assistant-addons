FROM kylemanna/openvpn:latest

ENV LANG C.UTF-8

COPY rootfs /

ENV OPENVPN=/data/openvpn

EXPOSE 1194/udp

CMD ["/start.sh"]

LABEL io.hass.version="VERSION" io.hass.type="addon" io.hass.arch="amd64"
