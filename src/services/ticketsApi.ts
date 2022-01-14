export const getTickets = async () => {
  const search = await fetch(`http://localhost:1234/search`);
  const searchResponse = await search.json();
  await fetch(
    `http://localhost:1234/tickets?searchId=${searchResponse?.searchId}`
  ).then((res) => res.json());
};
