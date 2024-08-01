const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(
                    v
                );
            },
            message: (props) => `oops ${props.value} is not a valid email address!`,
        },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
},
    {
    
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

userSchema.pre('remove', async function (next) {
    try {
        let test = await mongoose.model('thought').deleteMany({ username: this.username });
        next();
    } catch (err) {
        next(err);
    }
});

const User = model('user', userSchema);

module.exports = User;