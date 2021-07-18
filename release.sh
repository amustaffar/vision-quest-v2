#!/bin/sh

rm -rf dist && mkdir dist

$(aws ecr get-login --no-include-email --profile correlativ)
docker build -t 613828460267.dkr.ecr.eu-west-2.amazonaws.com/vision-quest/segmentation modules/server
docker push 613828460267.dkr.ecr.eu-west-2.amazonaws.com/vision-quest/segmentation

yarn workspace @vision-quest/app run build
yarn workspace @vision-quest/electron run tsc
mv modules/app/dist modules/electron/dist/app
yarn run electron-packager ./modules/electron "Vision Quest" --platform darwin --arch x64 --out dist
yarn run electron-packager ./modules/electron "Vision Quest" --platform darwin --arch arm64 --out dist
