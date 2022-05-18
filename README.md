This is a realtime chat application bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[![build](https://github.com/jirsh/free-for-chat/actions/workflows/node.js.yml/badge.svg)](https://github.com/jirsh/free-for-chat/actions/workflows/node.js.yml)

## Preview

![preview_1](https://github.com/jirsh/free-for-chat/blob/main/preview_1.gif?raw=true)

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Secondly, modify the .env file:

```bash
cp .env.example .env
vi .env
```

and follow the instructions in there

Lastly, run the development server:

```bash
yarn dev
```

## Optional

If you have docker and compose installed you can run:

```bash
docker-compose up -d db # runs a local postgresql server which is preconfigured in the `.env.example` file
```

## Production

For production please configure the `.env` file accordingly and then run:

```bash
docker-compose -f docker-compose-prod.yml up -d
```

## Libraries

- [Socket.IO](https://socket.io/)
- [Prisma](https://www.prisma.io)
- [Tailwind CSS](https://tailwindcss.com/)

## Features

- Send messages
- Delete messages
- Command support
- Loading of x last messages(default 10)

## Commands

- `/clear` - clears messages without deleting from the database(refreshing loads them back)
- `/deleteall` - deletes and clears all messages from the database
- `/ping` - a system command that replies with pong
- `/random` - a system command that replies with a random number generated from a min and max

_to add more features/commands please make a pull request_
