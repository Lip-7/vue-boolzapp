const { createApp } = Vue;

createApp({
    data() {
        return {
            user: user,
            contacts: contacts,
            research: '',
            idChatFlag: 0,
            chatToView: null,
            newMessage: '',
            possibleAnswers: possibleAnswers,
            vw: null,
            isMobile: false,
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
            this.receiveNewMessage(destination)
            this.seeLastMessages()
            this.newMessage = ''
        },
        receiveNewMessage(destin) {
            setTimeout(() => {
                const newMessage = this.createNewMessage();
                const messageContent = this.possibleAnswers[this.getRandomNumber(0, this.possibleAnswers.length - 1)]
                newMessage.status = 'received';
                newMessage.message = messageContent;
                destin.messages.push(newMessage);
                this.seeLastMessages()
            }, 3000);
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
        },
        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        seeLastMessages() {
            setTimeout(() => {
                this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight);
            }, 50);
        },
        dropDown(ref) {
            const itemToShow = this.$refs[ref];
            console.log(itemToShow);
        },
        switchToChat() {
            if (window.innerWidth < 768) {
                this.$refs.leftApp.style.width = '0%'
                this.$refs.rightApp.style.width = '100%'
            }
        },
        switchToFriends() {
            if (window.innerWidth < 768) {
                this.$refs.leftApp.style.width = '100%'
                this.$refs.rightApp.style.width = '0%'
            }
        },
        takeDevice() {
            this.vw = window.innerWidth;
            if (this.vw < 768) {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        }

    },
    beforeMount() {
        this.getObjectById(1);
    },
    mounted() {
        this.takeDevice();
        window.addEventListener('resize',() => {
            this.takeDevice();
        })
        
    },
}).mount('#app');