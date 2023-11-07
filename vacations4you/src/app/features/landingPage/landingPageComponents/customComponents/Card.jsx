import React from 'react';
import { Image } from "./Image";

export const Card = ({ cardClass, imageWrapperClass, imageAlt, imageSrc, textWrapperClass, children, cover, ...rest }) => {
    return (
        <div className={cardClass} {...rest}>
            <Image className={imageWrapperClass} objectCover={cover} alt={imageAlt} image={imageSrc} />
            <div className={textWrapperClass}>
                {children}
            </div>
        </div>
    );
};
