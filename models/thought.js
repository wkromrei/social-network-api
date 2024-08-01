const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
        createdAt: { type: Date, default: dayjs(), get: (createdAt) => dayjs(createdAt).format('MMM MM[th], YYYY [at] hh:mm a')},
        username: {type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
        getters: true,
        virtuals: true,
        },
        id: false,
    });

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;