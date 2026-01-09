export const generateTestHTML = () => {
    return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Test Playground</title>
    <style>
        :root {
            --primary: #6366f1;
            --bg: #0f172a;
            --card-bg: #1e293b;
            --text: #f8fafc;
            --text-muted: #94a3b8;
            --success: #22c55e;
            --error: #ef4444;
            --warning: #f59e0b;
        }
        * { box-sizing: border-box; }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            display: flex;
            height: 100vh;
        }
        /* Sidebar */
        .sidebar {
            width: 300px;
            background: var(--card-bg);
            border-right: 1px solid rgba(255,255,255,0.1);
            display: flex;
            flex-direction: column;
            padding: 1rem;
        }
        .sidebar h2 { font-size: 1.25rem; margin-top: 0; }
        .nav-section { margin-bottom: 2rem; }
        .nav-section h3 { 
            font-size: 0.75rem; 
            text-transform: uppercase; 
            letter-spacing: 0.05em; 
            color: var(--text-muted);
            margin-bottom: 0.5rem;
        }
        .nav-item {
            display: block;
            padding: 0.5rem 0.75rem;
            color: var(--text);
            text-decoration: none;
            border-radius: 0.375rem;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        .nav-item:hover { background: rgba(255,255,255,0.05); }
        .nav-item.active { background: var(--primary); }

        /* Main Content */
        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
            overflow-y: auto;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .back-link {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 0.9rem;
        }
        .back-link:hover { color: var(--text); }

        /* Test Controls */
        .control-panel {
            background: var(--card-bg);
            padding: 1.5rem;
            border-radius: 0.75rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .endpoint-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .method-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-weight: bold;
            font-size: 0.8rem;
        }
        .GET { background: #3b82f6; }
        .POST { background: #22c55e; }
        .PUT { background: #f59e0b; }
        .DELETE { background: #ef4444; }

        .form-group { margin-bottom: 1rem; }
        label { display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.25rem; }
        input, select, textarea {
            width: 100%;
            padding: 0.6rem;
            background: #0f172a;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 0.375rem;
            color: white;
            font-family: inherit;
        }
        .btn-run {
            background: var(--primary);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-weight: 600;
            transition: opacity 0.2s;
        }
        .btn-run:hover { opacity: 0.9; }

        /* Output */
        .output-panel {
            flex: 1;
            background: #000;
            border-radius: 0.75rem;
            padding: 1rem;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.85rem;
            overflow: auto;
            border: 1px solid rgba(255,255,255,0.1);
            position: relative;
        }
        .output-header {
            position: sticky;
            top: 0;
            background: #000;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #333;
            margin-bottom: 0.5rem;
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
        }
        pre { margin: 0; color: #d1d5db; }
        .status-ok { color: var(--success); }
        .status-error { color: var(--error); }
    </style>
</head>
<body>
    <div class="sidebar">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem;">
            <span style="font-size: 1.5rem;">🧪</span>
            <h2 style="margin: 0;">Playground</h2>
        </div>
        
        <div class="nav-section">
            <h3>Evenementen</h3>
            <div class="nav-item" onclick="setEndpoint('GET', '/api/events')">List All Events</div>
            <div class="nav-item" onclick="setEndpoint('GET', '/api/events/[ID]')">Get Event by ID</div>
            <div class="nav-item" onclick="setEndpoint('POST', '/api/events')">Create Event</div>
            <div class="nav-item" onclick="setEndpoint('PUT', '/api/events/[ID]')">Update Event</div>
            <div class="nav-item" onclick="setEndpoint('DELETE', '/api/events/[ID]')">Delete Event</div>
        </div>

        <div class="nav-section">
            <h3>Organisatoren</h3>
            <div class="nav-item" onclick="setEndpoint('GET', '/api/organizers')">List All Organizers</div>
            <div class="nav-item" onclick="setEndpoint('GET', '/api/organizers/[ID]')">Get Organizer by ID</div>
            <div class="nav-item" onclick="setEndpoint('POST', '/api/organizers')">Create Organizer</div>
            <div class="nav-item" onclick="setEndpoint('PUT', '/api/organizers/[ID]')">Update Organizer</div>
            <div class="nav-item" onclick="setEndpoint('DELETE', '/api/organizers/[ID]')">Delete Organizer</div>
        </div>

        <div style="margin-top: auto;">
            <a href="/" class="nav-item" style="text-align: center; border: 1px dashed var(--text-muted);">🏠 Home</a>
        </div>
    </div>

    <div class="main">
        <div class="header">
            <h1 id="action-title" style="margin: 0;">Selecteer een actie</h1>
            <a href="/docs" class="back-link">Bekijk Docs →</a>
        </div>

        <div class="control-panel">
            <div class="endpoint-info">
                <span id="method-badge" class="method-badge GET">GET</span>
                <span id="url-path" style="font-family: monospace; font-size: 1.1rem;">/api/events</span>
            </div>

            <div id="id-field" class="form-group" style="display: none;">
                <label>Resource ID</label>
                <input type="text" id="resource-id" placeholder="bijv. 1">
            </div>

            <div id="query-field" class="form-group">
                <label>Query Parameters (bijv. limit=5&offset=0)</label>
                <input type="text" id="query-params" placeholder="q=zoekterm&sortBy=name">
            </div>

            <div id="body-field" class="form-group" style="display: none;">
                <label>JSON Body</label>
                <textarea id="request-body" rows="8" placeholder='{ "name": "Nieuw Event" }'></textarea>
            </div>

            <button class="btn-run" onclick="runRequest()">Voer uit</button>
        </div>

        <div class="output-panel">
            <div class="output-header">
                <span>Response</span>
                <span id="status-code"></span>
            </div>
            <pre id="output-text">// Het resultaat verschijnt hier...</pre>
        </div>
    </div>

    <script>
        let currentMethod = 'GET';
        let currentPath = '/api/events';

        function setEndpoint(method, path) {
            currentMethod = method;
            currentPath = path;

            document.getElementById('action-title').innerText = \`\${method} \${path}\`;
            const badge = document.getElementById('method-badge');
            badge.innerText = method;
            badge.className = 'method-badge ' + method;
            document.getElementById('url-path').innerText = path;

            // Toggle fields
            document.getElementById('id-field').style.display = path.includes('[ID]') ? 'block' : 'none';
            document.getElementById('body-field').style.display = (method === 'POST' || method === 'PUT') ? 'block' : 'none';
            document.getElementById('query-field').style.display = (method === 'GET' && !path.includes('[ID]')) ? 'block' : 'none';

            // Set default bodies
            if (method === 'POST' || method === 'PUT') {
                const isEvent = path.includes('events');
                const defaultBody = isEvent 
                    ? { title: "Test Event", description: "Mooi feestje", location: "Antwerpen", startDate: "2026-06-01", endDate: "2026-06-02", organizerId: 1 }
                    : { firstName: "Jan", lastName: "De Man", email: "jan@example.be" };
                document.getElementById('request-body').value = JSON.stringify(defaultBody, null, 2);
            }
        }

        async function runRequest() {
            const output = document.getElementById('output-text');
            const statusBadge = document.getElementById('status-code');
            output.innerText = 'Laden...';
            statusBadge.innerText = '';

            let url = currentPath;
            if (url.includes('[ID]')) {
                const id = document.getElementById('resource-id').value;
                if (!id) {
                    output.innerText = 'FOUT: Je moet een ID opgeven.';
                    return;
                }
                url = url.replace('[ID]', id);
            }

            const query = document.getElementById('query-params').value;
            if (query && currentMethod === 'GET' && !url.includes(id)) {
                url += '?' + query;
            }

            const options = {
                method: currentMethod,
                headers: { 'Content-Type': 'application/json' }
            };

            if (currentMethod === 'POST' || currentMethod === 'PUT') {
                try {
                    options.body = document.getElementById('request-body').value;
                    JSON.parse(options.body); // Validate JSON
                } catch (e) {
                    output.innerText = 'FOUT: Ongeldige JSON body.';
                    return;
                }
            }

            try {
                const response = await fetch(url, options);
                const status = response.status;
                const statusText = response.statusText;
                statusBadge.innerText = \`Status: \${status} \${statusText}\`;
                statusBadge.className = status < 400 ? 'status-ok' : 'status-error';

                const text = await response.text();
                if (!text) {
                    output.innerText = status < 400 ? '// Succesvol uitgevoerd (geen inhoud)' : '// Fout (geen details beschikbaar)';
                    return;
                }

                try {
                    const data = JSON.parse(text);
                    output.innerText = JSON.stringify(data, null, 2);
                } catch (e) {
                    output.innerText = text;
                }
            } catch (err) {
                output.innerText = 'Netwerkfout: ' + err.message;
                statusBadge.innerText = 'Error';
                statusBadge.className = 'status-error';
            }
        }
        
        // Initialize with first endpoint
        setEndpoint('GET', '/api/events');
    </script>
</body>
</html>
  `.trim();
};
