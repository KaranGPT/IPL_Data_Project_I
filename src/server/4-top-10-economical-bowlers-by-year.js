const topTenEconomicalBowlersByYear = (matches, deliveries, year) => {

    if (matches === undefined || deliveries === undefined || year == undefined || !Array.isArray(matches) || !Array.isArray(deliveries)) {
        return {};
    }

    const matchIdsByYear = matches.reduce((matchIds, match) => {
        if (match.season === year) {
            return matchIds.concat(match.id);
        }
        return matchIds;
    }, []);

    const playersEconomicRate = deliveries.reduce((economicRates, delivery) => {
        if (matchIdsByYear.includes(delivery.match_id)) {
            economicRates[delivery.bowler] ?? (economicRates[delivery.bowler] = { 'conceded_runs': 0, 'total_balls': 0 });

            let runsToAdd;

            if (delivery.wide_runs != 0 || delivery.noball_runs != 0) {
                runsToAdd = +delivery.total_runs - delivery.penalty_runs;
            } else {
                runsToAdd = +delivery.total_runs - (+delivery.bye_runs + +delivery.legbye_runs + +delivery.penalty_runs);
                economicRates[delivery.bowler]['total_balls']++;
            }
            economicRates[delivery.bowler]['conceded_runs'] += runsToAdd;

            const { conceded_runs, total_balls } = { ...economicRates[delivery.bowler] };
            const economy = (conceded_runs / (total_balls / 6)).toFixed(2);
            economicRates[delivery.bowler]['economy'] = Number(economy);
        }
        return economicRates;

    }, []);

    const playerSortedByEconomicRate = Object.entries(playersEconomicRate).sort(([playerA, { economy: playerAEconomy }], [playerB, { economy: playerBEconomy }]) => {
        return playerAEconomy > playerBEconomy ? 1 : -1;
    });

    let topTenEconomicalBowlers = playerSortedByEconomicRate.slice(0, 10);

    topTenEconomicalBowlers = topTenEconomicalBowlers.reduce((result, bowler, index) => {
        const [bowlerName, { conceded_runs, total_balls, economy }] = bowler;
        return [...result, { position: index + 1, bowler: bowlerName, economy: economy, conceded_runs: conceded_runs, total_balls: total_balls }];
    }, []);

    return topTenEconomicalBowlers;
}

module.exports = topTenEconomicalBowlersByYear;
