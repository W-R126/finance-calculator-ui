#!/usr/bin/env sh
set -eu

echo "$(envsubst '${API_BASE_PATH}' < /etc/nginx/conf.d/default.conf)" > /etc/nginx/conf.d/default.conf

exec "$@"