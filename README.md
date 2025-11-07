# [www.elliotjreed.com](https://www.elliotjreed.com)

This website now uses React Router, having previously been React + Webpack. I've removed the blog because I rarely updated it. I'll add some useful things on here at some point!

Built using [React Router](https://reactrouter.com/).

## Getting Started

### Installation

Install the dependencies:

```bash
bun install
```

### Development

Start the development server with HMR:

```bash
bun run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
bun run build
```

## Deployment

Deployment is done using the Wrangler CLI.

To build and deploy directly to production:

```sh
bun run deploy
```

To deploy a preview URL:

```sh
bunx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
bunx wrangler versions deploy
```

## Styling

[Tailwind CSS](https://tailwindcss.com/) is configured.
