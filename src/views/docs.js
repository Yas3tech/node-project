export const generateDocsHTML = () => {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentatie</title>
</head>
<body>
  <h1>REST API voor het beheren van evenementen en organisatoren.</h1>
  
  <h2>Beschikbare Endpoints</h2>
  
  <h3>Evenementen</h3>
  <table border="1">
    <tr><th>Methode</th><th>URL</th><th>Beschrijving</th></tr>
    <tr><td>GET</td><td>/api/events</td><td>Alle evenementen ophalen</td></tr>
    <tr><td>GET</td><td>/api/events/:id</td><td>Evenement details</td></tr>
    <tr><td>POST</td><td>/api/events</td><td>Evenement aanmaken</td></tr>
    <tr><td>PUT</td><td>/api/events/:id</td><td>Evenement bijwerken</td></tr>
    <tr><td>DELETE</td><td>/api/events/:id</td><td>Evenement verwijderen</td></tr>
  </table>

  <h3>Organisatoren</h3>
  <table border="1">
    <tr><th>Methode</th><th>URL</th><th>Beschrijving</th></tr>
    <tr><td>GET</td><td>/api/organizers</td><td>Alle organisatoren ophalen</td></tr>
    <tr><td>GET</td><td>/api/organizers/:id</td><td>Organisator details</td></tr>
    <tr><td>POST</td><td>/api/organizers</td><td>Organisator aanmaken</td></tr>
    <tr><td>PUT</td><td>/api/organizers/:id</td><td>Organisator bijwerken</td></tr>
    <tr><td>DELETE</td><td>/api/organizers/:id</td><td>Organisator verwijderen</td></tr>
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
</body>
</html>
  `.trim();
};
