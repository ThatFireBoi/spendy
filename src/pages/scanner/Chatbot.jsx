import React, { useEffect } from 'react'

export const Chatbot = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            window.botpressWebChat.init({
            composerPlaceholder: 'Chat with Spendy AdviceBot!',
            botConversationDescription: "Seek budgeting and savings advice from me!",
            botId: '60455ef1-33d9-4a61-b615-2cd02ecc452b',
            hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
            messagingUrl: 'https://messaging.botpress.cloud',
            clientId: '60455ef1-33d9-4a61-b615-2cd02ecc452b',
            webhookId: "9f35501c-8fd0-49f0-a9f5-4dfe06a09dee",
            lazySocket: true,
            themeName: "prism",
            botName: "Spendy Advice",
            avatarUrl: "https://i.imgur.com/ZMhynfi.png",
            stylesheet: "https://webchat-styler-css.botpress.app/prod/6b482ef9-976c-49e5-8dab-087bb1cd57ec/v85465/style.css",
            frontendVersion: "v1",
            showBotInfoPage: true,
            enableConversationDeletion: true,
            showPoweredBy: true,
            theme: "prism",
            themeColor: "#2563eb"
        })
    }
    }, [])

    return <div id="webchat" />
};
