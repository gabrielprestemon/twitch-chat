module.exports = {
    bot: function(client, target) {
        client.say(target, `beep boop i am a human`);
        console.log(`* Executed bot command`);
    }
}