export default eventHandler(async (event) => {
    const name = event.headers.get("Hx-Prompt");

    console.log(JSON.stringify({name, event}))

    return `Hi <strong> ${name}</strong>`
  })
  