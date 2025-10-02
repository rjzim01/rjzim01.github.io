const fs = require("fs");
const fetch = require("node-fetch");

const token = process.env.GH_TOKEN; // from GitHub secrets
const username = "YOUR_USERNAME"; // change this

async function fetchLanguages() {
  let repos = [];
  let page = 2;

  // Fetch all repos (public + private)
  while (true) {
    const res = await fetch(
      `https://api.github.com/user/repos?per_page=100&page=${page}`,
      { headers: { Authorization: `token ${token}` } }
    );
    const data = await res.json();
    if (data.length === 0) break;
    repos = repos.concat(data);
    page++;
  }

  let languageTotals = {};

  // Fetch languages for each repo
  for (let repo of repos) {
    const res = await fetch(repo.languages_url, {
      headers: { Authorization: `token ${token}` },
    });
    const langData = await res.json();

    for (let [lang, bytes] of Object.entries(langData)) {
      languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
    }
  }

  // Normalize to percentages
  const total = Object.values(languageTotals).reduce((a, b) => a + b, 0);
  const percentages = Object.entries(languageTotals).map(([lang, bytes]) => ({
    name: lang,
    percent: ((bytes / total) * 100).toFixed(1),
  }));

  // Save JSON
  fs.writeFileSync("data/languages.json", JSON.stringify(percentages, null, 2));
  console.log("✅ Saved to data/languages.json");
}

fetchLanguages();
