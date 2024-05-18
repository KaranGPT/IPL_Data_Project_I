const bestEconomicBowlerInSuperOver = (deliveries) => {

    if (deliveries === undefined || !Array.isArray(deliveries)) {
        return {};
    }

    const economyInSuperOver = deliveries.filter((delivery) => {
        return +delivery.is_super_over !== 0;
    }).reduce((superOverEconomicRates, superOverDelivery) => {
        superOverEconomicRates[superOverDelivery.bowler] ?? (superOverEconomicRates[superOverDelivery.bowler] = { 'conceded_runs': 0, 'total_balls': 0 });

        let runsToAdd;

        if (superOverDelivery.wide_runs != 0 || superOverDelivery.noball_runs != 0) {
            runsToAdd = +superOverDelivery.total_runs - superOverDelivery.penalty_runs;
        } else {
            runsToAdd = +superOverDelivery.total_runs - (+superOverDelivery.bye_runs + +superOverDelivery.legbye_runs + +superOverDelivery.penalty_runs);
            superOverEconomicRates[superOverDelivery.bowler]['total_balls']++;
        }
        superOverEconomicRates[superOverDelivery.bowler]['conceded_runs'] += runsToAdd;

        const { conceded_runs, total_balls } = { ...superOverEconomicRates[superOverDelivery.bowler] };
        const economy = Number((conceded_runs / (total_balls / 6)).toFixed(2));
        superOverEconomicRates[superOverDelivery.bowler]['economy'] = economy;

        return superOverEconomicRates;
    }, {});

    const eonomicRatesInSuperOver = Object.values(economyInSuperOver).map((economicRateDetails) => {
        return economicRateDetails.economy;
    });
    const bestEconommicRateInSuperOver = Math.min(...eonomicRatesInSuperOver);

    let bestEconomicBowlerInSuperOver = Object.entries(economyInSuperOver).filter(([bowler, superOverDelivery]) => {
        return superOverDelivery.economy === bestEconommicRateInSuperOver;
    });

    bestEconomicBowlerInSuperOver = Object.fromEntries(bestEconomicBowlerInSuperOver);

    return bestEconomicBowlerInSuperOver;

}

module.exports = bestEconomicBowlerInSuperOver;
