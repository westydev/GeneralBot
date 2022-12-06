class ModerationCore {
    constructor({ member }) {
        this.member = member;
    }
    async ban() {
        this.member.ban()
    }
    async kick() {
        this.member.kick()
    }
    async mute(time) {
        this.member.timeout(time);
    }
}

module.exports = { ModerationCore }