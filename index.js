const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const MATCHES_FILE_PATH = path.join(__dirname, "./src/data/matches.csv");
const DELIVERIES_FILE_PATH = path.join(__dirname, "./src/data/deliveries.csv");
const OUTPUT_DIRECTORY = path.join(__dirname, './src/public/output/');

const matchesPlayedPerYear = require('./src/server/1-matches-per-year');
const matchesWonPerTeamPerYear = require('./src/server/2-matches-won-per-team-per-year');
const extraRunConcededByEachTeam = require('./src/server/3-extra-runs-conceded-per-team');
const topTenEconomicalBowlersByYear = require('./src/server/4-top-10-economical-bowlers-by-year');
const tossWinMatchWin = require('./src/server/5-won-toss-and-match-by-each-team');
const highestPlayerOfMatchesWinner = require('./src/server/6-highest-player-of-the-match-each-season');
const strikeRateOfBatsmanPerYear = require('./src/server/7-strike-rate-of-batsman-per-year');
const highestPlayerDismissed = require('./src/server/8-highest-player-dismissed');
const bestEconomicBowlerInSuperOver = require('./src/server/9-best-economy-bowler-in-super-over');

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {

          let totalMatchesPlayedPerYear = matchesPlayedPerYear(matches);
          try {
            totalMatchesPlayedPerYear = JSON.stringify(totalMatchesPlayedPerYear, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, '1-matches-per-year.json'), totalMatchesPlayedPerYear, (error) => {
            if (error) {
              console.error(error);
            }
          });

          let totalMatchesWonPerTeamPerYear = matchesWonPerTeamPerYear(matches);
          try {
            totalMatchesWonPerTeamPerYear = JSON.stringify(totalMatchesWonPerTeamPerYear, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, '2-matches-won-per-team-per-year.json'), totalMatchesWonPerTeamPerYear, (error) => {
            if (error) {
              console.error(error);
            }
          });

          const extraRunsYear = '2016';

          let extraRunsConcededPerTeam = extraRunConcededByEachTeam(matches, deliveries, extraRunsYear);
          try {
            extraRunsConcededPerTeam = JSON.stringify(extraRunsConcededPerTeam, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, `3-extra-runs-conceded-per-team-for-${extraRunsYear}.json`), extraRunsConcededPerTeam, (error) => {
            if (error) {
              console.error(error);
            }
          });

          const topTenEconomicBowlerYear = '2015';

          let topTenEconomicBowlers = topTenEconomicalBowlersByYear(matches, deliveries, topTenEconomicBowlerYear);
          try {
            topTenEconomicBowlers = JSON.stringify(topTenEconomicBowlers, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, `4-top-10-economical-bowlers-by-year-for-${topTenEconomicBowlerYear}.json`), topTenEconomicBowlers, (error) => {
            if (error) {
              console.error(error);
            }
          });

          let wonTossAndMatchByEachTeam = tossWinMatchWin(matches);
          try {
            wonTossAndMatchByEachTeam = JSON.stringify(wonTossAndMatchByEachTeam, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, '5-won-toss-and-match-by-each-team.json'), wonTossAndMatchByEachTeam, (error) => {
            if (error) {
              console.error(error);
            }
          });

          let playerOfTheMatchEachSeason = highestPlayerOfMatchesWinner(matches);
          try {
            playerOfTheMatchEachSeason = JSON.stringify(playerOfTheMatchEachSeason, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, '6-highest-player-of-the-match-each-season.json'), playerOfTheMatchEachSeason, (error) => {
            if (error) {
              console.error(error);
            }
          });

          let strikeRateOfEveryBatsmanPerYear = strikeRateOfBatsmanPerYear(matches, deliveries);
          try {
            strikeRateOfEveryBatsmanPerYear = JSON.stringify(strikeRateOfEveryBatsmanPerYear, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, '7-strike-rate-of-batsman-per-year.json'), strikeRateOfEveryBatsmanPerYear, (error) => {
            if (error) {
              console.error(error);
            }
          });

          let highestPlayerDismissedByAnotherPlayer = highestPlayerDismissed(deliveries);
          try {
            highestPlayerDismissedByAnotherPlayer = JSON.stringify(highestPlayerDismissedByAnotherPlayer, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, '8-highest-player-dismissed.json'), highestPlayerDismissedByAnotherPlayer, (error) => {
            if (error) {
              console.error(error);
            }
          });

          let topEconomicBowlerInSuperOver = bestEconomicBowlerInSuperOver(deliveries);
          try {
            topEconomicBowlerInSuperOver = JSON.stringify(topEconomicBowlerInSuperOver, null, 4);
          }
          catch (error) {
            console.error(error);
          }

          fs.writeFile(path.join(OUTPUT_DIRECTORY, '9-best-economy-bowler-in-super-over.json'), topEconomicBowlerInSuperOver, (error) => {
            if (error) {
              console.error(error);
            }
          });

        })
    })
}

main();
