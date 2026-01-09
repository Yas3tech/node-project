import { initDB, getDB, saveDB } from './db.js';

const seed = async () => {
    console.log('Seeden van de database...');
    const db = await initDB();

    // 1. Verwijder bestaande data
    db.run('DELETE FROM events');
    db.run('DELETE FROM organizers');
    db.run('DELETE FROM sqlite_sequence WHERE name="events" OR name="organizers"');

    // 2. Voeg Organisatoren toe
    console.log('Organisatoren toevoegen...');
    const organizers = [
        ['Jan', 'De Man', 'jan@example.be', '+32 470 12 34 56', 'Tech Events Corp'],
        ['An', 'De Pan', 'an@example.be', '+32 470 98 76 54', 'Party Planning SA'],
        ['Bert', 'De Hert', 'bert@example.be', null, 'Zevenhoven Events']
    ];

    organizers.forEach(org => {
        db.run(
            'INSERT INTO organizers (firstName, lastName, email, phone, company) VALUES (?, ?, ?, ?, ?)',
            org
        );
    });

    // 3. Voeg Evenementen toe
    console.log('Evenementen toevoegen...');
    const now = new Date();
    const futureDate = (days) => {
        const d = new Date();
        d.setDate(d.getDate() + days);
        return d.toISOString();
    };

    const events = [
        ['Startup Weekend', 'Zwoegen en zweten voor een nieuw bedrijf.', 'Antwerpen', futureDate(10), futureDate(12), 50, 1],
        ['Groot Feest', 'Einfach party machen.', 'Brussel', futureDate(20), futureDate(21), 200, 2],
        ['Tech Conferentie', 'Praten over AI enzo.', 'Gent', futureDate(5), futureDate(6), 100, 1],
        ['Workshop Bloemschikken', 'Heel zen worden.', 'Hasselt', futureDate(30), futureDate(31), 20, 3]
    ];

    events.forEach(event => {
        db.run(
            'INSERT INTO events (title, description, location, startDate, endDate, capacity, organizerId) VALUES (?, ?, ?, ?, ?, ?, ?)',
            event
        );
    });

    saveDB();
    console.log('✅ Database succesvol geseed met 3 organisatoren en 4 evenementen!');
};

seed().catch(err => {
    console.error('❌ Fout bij seeden:', err);
});
