const highestPlayerOfMatchesWinner = (matches) => {

    if (matches === undefined || !Array.isArray(matches)) {
        return {};
    }

    const playerOfMatchPerSeasonCount = matches.reduce((playerOfMatchPerSeasonCount, match) => {
        playerOfMatchPerSeasonCount[match.season] ?? (playerOfMatchPerSeasonCount[match.season] = {});
        playerOfMatchPerSeasonCount[match.season][match.player_of_match] ?? (playerOfMatchPerSeasonCount[match.season][match.player_of_match] = 0);
        playerOfMatchPerSeasonCount[match.season][match.player_of_match]++;
        return playerOfMatchPerSeasonCount;
    }, {});

    return Object.entries(playerOfMatchPerSeasonCount).reduce((highestPlayerEachSeason, [season, playerOfMatchWithCount]) => {
        highestPlayerEachSeason[season] ?? (highestPlayerEachSeason[season] = {});
        const counts = Object.values(playerOfMatchWithCount);
        const highestCount = Math.max(...counts);

        highestPlayerEachSeason[season] = Object.entries(playerOfMatchWithCount).filter(([playerOfMatch, count]) => {
            return count === highestCount;
        }).map(([player, count]) => {
            return { player: player, number_of_times: count };
        });
        return highestPlayerEachSeason;

    }, {});
}

module.exports = highestPlayerOfMatchesWinner;
