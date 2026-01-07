# Events & Organisatoren API

REST API met Node.js, Express en SQLite voor het beheren van evenementen en organisatoren.

## Setup

```bash
npm install
```

## Starten

```bash
npm run dev

npm start
```

Server draait op: http://localhost:3000

## Endpoints

### Organisatoren

| Methode | URL | Beschrijving |
|---------|-----|--------------|
| GET | /api/organizers | Alle organisatoren |
| GET | /api/organizers/:id | Organisator details |
| POST | /api/organizers | Nieuwe organisator |
| PUT | /api/organizers/:id | Organisator bijwerken |
| DELETE | /api/organizers/:id | Organisator verwijderen |

### Evenementen

| Methode | URL | Beschrijving |
|---------|-----|--------------|
| GET | /api/events | Alle evenementen |
| GET | /api/events/:id | Evenement details |
| POST | /api/events | Nieuw evenement |
| PUT | /api/events/:id | Evenement bijwerken |
| DELETE | /api/events/:id | Evenement verwijderen |

## Query Parameters

```
?limit=10         Aantal resultaten per pagina
?offset=0         Start positie
?q=zoekterm       Zoeken in meerdere velden
?sortBy=title     Sorteren op veld
?order=asc        Sorteer volgorde (asc/desc)
```

## Voorbeelden

```bash
# Organisator aanmaken
curl -X POST http://localhost:3000/api/organizers \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jan","lastName":"Jansen","email":"jan@example.com"}'

# Evenement aanmaken
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Conferentie","location":"Brussel","startDate":"2026-02-01","endDate":"2026-02-02"}'

# Zoeken met paginering
curl "http://localhost:3000/api/events?q=conferentie&limit=5&offset=0"

# Sorteren
curl "http://localhost:3000/api/organizers?sortBy=lastName&order=asc"
```

## Validatie

- Verplichte velden mogen niet leeg zijn
- `firstName` mag geen cijfers bevatten
- `endDate` moet na `startDate` vallen
- `capacity` moet een positief nummer zijn

## Technische Keuzes

- **SQLite met sql.js**: Geen externe database nodig, data wordt lokaal opgeslagen
- **Joi**: Schema-gebaseerde validatie met duidelijke foutmeldingen
- **ES Modules**: Moderne JavaScript syntax met import/export
- **Morgan**: HTTP request logging naar console en bestand

## Bronnen

- [Express.js Documentation](https://expressjs.com/)
- [Joi Validation](https://joi.dev/api/)
- [sql.js Documentation](https://sql.js.org/)
