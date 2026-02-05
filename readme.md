1st Command >>> npm init -y

> > > > > Note >> package.json file remove ("type": "commonjs")

+++++++++++++++++++++++++++
2nd Command >>> npm install express --save

+++++++++++++++++++++++++++
3rd Command >>> npm i -D typescript

+++++++++++++++++++++++++++
4th Command >>> npx tsc --init

> > > Note : tsconfig.json file setup info
> > > Comments out: ("rootDir": "./src", "outDir": "./dist",)
> > > Other Outputs : Comment must
> > > Recommended Options : Comment must ("verbatimModuleSyntax": true)

+++++++++++++++++++++++++
5th Step : src folder create inside (file create >> server.ts)

> > > Copy paste express basic code from express
> > > And Type i from express >> This command : npm i --save-dev @types/express

+++++++++++++++++++++++++
6th Step : Visit (https://nodejs.org/en/learn/typescript/introduction)

> > Run This Command : npm i -D tsx
> > "scripts" {"dev": "npx tsx watch ./src/server.ts"}

++++++++++++++++++++++++
7th Step : dotenv i : npm install dotenv
