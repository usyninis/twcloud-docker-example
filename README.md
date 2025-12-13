поиск тегов в докерхабе:

curl -s "https://registry.hub.docker.com/v2/repositories/alfabankui/arui-scripts/tags/?page_size=100" | jq '.results[] | select(.name | contains("slim")) | .name'

_____

собрать локально:
docker build --platform=linux/amd64 -t simple-app:0.1.0 .

docker run --env-file ./.env -e DB_HOST=host.docker.internal -p 4001:4000 simple-app:0.1.0