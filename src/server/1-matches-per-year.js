const matchesPlayedPerYear = (matches) => {

    if (matches === undefined || !Array.isArray(matches)) {
        return {};
    }

    const matchesPlayed = matches.reduce((matchesPlayed, match) => {
        matchesPlayed[match.season] = (matchesPlayed[match.season] || 0) + 1;
        return matchesPlayed;
    }, {});

    return matchesPlayed;
}

module.exports = matchesPlayedPerYear;
