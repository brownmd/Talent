#!/usr/bin/env bash
# Run on Hetzner: bash /srv/talent/scripts/deploy.sh
set -euo pipefail

REPO=/srv/talent
STATIC_DIR=/srv/talent-static
APP_PORT=3000
RELEASE=$(date +%Y%m%d_%H%M%S)

echo "==> Pulling latest"
cd "$REPO"
git pull origin main

echo "==> Syncing static reports to $STATIC_DIR"
mkdir -p "$STATIC_DIR/reports"
cp -r "$REPO/public/reports/." "$STATIC_DIR/reports/"

echo "==> Building image talent-blog:$RELEASE"
docker build -t "talent-blog:$RELEASE" -t talent-blog:latest .

# Track previous tag for rollback
if [ -f "$REPO/.current_tag" ]; then
  cp "$REPO/.current_tag" "$REPO/.previous_tag"
fi
echo "$RELEASE" > "$REPO/.current_tag"

echo "==> Restarting container"
TALENT_TAG=$RELEASE docker compose up -d --force-recreate

echo "==> Health check"
for i in $(seq 1 12); do
  if curl -sf "http://localhost:$APP_PORT/" > /dev/null 2>&1; then
    echo "✓ App healthy"
    break
  fi
  [ "$i" -eq 12 ] && echo "✗ Health check failed after 60s" && exit 1
  sleep 5
done

echo "==> Smoke tests"
curl -sf "http://localhost:$APP_PORT/"               && echo "✓ / OK"
curl -sf "http://localhost:$APP_PORT/blog"           && echo "✓ /blog OK"
curl -sf "http://localhost:$APP_PORT/reports/kepler_map_1.html" > /dev/null \
  || curl -sf "http://localhost:80/reports/kepler_map_1.html" > /dev/null \
  && echo "✓ /reports OK"

echo "==> Done. Released talent-blog:$RELEASE"
