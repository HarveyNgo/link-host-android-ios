// app/page.tsx
export default function Home() {
  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>B3Well Link Host</h1>
      <p>
        Use links like <code>https://YOUR-DOMAIN/r/&lt;token&gt;</code> to open
        the app if installed.
      </p>
      <ul style={{ marginTop: 16 }}>
        <li>
          <a href="/apple-app-site-association">/apple-app-site-association</a>
        </li>
        <li>
          <a href="/.well-known/assetlinks.json">
            /.well-known/assetlinks.json
          </a>
        </li>
      </ul>
    </main>
  );
}
