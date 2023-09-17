import { defineEventHandler } from "h3";
import { h, renderSSR, Helmet } from "nano-jsx";

const App = () => (
  <div>
    <Helmet>
      <html lang="en" amp />
      <title>Nano JSX SSR</title>
      <meta name="description" content="Server Side Rendered Nano JSX Application" />
      <script src="/htmx.min.js"></script>
    </Helmet>

    <Helmet footer>
      <script src="/scripts.js"></script>
    </Helmet>

    <section>
      <h1>Index page</h1>
      <br />
      <div id="response"></div>
      <br />
      <button
        class="p-2 mt-16 outline-1 outline-red-400 text-red-600 text-xs"
        hx-post="/new"
        hx-prompt="Provide delete id"
        hx-confirm="Are you sure?"
        hx-target="#response"
      >
        Feed me some data
      </button>
    </section>
  </div>
)

const app = renderSSR(<App />)
const { body, head, footer, attributes } = Helmet.SSR(app)

const html = `
<!DOCTYPE html>
<html ${attributes.html.toString()}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${head.join('\n')}
  </head>
  <body ${attributes.body.toString()}>
    ${body}
    ${footer.join('\n')}
  </body>
</html>`

export default defineEventHandler(() => {
  return html;
});
