import React from 'react';

import {View, Text} from 'react-native';

const Commerces = () => {
    return(
        <View style={{ height: 430 }}>
        <Text style={{ marginLeft: '5%', marginTop: 20, fontSize: 22 }}>Comercios populares</Text>
        <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 10, backgroundheight: 'auto'}}>
            <View style={{ height: 100, width: '100%', backgroundColor: "#333", borderRadius: 5}}>
            </View>
        </View>
        <View style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: 10, backgroundheight: 'auto'}}>
            <View style={{ height: 100, width: '100%', backgroundColor: "#333", borderRadius: 5}}>
            </View>
        </View>
        </View>
    )
}

export default Commerces;