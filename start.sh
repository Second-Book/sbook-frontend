#!/bin/bash

export $(cat /opt/sbook/textbook-marketplace-frontend/.env.production | xargs)

/home/sbook/.local/share/pnpm/pnpm run start
