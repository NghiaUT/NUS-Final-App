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
    type: 'photo';
    data: PhotoItem[];
} | {
    type: 'album';
    data: AlbumItem[];
}

const MediaList = (props: MediaListProp) => {
    return (
        <div className="flex flex-wrap gap-4">
            {props.type === 'album'
                ? props.data.map((item) => (
                    <MediaCard item={item} type="album" key={item.id} />
                ))
                : props.data.map((item) => (
                    <MediaCard item={item} type="photo" key={item.id} />
                ))
            }
        </div>
    );
};

export default MediaList;