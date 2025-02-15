# 💻Development frameworks used in this project

We're using the following frameworks:

- [Gatsby](#gatsby) - for the UI
- [Contentful](#contentful) - headless CMS for the content on some pages
- [What3Words](https://www.npmjs.com/package/@what3words/react-components) - for locations in the woods
  - note: we're not using the what3words api for auto-suggest/anything else, just for the component to show the locations using the w3w branding eg `///loves.final.needed`
- [Prettier](https://prettier.io/) - formatting code in uniform way

## Gatsby

I generated this site using this gatsby starter. I've since swapped the markdown logic with Contentfull Headless CMS:
`gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog`

### 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

### 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 📃Contentful

[Contentful](https://www.contentful.com/) is a headless CMS. This means that text, images and files can be added to contentful, and surfaced in the friends of foxley website.

These areas of the site are populated with Contentful content:

- https://friendsoffoxley.co.uk/work-days & individual work day articles
- https://friendsoffoxley.co.uk/news & individual news articles
- https://friendsoffoxley.co.uk/resources

I haven't used contentful for everything, since a lot of the content on the website won't change often.

### How do I get the contentful content?

Retrieve the content via graphQL.

    Assets = Images, and files
    Entries = News articles, work days, resources page

[space_url]: https://app.contentful.com/spaces/jnd8s5ezvg4b/home
[models_url]: https://app.contentful.com/spaces/jnd8s5ezvg4b/content_types
[content_url]: https://app.contentful.com/spaces/jnd8s5ezvg4b/entries?id=fVjOlOJpy2qBIBwI&order.fieldId=updatedAt&order.direction=descending&displayedFieldIds=contentType&displayedFieldIds=updatedAt&displayedFieldIds=author&displayedFieldIds=metadata.tags&folderId=kzIgaBG3PX73JJiG&page=1
[media_url]: https://app.contentful.com/spaces/jnd8s5ezvg4b/assets?id=Gkg6oxD7w37zhXZ4

| Area                    | Purpose                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [Space home][space_url] | Home page for FOF Contentful project                                                                                                |
| [Models][models_url]    | Models describe the schema for the content. You can define types, validation and control type (dropdown/radiobutton etc)            |
| [Content][content_url]  | Content: work days, news, or other text content (you can link Media such as images in the content as well). Also known as "Entries" |
| [Media][media_url]      | Files: Images, PDFs. Also known as "Assets".                                                                                        |

More info:

- <https://www.contentful.com/help/contentful-101/>
- <https://www.contentful.com/developers/docs/concepts/apis/>
- <https://www.contentful.com/developers/docs/references/content-delivery-api/>
- <https://www.gatsbyjs.com/plugins/gatsby-source-contentful/>
