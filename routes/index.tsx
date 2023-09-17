import { useTurso } from "../utils/turso";

import { defineEventHandler } from "h3";
import { h, renderSSR, Helmet } from "nano-jsx";

export default eventHandler(async () => {
  const db = useTurso();

  const accounts = await db.execute("Select * from users");

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
  
      <ul>
      {
        accounts.rows.map((user: any) => <li>{user.full_name}</li>)
      }
      </ul>
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

  return html;
})
