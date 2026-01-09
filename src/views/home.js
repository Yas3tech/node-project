export const generateHomeHTML = () => {
    return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event API - Home</title>
    <style>
        :root {
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --bg: #0f172a;
            --card-bg: #1e293b;
            --text: #f8fafc;
            --text-muted: #94a3b8;
        }
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
        }
        .container {
            text-align: center;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
            animation: fadeIn 0.8s ease-out;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #818cf8, #c084fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p {
            color: var(--text-muted);
            font-size: 1.2rem;
            margin-bottom: 3rem;
        }
        .btn-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }
        .btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2.5rem 1.5rem;
            background: var(--card-bg);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 1rem;
            text-decoration: none;
            color: var(--text);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .btn:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
        }
        .btn span.icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .btn span.title {
            font-weight: 600;
            font-size: 1.1rem;
        }
        .btn span.desc {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 0.5rem;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Event API Manager</h1>
        <p>Beheer je evenementen en organisatoren op één plek.</p>
        
        <div class="btn-group">
            <a href="/test" class="btn">
                <span class="icon">🧪</span>
                <span class="title">Test API</span>
                <span class="desc">Interactieve playground</span>
            </a>
            <a href="/docs" class="btn">
                <span class="icon">📚</span>
                <span class="title">Documentatie</span>
                <span class="desc">Endpoints & Voorbeelden</span>
            </a>
        </div>
    </div>
</body>
</html>
  `.trim();
};
