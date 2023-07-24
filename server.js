import { createServer } from "http"
import { readFile } from "fs/promises"
import escapeHTML from "escape-html"

createServer(async (req, res) => {
	const author = "Saurabh Srivastava"
	const postContent = await readFile("./posts/hello-world.txt")
	sendHTML(
		res,
		`<html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>
          ${escapeHTML(postContent)}
        </article>
        <footer>
          <hr>
          <p><i>(c) ${escapeHTML(author)}, ${new Date().getFullYear()}</i></p>
        </footer>
      </body>
    </html>`,
	)
}).listen(8080)

function sendHTML(res, jsx) {
	res.setHeader("Content-Type", "text/html")
	res.end(jsx)
}

// function renderJSXToHTML(jsx) {}
