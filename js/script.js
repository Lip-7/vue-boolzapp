import Picker from './emoji-picker.js';
const { createApp } = Vue;

createApp({
    data() {
        return {
            user: user,
            contacts: contacts.map(contact => ({...contact, newMessage: ' '})),
            research: '',
            idChatFlag: 0,
            chatToView: null,
            possibleAnswers: possibleAnswers,
            vw: null,
            isMobile: false,
            pageloaded: true,
            lastConnectionUser: null,
            messageActive: {
                index: false,
                show: false
            },
            showEmoji: false,

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
            this.getLastMessageTime();
        },
        sendNewMessage() {
            if (this.chatToView.newMessage) {
                const newMessage = this.createNewMessage();
                const destination = this.contacts.filter(chat => chat.id == this.idChatFlag)[0];
                destination.messages.push(newMessage);
                this.receiveNewMessage(destination);
                this.seeLastMessages();
                this.chatToView.newMessage = '';
            }
        },
        receiveNewMessage(destin) {
            this.lastConnectionUser = 'Online'
            setTimeout(() => {
                this.lastConnectionUser = 'Sta scrivendo...'
            }, 1000);
            setTimeout(() => {
                const newMessage = this.createNewMessage();
                const messageContent = this.possibleAnswers[this.getRandomNumber(0, this.possibleAnswers.length - 1)]
                newMessage.status = 'received';
                newMessage.message = messageContent;
                destin.messages.push(newMessage);
                this.seeLastMessages();
                this.getLastMessageTime();
                this.getLastMessageTime();
            }, 3000);
        },
        createNewMessage() {
            return {
                date: this.actualTime(),
                message: this.chatToView.newMessage,
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
        },
        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        seeLastMessages() {
            setTimeout(() => {
                this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight);
            }, 50);
        },
        dropDown(i) {
            if (this.messageActive.index != false && this.messageActive.index != i) {
                this.messageActive.show = false;
                this.messageActive.index = false;
            }
            this.messageActive.show = (this.messageActive.show) ? false : true;
            this.messageActive.index = i;
        },
        deleteMessage(i) {
            this.chatToView.messages.splice(i, 1)
            this.dropDown(i)
        },
        takeDevice() {
            this.vw = window.innerWidth;
            if (this.vw < 768) {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        },
        resetChatFlag() {
            this.idChatFlag = 0;
        },
        pageLoading() {
            setTimeout(() => {
                this.pageloaded = !this.pageloaded;
            }, 3000);
        },
        getLastMessageTime() {
            if (this.chatToView.messages.length > 0) {
                this.lastConnectionUser = 'Ultimo accesso: ' + this.chatToView.messages[this.chatToView.messages.length - 1].date;
            } else {
                this.lastConnectionUser = 'Non disponibile';
            }
        },
        viewEmoji() {
            this.showEmoji = !this.showEmoji;
        },
        onSelectEmoji(emoji) {
            this.chatToView.newMessage += emoji.i;
        },
    },
    beforeMount() {
        this.getObjectById(1);
    },
    mounted() {
        this.takeDevice();
        window.addEventListener('resize',() => {
            this.takeDevice();
        })
        this.pageLoading()
        console.log(this.contacts);
    },
}).component('Picker', Picker).mount('#app');