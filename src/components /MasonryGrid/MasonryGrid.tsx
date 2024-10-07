import {FC, useMemo} from "react";
import LazyImage from "../LazyImage/LazyImage.tsx";
import {TConfigItem} from "../../@types/global.ts";
import {Column, Grid, ImageWrapper, StyledLink} from "./MasonryGridStyles.ts";

import newTabIcon from "../../assets/icons/new-tab.svg";

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
                                rows.map((item: TConfigItem, rowIndex) => {
                                    const { id, urls, alt_description: altDescription } = item;
                                    const regularSrc = urls?.regular;

                                    return (
                                        <>
                                            <ImageWrapper onClick={() => onSelectImage(item)}>
                                                <LazyImage
                                                    src={regularSrc}
                                                    alt={altDescription}
                                                />
                                                <StyledLink
                                                    key={`index${rowIndex}`}
                                                    onClick={() => onSelectImage(item as TConfigItem)}
                                                    to={`/images/${id}`}
                                                >
                                                    <img src={newTabIcon} alt="" />
                                                </StyledLink>
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
