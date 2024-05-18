const tossWinMatchWin=(matches)=> {

    if (matches === undefined || !Array.isArray(matches)) {
        return {};
    }

    return matches.reduce((result, match) => {
        if (match.winner === match.toss_winner) {
            result[match.toss_winner] = (result[match.toss_winner] || 0) + 1;
        }
        return result;
    }, {});
}

module.exports = tossWinMatchWin;
