import React, { useState } from 'react';
import {
    Image
} from 'react-native';

const ImageIcon = props => {

    return (
        <Image
            source={props.focused ? props.sourceFocused : props.source}
            fadeDuration={0}
            style={props.style}
        />
    );

};

export default ImageIcon;
