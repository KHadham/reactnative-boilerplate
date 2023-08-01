import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { noop } from '@helper/';
import NotifyServices from '../../utils/other';
import styles from './MessageInfo.styles';

const DEFAULT_MESSAGE = 'Please try again.';
const DEFAULT_TEXT_STATUS = 'Error';
const DEFAULT_CB_TEXT_STATUS = 'Retry';
const DEFAULT_HEIGHT = 60;

const MessageInfo = (props) => {
    const [animationState] = useState({
        height: new Animated.Value(0)
    });
    const [visible, setVisible] = useState(false);
    const [textStatus, setTextStatus] = useState('');
    const [textCb, setTextCb] = useState('');
    const [textMessage, setTextMessage] = useState('');
    const [onPress, setOnpress] = useState(() => {});

    const { textStatusStyle, textCbStyle } = props;

    const setContent = (content = {}) => {
        const {
            visible: nVisible = false,
            textStatus: nTextStatus = DEFAULT_TEXT_STATUS,
            textCb: nTextCb = DEFAULT_CB_TEXT_STATUS,
            textMessage: nTextMessage = DEFAULT_MESSAGE,
            onPress: nOnPress = NotifyServices.clearNotify
        } = content;
        setVisible(nVisible);
        setTextStatus(nTextStatus);
        setTextCb(nTextCb);
        setTextMessage(nTextMessage);
        setOnpress(() => nOnPress);
    };

    useEffect(() => {
        Animated.timing(animationState.height, {
            toValue: visible ? DEFAULT_HEIGHT : 0,
            duration: 150,
            useNativeDriver: false
        }).start();
    });

    useEffect(() => {
        const subscription = NotifyServices.getNotify().subscribe((content) => {
            setContent(content);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <Animated.View style={[{ height: animationState.height }, styles.container]}>
            <View style={styles.textStatusContainer}>
                <Text style={[styles.textStatusStyle, textStatusStyle]}>{textStatus}</Text>
            </View>
            <View style={styles.textMessageContainer}>
                <Text style={styles.textMessage}>{textMessage}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={onPress}>
                    <Text style={[styles.cbText, textCbStyle]}>{textCb}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default MessageInfo;

MessageInfo.propTypes = {
    textStatusStyle: PropTypes.instanceOf(Object),
    textCbStyle: PropTypes.instanceOf(Object)
};

MessageInfo.defaultProps = {
    textStatusStyle: {},
    textCbStyle: {}
};
