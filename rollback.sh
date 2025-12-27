#!/bin/bash
# rollback.sh for Frontend
# Usage: ./rollback.sh /path/to/deploy

DEPLOY_PATH=$1

if [ -z "$DEPLOY_PATH" ]; then
  DEPLOY_PATH="/home/ubuntu/website/releases/frontend"
fi

echo "🔄 Rolling back Frontend to previous version..."

cd "$DEPLOY_PATH/versions" || exit 1

# Tìm file version cũ nhất thứ 2 (The previous version)
PREV_TAR=$(ls -1t *.tar.gz | sed -n '2p')

if [ -z "$PREV_TAR" ]; then
    echo "❌ No previous version found to rollback!"
    exit 1
fi

echo "🔙 Reverting to: $PREV_TAR"

# Quay về thư mục deploy
cd "$DEPLOY_PATH" || exit 1

# 1. Update Symlink trỏ về file cũ
rm -f app-source.tar.gz
ln -s "versions/$PREV_TAR" app-source.tar.gz

# 2. Quan trọng: GIẢI NÉN file cũ ra để đè lên code lỗi hiện tại
echo "📦 Extracting code..."
tar -xzf app-source.tar.gz

# 3. Restart Docker
echo "🚀 Restarting Docker..."
docker compose down
docker compose up -d --build --force-recreate frontend

echo "✅ Rollback completed to $PREV_TAR"