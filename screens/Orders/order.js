import React from 'react';

import {View, Text, Pressable} from 'react-native';

const OrderScreen = ({navigation, route}) => {
    return(
        <>
        <Text>Oi</Text>
        <Pressable 
        onPress={() => navigation.goBack()}>
            <Text>Voltar hehe</Text>
        </Pressable>
        </>
    )
}

export default OrderScreen;