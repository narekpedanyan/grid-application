import {InfoHolder, InfoLabel} from './ImageViewStyles.ts';
import {FC} from 'react';

interface TInfoProps {
    title: string;
    authorName: string;
    createdDate: string;
    isSeparateView?: boolean;
    goBack: () => void;
}
const Info:FC<TInfoProps> = ({
 title,
 authorName,
 createdDate,
 isSeparateView,
 goBack,
}) => {
    return (
        <InfoHolder>
            {
                isSeparateView && (<button type="button" onClick={goBack}>Go back</button>)
            }
            <h3>{title}</h3>
            {
                authorName && (
                    <InfoLabel>
                        {`Author: ${authorName}`}
                    </InfoLabel>
                )
            }
            {
                createdDate && (
                    <InfoLabel>
                        {`Date: ${createdDate}`}
                    </InfoLabel>
                )
            }
        </InfoHolder>
    )
}

export default Info;
