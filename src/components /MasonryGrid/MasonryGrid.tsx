import {FC, useMemo} from "react";
import styled from "styled-components";
import LazyImage from "../LazyImage/LazyImage.tsx";
import {TConfigItem} from "../../@types/global.ts";

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
                                    const regularSrc = urls?.regular;

                                    return (
                                        <div key={`index${rowIndex}`}>
                                            <LazyImage
                                                src={regularSrc}
                                                alt={altDescription}
                                            />
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
