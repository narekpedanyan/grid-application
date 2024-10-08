import {FC, useMemo} from "react";
import LazyImage from "../LazyImage/LazyImage.tsx";
import {TConfigItem} from "../../@types/global.ts";
import {Column, FullImageViewLink, Grid, ImageWrapper, StyledLink} from "./MasonryGridStyles.ts";

import newTabIcon from "../../assets/icons/new-tab.svg";
import fullScreenIcon from "../../assets/icons/full-screen.svg";

interface TMasonryGridProps {
    configuration: TConfigItem[];
    onSelectImage: (value: TConfigItem) => void;
    columnsCount?: number;
    gap?: number;
}

const MasonryGrid: FC<TMasonryGridProps> = ({
configuration,
columnsCount = 3,
gap = 24,
onSelectImage,
}) => {
    const columns = useMemo(
        () => {
            const columns: TConfigItem[][] = Array.from({ length: columnsCount }, () => []);

            configuration.forEach((item: TConfigItem, index) => {
                const columnIndex = index % columnsCount;
                columns[columnIndex].push(item);
            });

            return columns;
        }, [configuration, columnsCount]
    );
    return (
        <Grid columncount={columnsCount} gap={gap}>
            {
                columns.map((rows: TConfigItem[], index) => {
                    return (
                        <Column key={index} gap={gap}>
                            {
                                rows.map((item: TConfigItem) => {
                                    const { id, urls, alt_description: altDescription } = item;
                                    const regularSrc = urls?.regular;
                                    const fullImageSrc = urls?.full;

                                    return (
                                        <>
                                            <ImageWrapper onClick={() => onSelectImage(item)} key={id}>
                                                <LazyImage
                                                    src={regularSrc}
                                                    alt={altDescription}
                                                />
                                                <StyledLink
                                                    onClick={() => onSelectImage(item as TConfigItem)}
                                                    to={`/images/${id}`}
                                                >
                                                    <img src={newTabIcon} alt=""/>
                                                </StyledLink>
                                                <FullImageViewLink
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}
                                                    href={fullImageSrc}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img src={fullScreenIcon} alt="" />
                                                </FullImageViewLink>
                                            </ImageWrapper>
                                        </>
                                    )
                                })
                            }
                        </Column>
                    )
                })
            }
        </Grid>
    )
}

export default MasonryGrid;
