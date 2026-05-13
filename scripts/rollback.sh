#!/usr/bin/env bash
# Run on Hetzner: bash /srv/talent/scripts/rollback.sh
set -euo pipefail

REPO=/srv/talent
PREV=$(cat "$REPO/.previous_tag" 2>/dev/null || echo "")

if [ -z "$PREV" ]; then
  echo "No previous release found — cannot roll back"
  exit 1
fi

echo "==> Rolling back to talent-blog:$PREV"
TALENT_TAG=$PREV docker compose -f "$REPO/docker-compose.yml" up -d --force-recreate
echo "✓ Rolled back to $PREV"
