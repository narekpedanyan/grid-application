
export type TUrlSrcSet = {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
};
export type TConfigItem = {
    alt_description: string;
    alternative_slugs: Record<string, string>;
    asset_type: string;
    blur_hash: string;
    created_at: string;
    urls: TUrlSrcSet;
    width: number;
    height: number;
}

