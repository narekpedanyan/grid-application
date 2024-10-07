import { FC } from 'react';
import {TConfigItem} from "../../@types/global.ts";
import { useNavigate } from 'react-router-dom';
import {
    CloseBtn,
    Content,
    ImageHolder,
    ImageViewOverlay,
    ModalContainer,
} from "./ImageViewStyles.ts";
import closeIcon from '../../assets/icons/close.svg';
import Info from "./InfoHolder.tsx";

interface TImageViewProps {
    imageInformation: TConfigItem;
    onClose?: () => void;
    isSeparateView?: boolean;
}
const ImageView:FC<TImageViewProps>= ({
imageInformation,
onClose,
isSeparateView,
}) => {
    const navigate = useNavigate();
    const { urls, alt_description: altDescription, user, updated_at: updatedAt} = imageInformation;
    const imageSrc = urls.regular;
    const firstName = user?.first_name || '';
    const lastName = user?.last_name || '';
    const userName = `${firstName} ${lastName}`;
    const formattedDate = new Date(updatedAt).toLocaleDateString();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <ImageViewOverlay>
            <ModalContainer>
                {
                    Boolean(onClose) && (
                        <CloseBtn onClick={onClose}>
                            <img src={closeIcon} alt="" width="24px" />
                        </CloseBtn>
                    )
                }
                <Content>
                    <Info
                        title={altDescription}
                        authorName={userName}
                        createdDate={formattedDate}
                        goBack={goBack}
                        isSeparateView={isSeparateView}
                    />
                    <ImageHolder>
                        <img src={imageSrc} alt={altDescription} style={{ maxWidth: '1024px' }}/>
                    </ImageHolder>
                </Content>
            </ModalContainer>
        </ImageViewOverlay>
    )
}

export default ImageView;
