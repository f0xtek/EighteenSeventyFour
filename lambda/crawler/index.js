const axios = require('axios').default;

const getFixturesResultsData = async url => {
  return await axios.get(url)
    .then(resp => resp.data);
};

const seasonYearsBuilder = () => {
  const date = new Date();
  const year = date.getFullYear();
  const seasonStartYear = year.toString();
  const seasonEndYearShort = (year + 1).toString().slice(-2);
  return `${seasonStartYear}-${seasonEndYearShort}`
}

const resultsFixturesUrlBuilder = () => {
  const eighteenSeventyFourHome = process.env.EIGHTEENSEVENTYFOUR_HOMEPAGE || 'https://1874northwich.com'
  const seasonYears = seasonYearsBuilder();
  return `${eighteenSeventyFourHome}/${seasonYears}-fixtures-results`;
}

exports.handler = async (event) => {
  const resultsFixturesUrl = resultsFixturesUrlBuilder();
  const resultsFixturesData = await getFixturesResultsData(resultsFixturesUrl);
  return {
    statusCode: 200,
    body: JSON.stringify(resultsFixturesData, null, 2),
  };
};