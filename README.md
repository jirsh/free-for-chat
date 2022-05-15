This is a realtime chat application bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Preview

![preview_1](https://github.com/jirsh/free-for-chat/blob/main/preview_1.gif?raw=true)

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Secondly, modify the .env file

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
docker-compose up -d db
```

to run a local postgresql server which comes preconfigured in the `.env.example` file

## Production

For production please configure the .env file accordingly and then run:

```bash
docker-compose -f docker-compose-prod.yml up -d
```
