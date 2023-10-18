export const fetchGame = async () => {
  const data = await fetch(
    `https://api.rawg.io/api/games?key=b07b64e7024442b9ba790a84e288e357&dates=2011-09-01,2019-09-30&platforms=18,1,7`
  );
  await data.json();
};
