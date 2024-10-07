import {useState, useRef, useEffect} from 'react';
import { useMutation } from "@tanstack/react-query";
import {HttpService} from "../../services/HttpService.ts";
import MasonryGrid from "../../components /MasonryGrid/MasonryGrid.tsx";
import {TConfigItem} from "../../@types/global.ts";
import ImageView from "../../components /ImageView/ImageView.tsx";
import {DashboardEl, ViewMoreContainer} from "./DashboardStyles.ts";

const fetchImages = (page: number, perPage: number) => {
    return HttpService.get(`photos?page=${page}&per_page=${perPage}`, {});
};

const perPage = 24;
const Dashboard = () => {
    const [data, setData] = useState<TConfigItem[]>([]);
    const [page, setPage] = useState(1);
    const [selectedImage, selectImage] = useState<TConfigItem | null>(null);

    const mutableData = useRef({
        isInitialFetched: false,
        isLoading: false,
    });
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const getData = useMutation({
        mutationFn: ({ page, perPage}: { page: number, perPage: number }) => fetchImages(page, perPage),
        onSuccess: (res) => {
            setData((prev) => [...prev, ...res.data]);
            mutableData.current.isLoading = false
        },
        onError: (error) => {
            console.log(error, 'error');
            mutableData.current.isLoading = false
        },
    });

    const getInitialData = () => {
        getData.mutate({ page: page, perPage: perPage });
    }

    const fetchMoreData = () => {
        if (!mutableData.current.isLoading) {
            mutableData.current.isLoading = true;
            setPage((prevPage) => prevPage + 1);
            getData.mutate({ page: page + 1, perPage: perPage });
        }
    };

    const enableBodyScroll = () => {
        const body = document.getElementsByTagName('body')[0];
        body.removeAttribute('style');
    }

    const hideBodyScroll = () => {
        const body = document.getElementsByTagName('body')[0];
        body.setAttribute('style', 'overflow: hidden')
    }

    const onSelectImage = (info: TConfigItem) => {
        hideBodyScroll();
        selectImage(info);
    }

    useEffect(() => {
        if (!mutableData.current?.isInitialFetched) {
            getInitialData();
            mutableData.current.isInitialFetched = true;
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !mutableData.current.isLoading) {
                    fetchMoreData();
                }
            },
            {
                root: null,
                rootMargin: '200px',
                threshold: 0.1,
            }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef.current, page]);

    return (
        <DashboardEl>
            {
                Boolean(selectedImage) && (
                    <ImageView
                        imageInformation={selectedImage as TConfigItem}
                        onClose={() => {
                            enableBodyScroll();
                            selectImage(null)
                        }}
                    />
                )
            }
            <MasonryGrid
                configuration={data}
                columnsCount={3}
                gap={24}
                onSelectImage={onSelectImage}
            />
            <ViewMoreContainer ref={loaderRef}>
                <p>Loading...</p>
            </ViewMoreContainer>
        </DashboardEl>
    )
}

export default Dashboard;
