const fs = require('fs');
const fetch = require('node-fetch');

async function updateStats() {
    const username = 'raufA1'; // Your GitHub username
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        console.error('GITHUB_TOKEN is not set. Please set it as a secret in your repository settings.');
        return;
    }

    try {
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: { 'Authorization': `token ${token}` }
        });
        const repos = await repoResponse.json();

        let totalStars = 0;
        if (Array.isArray(repos)) {
            repos.forEach(repo => {
                totalStars += repo.stargazers_count;
            });
        }

        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public`, {
            headers: { 'Authorization': `token ${token}` }
        });
        const events = await eventsResponse.json();
        const contributions = Array.isArray(events) ? events.filter(e => e.type === 'PushEvent').length : 0;

        const stats = {
            totalStars,
            contributions,
            lastUpdated: new Date().toISOString()
        };

        // Ensure the data directory exists
        if (!fs.existsSync('data')) {
            fs.mkdirSync('data');
        }

        fs.writeFileSync('data/achievements.json', JSON.stringify(stats, null, 2));
        console.log('Successfully updated stats and wrote to data/achievements.json');

    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

updateStats();
