const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need to provide your username.',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'You need to provide your valid email address.',
            validate: {
                validator(validEmail) {
                  return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
                    validEmail
                  );
                },
                message: "Please enter your valid email address",
              },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }    
);
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})
const User = model('User', UserSchema);
module.exports = User;
