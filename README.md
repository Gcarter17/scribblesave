# Scribble Save

<!--    http://localhost:5000/scribblesave/us-central1    -->
  <!-- "proxy": "https://us-central1-scribblesave.cloudfunctions.net/" -->

> Full stack MERN (Mongodb, express.js, react, node) note/bookmark manager with React hooks, context & JWT authentication.

Built on top of Brad Traversy's project [here](https://github.com/bradtraversy/contact_keeper_api)

Hosted online at [Scribblesave.com](https://scribblesave.com)

## Features

- Embdedded rich text editor, and code editor for making 'Scribbles'
- Modern React App utilizing Context API
- Endless folder nesting within 'Scribbles'
- Oauth Google login / registration
- Json Web Tokens authentication for email and password signup
- User sessions

## Usage

Install dependencies

```
npm run install
npm run client-install
```

### Mongo connection setup

Edit your /config/default.json file to include the correct MongoDB URI

### Run Server

```bash
npm run dev     # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```
