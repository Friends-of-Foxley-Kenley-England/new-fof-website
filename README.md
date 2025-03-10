<p align="center">
  <a href="https://www.friendsoffoxley.co.uk/" target="_blank" rel="noopener noreferrer">
    <img alt="Friends of foxley logo" src="src\images\logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  Friends of Foxley website 
</h1>

[![TODOs](https://img.shields.io/endpoint?url=https://todos.tickgit.com/badge?repo=github.com/Friends-of-Foxley-Kenley-England/new-fof-website)](https://todos.tickgit.com/browse?repo=github.com/Friends-of-Foxley-Kenley-England/new-fof-website)

For user-friendly guides on how to manage workdays etc, go to the wiki: <https://github.com/Friends-of-Foxley-Kenley-England/new-fof-website/wiki>

## 🚀 Quick start

1.  Initial setup

    - Copy the `.env` file `cp .env.example .env`
    - Set the missing config values in the`.env` file. 
      - Login to contentful and view the contentful api key values
      - You'lll find the space ID for the project on logging in
    - Run the following:
    ```shell
    corepack enable
    yarn install
    yarn start
    ```

    See [Yarn installation docs for more info](https://yarnpkg.com/getting-started/install)

1.  Open the source code and start editing!

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

## More docs:

[Frameworks used in the project](./docs/development-frameworks.md)  
[Deployment and hosting](./docs/deployment.md)  
[Adding contentful content](./docs/adding-contentful-content.md)  
[SSR](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-server-side-rendering/)
