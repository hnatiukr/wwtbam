# Who wants to be a millionaire?

Test your knowledge at free online game based on the famous TV quiz show, give the correct answers and win some amazing artificial money!

You can play in **normal mode** and in **hints mode**. Hints mode explicitly marks correct and incorrect answer options. It useful for debugging or if you just need to complete the game quickly.

- normal mode: [#add_vercel_url_after_deployment](#add_vercel_url_after_deployment)
- hints mode: [#add_vercel_url_after_deployment/?hints=true](#add_vercel_url_after_deployment/?hints=true)

...or manually add the corresponding query parameter to the URL which restarts the game with enabled hints mode: `/?hints=true`.

## Technical requirements

- [x] use this [markup](https://www.figma.com/file/tIZEZn2HTAeSDQRzoOzvXE/Front-end-test%2C-Headway) for layout
- [x] adaptive layout
- [x] without using CSS frameworks
- [x] the game config must be in JSON format
- [x] the config should be extensible: more or less options; several correct answers, etc
- [x] publish to github with md-instructions
- [x] use Next.js and deploy it to Vercel
- [x] standardise the source code using formatting and liner notes
- [x] type-safe code using TypeScrip
- [x] pre-commit with checks and pre-push with tests

## Prerequesits

- Node.js >= v22.14.0 (LTS)

If you are using an automatic version manager, the required version will be applied from the `.node_version` file or `package.json > engines > node`.

## Development

To install the project with a clean slate:

```sh
npm ci
```

To start local development web server:

```sh
npm run dev
```

Then, visit [http://localhost:3000](http://localhost:3000).
Or with enabled hint mode [http://localhost:3000/?hints=true](http://localhost:3000/?hints=true).

## Code checking

To run file formatter:

```sh
npm run fmt
```

To run linter checks:

```sh
npm run lint
```

## Testing

To run all tests:

```sh
npm test
```

Run all test suites but watch for changes and rerun tests when they change:

```sh
npm run test:watch
```

## Building

This will run a clean build process without additional checks, such as formatting or linting:

```sh
npm run build
```

On CI, the following command performs these pipeline of steps:

1. Applies formatting (see: `npm run fmt`).
2. Runs linter (see: `npm run lint`).
3. Runs tests (see: `npm test`).
4. Builds the source (see: `npm run build`).

```sh
npm run ci
```

## Structure

The `/src` directory contains a structure such that subdirectories are distributed according to their functional purpose:

- `/app`: keep this dir as clean as possible according to the app route paths to avoid polluting and easily distinguish parsing system files from custom one
- `/db`: contains JSON DB and accomplished with the schema types and validators. See [Database](#database) for more details
- `/lib`: subroutines used at the application abstraction level
- `/screens`: there are main view screens and their inner components are stored here
- `/store`: a global store, state management that supplimented with selectors
- `/theme`: base and custom tokens, CSS files that represent the whole layout

## Data

The permanent data is stored in JSON format in the corresponding file: [problems.json](./src/db/problems.json).

**Schema**

```ts
Array<{
  query: string;
  options: string[];
  keys: string[];
}>;
```

**Explanation**

Take a look at the next example of data structure:

```json
[
  {
    "question": "What colour is included in the RGB spectrum?"
    "options": ["Yellow", "Red", "Green", "White", "Blue"],
    "keys": [1, 2, 4]
  },

  ...
]
```

- you can see an array of objects, which represents a list of solving problem for the game
- each object contains only 3 necessary properties: `qestions`, `options`, `keys`
- you may notice that there are more that **4** `options` are provided. Yes, you may put as much as needed options but not less that **2**
- the `keys` prop represents the _indecies of the correct options_ from the corresponding field ^. Again, it allows you put as much as needed correct answer options, not strictly **1**
- no need to specify the order. the array by itself represents the order
- no need to specify a winning prize/score/money for each solving problem, it calculates automatically
- mainly, you are free to put any number of solving problems, not specifically **12** by default. The winning amount of money and other game's underhood calculations will be automatically computed depending on the number of provided problems

**Minimal requirements**

- you are not limited to provide exactly **12** quiz problems but at least **1**;
- you are not limited to provide exactly **4** possible answer's options but at least **2**;
- you are not limited to provide exactly **1** correct answer (key) but at least **1** and not more than **number of options**.

**Validation**

In order to meet these requirements, the validation described in file [schemas.ts](./src/db/schemas.ts) is applied to the json data. It helps to detect even such corner cases as if you try to put key indecies that don't match the options array.
For more details, see [Zod](https://zod.dev/) validation library.
