
export type TUrlSrcSet = {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
};

export type TUser = {
    first_name: string;
    last_name: string;
    profile_image: {
        large: string;
        medium: string;
        small: string;
    }
    total_likes: number;
}

export type TConfigItem = {
    alt_description: string;
    alternative_slugs: Record<string, string>;
    asset_type: string;
    blur_hash: string;
    created_at: string;
    urls: TUrlSrcSet;
    width: number;
    height: number;
    id: string;
    user: TUser;
    updated_at: string;
}

