const Challenges = require('../../models/challenge')


module.exports = {
    getAllChallenges: (req, res) => {

        Challenges.find({ }, (err, result) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }

            return res.status(200).json({
                success: true,
                status: 200,
                message: `Total ${result.length} Challenges are here`,
                data: result
            })
        })
    },
}
