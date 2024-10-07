import {FC, useMemo} from "react";
import styled from "styled-components";

const Grid = styled.div<{ columnCount: number; gap: number; }>`
  width: 100%;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(${(props) => props.columnCount}, minmax(0, 1fr));
  grid-column-gap: ${(props) => props.gap}px;
`;

const Column = styled.div<{ gap: number }>`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: 24px;
`;

export type TConfigItem = {
    alt_description: string;
    alternative_slugs: Record<string, string>;
    asset_type: string;
    blur_hash: string;
    created_at: string;
    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        small_s3: string;
        thumb: string;
    }
    width: number;
    height: number;
}

interface TMasonryGridProps {
    configuration: TConfigItem[];
    columnsCount?: number;
    gap?: number;
}

const MasonryGrid: FC<TMasonryGridProps> = ({
configuration,
columnsCount = 3,
gap = 24,
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
        <Grid columnCount={columnsCount} gap={gap}>
            {
                columns.map((rows: TConfigItem[], index) => {
                    return (
                        <Column key={index} gap={gap}>
                            {
                                rows.map((item: TConfigItem, rowIndex) => {
                                    const { urls, alt_description: altDescription } = item;
                                    const imgSrc = urls?.small;
                                    return (
                                        <div key={`index${rowIndex}`}>
                                            <img src={imgSrc} alt={altDescription} width="100%" />
                                        </div>
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
