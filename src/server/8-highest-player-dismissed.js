const highestPlayerDismissed = (deliveries) => {

    if (deliveries === undefined || !Array.isArray(deliveries)) {
        return {};
    }

    const playerDismissedAndBowler = deliveries.reduce((playerDismissedAndBowler, delivery) => {
        if (delivery.player_dismissed !== '') {
            playerDismissedAndBowler[delivery.player_dismissed] ?? (playerDismissedAndBowler[delivery.player_dismissed] = {});
            playerDismissedAndBowler[delivery.player_dismissed][delivery.bowler] ?? (playerDismissedAndBowler[delivery.player_dismissed][delivery.bowler] = 0);
            playerDismissedAndBowler[delivery.player_dismissed][delivery.bowler]++;
        }

        return playerDismissedAndBowler;

    }, {});

    const dismissedCounts = Object.keys(playerDismissedAndBowler).map((dismissedBatsman) => {
        return Object.keys(playerDismissedAndBowler[dismissedBatsman]).map((bowler) => {
            return playerDismissedAndBowler[dismissedBatsman][bowler];
        });
    });

    const highestDismissalCount = Math.max(...dismissedCounts.flat());

    const highestDismissedPlayers = Object.keys(playerDismissedAndBowler).reduce((highestDismissedPlayer, batsman) => {
        const bowlersWhoDismissed = Object.keys(playerDismissedAndBowler[batsman]).filter((bowler) => {
            return playerDismissedAndBowler[batsman][bowler] === highestDismissalCount;
        });

        if (bowlersWhoDismissed.length > 0) {
            highestDismissedPlayer.push({
                [batsman]: {
                    'dismissed_by': bowlersWhoDismissed,
                    'number_of_times_dismissed': highestDismissalCount
                }
            });
        }

        return highestDismissedPlayer;
    }, []);

    return highestDismissedPlayers;

}

module.exports = highestPlayerDismissed;
