import {HttpService} from "../../services/HttpService.ts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';
import {TConfigItem} from "../../@types/global.ts";
import ImageView from "../../components /ImageView/ImageView.tsx";

const ImageOverview = () => {
    const { imageId } = useParams<{ imageId: string }>();

    const { data } = useQuery({
        queryKey: ["general-info"],
        queryFn: async () => {
            return HttpService.get(`photos/${imageId}`, {});
        },
        gcTime: 0,
    });
    const imageInformation = data?.data || null;
    console.log(data, 'data');
    return (
        <div>
            {
                imageInformation && (
                    <ImageView
                        imageInformation={imageInformation as TConfigItem}
                        isSeparateView
                    />
                )
            }
        </div>
    )
}

export default ImageOverview;
