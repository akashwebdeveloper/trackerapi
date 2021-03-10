const Challenges = require('../../models/challenge')
const moment = require('moment');

module.exports = {
    getAllChallenges: (req, res) => {

        Challenges.find({}, (err, result) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }

            const chall = [];
            result.forEach(challenge => {
                const obj = {};
                obj._id = challenge._id
                obj.name = challenge.name

                const challengeStart = moment(challenge.starttime)
                const today = moment()

                const days = challengeStart.diff(today, 'days')
                const hours = challengeStart.diff(today, 'hours') - (24 * (days));
                const minutes = (challengeStart.diff(today, 'minutes') - (1440 * (days))) - (60 * hours);

                var time = "";
                if (days > 0) {
                    time += `${days} Days ${hours} Hours`;
                } else {
                    time += `${hours} Hours ${minutes} Minutes `;
                }

                obj.remaining = time
                chall.push(obj)
            });


            return res.status(200).json({
                success: true,
                status: 200,
                message: `Total ${result.length} Challenges are here`,
                data: chall
            })
        })
    },
}
