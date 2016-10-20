export default function renderIndex(html, css, assetMap, store, lang, messages) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pamper your Pooch</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css" />
    <style data-aphrodite>${css.content}</style>

  </head>
  <body>
    <div id="mount">${html}</div>
    <script>
      window.INITIAL_STATE = ${JSON.stringify(...store.getState(), { intl: { locale: lang, messages } })}
      window.RENDERED_CLASS_NAMES = ${JSON.stringify(css.renderedClassNames)}
    </script>
    <script src="/assets/${assetMap['bundle.js']}"></script>
  </body>
</html>
`
}
