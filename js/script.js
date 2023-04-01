const { createApp } = Vue;

createApp({
    data() {
        return {
            user: user,
            contacts: contacts,
            research: '',
            idChatFlag: 1,
        }
    },
    methods: {
        getHour(fullDate) {
            const dateDivided = fullDate.split(' ')
            dateDivided.splice(0, 1)
            return dateDivided[0].slice(0, dateDivided.length - 4)
        },
        filterFriends() {
            this.contacts.forEach(user => {
                if (user.name.toUpperCase().includes(this.research.toUpperCase()) || !this.research) {
                    user.visible = true;
                } else {
                    user.visible = false;
                }
            })
        },
        selectNewChat(id) {
            this.idChatFlag = id;
        }
    },
}).mount('#app');