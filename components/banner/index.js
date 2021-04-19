import React from 'react';

import {View, Text} from 'react-native';

const Banner = () => {
    return(
        <>
                <View
          style={{
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            height: 50,
            backgroundColor: "#ae3523",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              display: "flex",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Frete Grátis para compras acima de R$149
          </Text>
          <Text
            style={{
              textAlign: "center",
              display: "flex",
              fontWeight: "bold",
              fontSize: 9,
              color: "#fefefe",
            }}
          >
            Valido apenas para sua primeira compra, aproveite!
          </Text>
        </View>
        </>
    )
}

export default Banner;