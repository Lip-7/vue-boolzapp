const { createApp } = Vue;

createApp({
    data() {
        return {
            user: user,
            contacts: contacts,
            research: '',
            idChatFlag: 1,
            chatToView: null,
            newMessage: '',
        }
    },
    methods: {
        getHour(fullDate) {
            const dateDivided = fullDate.split(' ');
            dateDivided.splice(0, 1);
            return dateDivided[0].slice(0, dateDivided.length - 4);
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
            this.getObjectById(id);
        },
        getObjectById(id) {
            const filteredList = contacts.filter(obj => obj.id == id);
            this.chatToView = filteredList[0];
        },
        sendNewMessage() {
            const newMessage = this.createNewMessage();
            const destination = this.contacts.filter(chat => chat.id == this.idChatFlag)[0];
            destination.messages.push(newMessage);
            this.newMessage = ''
        },
        createNewMessage() {
            return {
                date: this.actualTime(),
                message: this.newMessage,
                status: 'sent'
             }

        },
        actualTime() {
            const today = new Date();
            const dateTpl = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const hourTpl = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const actualDate = today.toLocaleString('it-IT', dateTpl);
            const actualHour = today.toLocaleString('it-IT', hourTpl);
            return `${actualDate} ${actualHour}`
        }
    },
    beforeMount() {
        this.getObjectById(this.idChatFlag);
    },
    mounted() {
    },
}).mount('#app');