const strikeRateOfBatsmanPerYear = (matches, deliveries) => {

    if (matches === undefined || deliveries === undefined || !Array.isArray(matches) || !Array.isArray(deliveries)) {
        return {};
    }

    const matchIdWithYear = matches.reduce((matchIdYears, match) => {
        matchIdYears[match.id] = match.season;
        return matchIdYears;
    }, {});

    const totalRunsAndBallsOfBatsmanPerYear = deliveries.reduce((totalRunsAndBallsOfBatsmanPerYear, delivery) => {
        const year = matchIdWithYear[delivery.match_id];
        totalRunsAndBallsOfBatsmanPerYear[delivery.batsman] ?? (totalRunsAndBallsOfBatsmanPerYear[delivery.batsman] = {});
        totalRunsAndBallsOfBatsmanPerYear[delivery.batsman][year] ?? (totalRunsAndBallsOfBatsmanPerYear[delivery.batsman][year] = { total_runs: 0, total_balls: 0 });
        totalRunsAndBallsOfBatsmanPerYear[delivery.batsman][year]['total_runs'] += isNaN(delivery.total_runs) ? 0 : Number(delivery.total_runs);
        totalRunsAndBallsOfBatsmanPerYear[delivery.batsman][year]['total_balls']++;

        return totalRunsAndBallsOfBatsmanPerYear;
    }, {});

    const strikeRateOfBatsmanEachSeason = Object.keys(totalRunsAndBallsOfBatsmanPerYear).reduce((totalRunsAndBallsOfBatsmanPerYear, striker) => {
        Object.keys(totalRunsAndBallsOfBatsmanPerYear[striker]).reduce((totalRunsAndBallsOfBatsmanPerYear, year) => {
            const totalRuns = totalRunsAndBallsOfBatsmanPerYear[striker][year]['total_runs'];
            const totalBalls = totalRunsAndBallsOfBatsmanPerYear[striker][year]['total_balls'];

            totalRunsAndBallsOfBatsmanPerYear[striker][year] = Number(((totalRuns / totalBalls) * 100).toFixed(2));

            return totalRunsAndBallsOfBatsmanPerYear;
        }, totalRunsAndBallsOfBatsmanPerYear);

        return totalRunsAndBallsOfBatsmanPerYear;
    }, totalRunsAndBallsOfBatsmanPerYear);

    return strikeRateOfBatsmanEachSeason;

}

module.exports = strikeRateOfBatsmanPerYear;
