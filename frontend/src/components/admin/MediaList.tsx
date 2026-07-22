import MediaCard from './MediaCard';

type PhotoItem = {
    id: number;
    title?: string;
    order?: string;
    url: string;
    alt_text: string;
};

// Trường photos của kiểu Album chỉ chứa 3 photo đầu tiên 
type AlbumItem = {
    id: number;
    title: string;
    photos: PhotoItem[];
}

type MediaListProp = {
    type: string,
    data: PhotoItem[] | AlbumItem[],
}

const MediaList = ({ type, data }: MediaListProp) => {
    return (
        <div className="flex flex-wrap gap-4">
            {data.map((item) => (
                <MediaCard item={item} type={type} key={item.id} />
            ))}
        </div>
    );
};

export default MediaList;