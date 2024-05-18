const extraRunConcededByEachTeamByYear = (matches, deliveries, year) => {

    if (matches === undefined || deliveries === undefined || year == undefined || !Array.isArray(matches) || !Array.isArray(deliveries)) {
           return {};
    }

    const selectedYearMatchIds = matches.reduce((matchIds, match) => {
           if (match.season === year) {
                  return matchIds.concat(match.id);
           }

           return matchIds;
    }, []);

    const extraRunsConcededByEachTeam = deliveries.reduce((teamwiseExtraRunsConceded, delivery) => {
           if (selectedYearMatchIds.includes(delivery.match_id)) {
                  teamwiseExtraRunsConceded[delivery.bowling_team] ?? (teamwiseExtraRunsConceded[delivery.bowling_team] = 0);
                  teamwiseExtraRunsConceded[delivery.bowling_team] += parseInt(delivery.extra_runs);
           }

           return teamwiseExtraRunsConceded;
    }, {});

    return extraRunsConcededByEachTeam;
}

module.exports = extraRunConcededByEachTeamByYear;
