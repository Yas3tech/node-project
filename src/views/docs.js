export const generateDocsHTML = () => {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentatie</title>
  <style>
    :root {
      --primary: #6366f1;
      --bg: #0f172a;
      --card-bg: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    h1 { color: #818cf8; margin-bottom: 2rem; }
    h2 { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; margin-top: 3rem; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      background: var(--card-bg);
      border-radius: 0.5rem;
      overflow: hidden;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    th { background: rgba(255,255,255,0.05); color: var(--primary); font-weight: 600; }
    code {
      background: #000;
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: monospace;
      color: #fb7185;
    }
    pre {
      background: #000;
      padding: 1.5rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      color: #d1d5db;
    }
    .back-btn {
      display: inline-block;
      margin-bottom: 2rem;
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 500;
    }
    .back-btn:hover { color: var(--text); }
  </style>
</head>
<body>
  <div class="container">
    <a href="/" class="back-btn">← Terug naar Home</a>
    
    <h1>REST API voor evenementen en organisatoren</h1>
    
    <p>Welkom bij de API documentatie. Gebruik de <a href="/test" style="color: var(--primary)">Playground</a> om de endpoints direct te testen.</p>

    <h2>Beschikbare Endpoints</h2>
    
    <h3>Evenementen</h3>
    <table>
      <tr><th>Methode</th><th>URL</th><th>Beschrijving</th></tr>
      <tr><td>GET</td><td><code>/api/events</code></td><td>Alle evenementen ophalen</td></tr>
      <tr><td>GET</td><td><code>/api/events/:id</code></td><td>Evenement details</td></tr>
      <tr><td>POST</td><td><code>/api/events</code></td><td>Evenement aanmaken</td></tr>
      <tr><td>PUT</td><td><code>/api/events/:id</code></td><td>Evenement bijwerken</td></tr>
      <tr><td>DELETE</td><td><code>/api/events/:id</code></td><td>Evenement verwijderen</td></tr>
    </table>

    <h3>Organisatoren</h3>
    <table>
      <tr><th>Methode</th><th>URL</th><th>Beschrijving</th></tr>
      <tr><td>GET</td><td><code>/api/organizers</code></td><td>Alle organisatoren ophalen</td></tr>
      <tr><td>GET</td><td><code>/api/organizers/:id</code></td><td>Organisator details</td></tr>
      <tr><td>POST</td><td><code>/api/organizers</code></td><td>Organisator aanmaken</td></tr>
      <tr><td>PUT</td><td><code>/api/organizers/:id</code></td><td>Organisator bijwerken</td></tr>
      <tr><td>DELETE</td><td><code>/api/organizers/:id</code></td><td>Organisator verwijderen</td></tr>
    </table>

    <h2>Paginering, Zoeken & Sorteren</h2>
    <ul>
      <li><code>?limit=10&offset=0</code> - Paginering</li>
      <li><code>?q=zoekterm</code> - Zoeken in meerdere velden</li>
      <li><code>?sortBy=createdAt&order=desc</code> - Sorteren</li>
    </ul>
    
    <h3>Voorbeelden</h3>
    <pre>GET /api/events?limit=5&offset=0&sortBy=startDate&order=asc
GET /api/events?q=conferentie
GET /api/organizers?q=jansen&sortBy=lastName&order=asc</pre>
  </div>
</body>
</html>
  `.trim();
};
