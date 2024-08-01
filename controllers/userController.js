const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends')
                


            if (!oneUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.status(200).json(singleUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);

            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
 
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            if (!user) {
                res.status(400).json({ message: 'No user with this ID' })
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thoughts deleted from this user' });
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(400).json({ message: 'No user with that ID' })
            }

            res.json(user);
        } catch (err) {
            res.staus(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friend._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user with this ID!' });
            }

            res.json({ message: 'Added a friend' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: friend._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user with this ID!' });
            }

            res.json({ message: 'Deleted a friend from user' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}