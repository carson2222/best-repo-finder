const { Octokit } = require("@octokit/core");

async function findBestRepoBetweenDates(dateStart, dateEnd) {
  const octokit = new Octokit({
    auth: "YOUR-AUTH-KEY",
  });

  const date = new Date().toISOString().slice(0, 10);
  const query = `created:>${dateStart} created:<${dateEnd}`;
  const sort = "stars";
  const order = "desc";
  const perPage = 10;

  const { data } = await octokit.request("GET /search/repositories", {
    q: query,
    sort: sort,
    order: order,
    per_page: perPage,
  });
  console.log(`Top ${data.items.length} stared Github repos between ${dateStart} - ${dateEnd}`);
  data.items.forEach((el) => {
    console.log(`${el.name} made by: ${el.owner.login} - ${el.stargazers_count}⭐`);
  });
}
findBestRepoBetweenDates("2024-01-20", "2024-01-23");
