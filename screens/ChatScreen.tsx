import {RootStackScreenProps} from "../types";
import {Colors, View} from "react-native-ui-lib";
import {Chat, defaultTheme, MessageType} from "@flyerhq/react-native-chat-ui";
import React, {ReactNode, useState} from "react";
import {useHeaderHeight} from "@react-navigation/elements";

export default function ChatScreen({route, navigation}: RootStackScreenProps<'ChatScreen'>) {
    const headerHeight = useHeaderHeight();
    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.floor(Math.random() * 16)
            const v = c === 'x' ? r : (r % 4) + 8
            return v.toString(16)
        })
    }
    const roomMessages = route.params.roomMessages;

    const [messages, setMessages] = useState<MessageType.Any[]>(roomMessages);
    const user = { firstName: 'Jane',
        id: '06c33e8b-e835-4736-80f4-63f44b66666c' }

    const addMessage = (message: MessageType.Any) => {
        setMessages([message, ...messages])
    }

    const handleSendPress = (message: MessageType.PartialText) => {
        const textMessage: MessageType.Text = {
            author: user,
            createdAt: Date.now(),
            id: uuidv4(),
            text: message.text,
            type: 'text',
        }
        addMessage(textMessage);
    }

    const renderBubble = ({
                              child,
                              message,
                              nextMessageInGroup,
                          }: {
        child: ReactNode
        message: MessageType.Any
        nextMessageInGroup: boolean
    }) => {
        return (
            <View
                style={{
                    backgroundColor: user.id !== message.author.id ? '#ffffff' : '#1d1c21',
                    borderBottomLeftRadius:
                        !nextMessageInGroup && user.id !== message.author.id ? 20 : 0,
                    borderBottomRightRadius:
                        !nextMessageInGroup && user.id === message.author.id ? 20 : 0,
                    borderColor: '#1d1c21',
                    borderWidth: 1,
                    overflow: 'hidden',
                }}
            >
                {child}
            </View>
        )
    }



    return(
        <View flex style={{
          paddingTop: headerHeight
        }}>
            <Chat
                messages={messages}
                onSendPress={handleSendPress}
                user={user}
                showUserNames={true}
                showUserAvatars={true}
                theme={{
                    ...defaultTheme,
                    colors: { ...defaultTheme.colors,
                        primary: Colors.primary,
                        inputBackground: Colors.background2,
                        inputText: Colors.black},
                }}
            />
        </View>
    )

}