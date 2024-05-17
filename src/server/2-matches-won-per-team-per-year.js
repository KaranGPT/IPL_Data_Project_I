const resultPerTeamPerYear = (matches) => {

    if (matches === undefined || !Array.isArray(matches)) {
        return {};
    }

    const winsPerTeamPerSeason = matches.reduce((winCountOfParticipants, match) => {

        winCountOfParticipants[match.team1] ?? (winCountOfParticipants[match.team1] = {});
        winCountOfParticipants[match.team2] ?? (winCountOfParticipants[match.team2] = {});

        winCountOfParticipants[match.team1][match.season] ?? (winCountOfParticipants[match.team1][match.season] = 0);
        winCountOfParticipants[match.team2][match.season] ?? (winCountOfParticipants[match.team2][match.season] = 0);

        if (match.winner === match.team1 || match.winner === match.team2) {
            winCountOfParticipants[match.winner][match.season]++;
        }

        return winCountOfParticipants;
    }, {});

    return winsPerTeamPerSeason;
}

module.exports = resultPerTeamPerYear;
