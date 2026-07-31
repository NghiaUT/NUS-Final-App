import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../hooks/useAuth';

type SearchMode = 'feed' | 'discover';

interface SearchBoxProps {
    className?: string;
    defaultMode?: SearchMode;
    allowModeSwitch?: boolean;
}

const SEARCH_ROUTES: Record<SearchMode, string> = {
    feed: '/feed',
    discover: '/',
};

const MODE_LABELS: Record<SearchMode, string> = {
    feed: 'Feed',
    discover: 'Discover',
};

const SearchBox = ({
    className = '',
    defaultMode = 'discover',
    allowModeSwitch = true,
}: SearchBoxProps) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Nếu chưa đăng nhập mà defaultMode được truyền vào là 'feed' -> ép về 'discover'
    const resolvedDefaultMode: SearchMode =
        defaultMode === 'feed' && !isAuthenticated ? 'discover' : defaultMode;

    const [keyword, setKeyword] = useState('');
    const [mode, setMode] = useState<SearchMode>(resolvedDefaultMode);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Danh sách mode thực sự được phép hiển thị/chọn
    const availableModes = (Object.keys(MODE_LABELS) as SearchMode[]).filter(
        (m) => m !== 'feed' || isAuthenticated
    );

    // Nếu trạng thái đăng nhập đổi (ví dụ logout ngay lúc đang chọn feed) -> tự đưa về discover
    useEffect(() => {
        const runSetMode = () => {
            if (mode === 'feed' && !isAuthenticated) {
                setMode('discover');
            }
        }
        runSetMode();
    }, [isAuthenticated, mode]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        if (!trimmed) return;

        // Chặn thêm 1 lớp phòng thủ, phòng trường hợp state mode bị set sai kiểu nào đó
        const safeMode: SearchMode = mode === 'feed' && !isAuthenticated ? 'discover' : mode;

        const basePath = SEARCH_ROUTES[safeMode];
        navigate(`${basePath}?q=${encodeURIComponent(trimmed)}`);
    };

    return (
        <form
            onSubmit={handleSearch}
            className={twMerge(
                'flex items-stretch bg-white rounded-full overflow-visible shadow-sm border border-gray-200 focus-within:border-[#3b5998] focus-within:ring-2 focus-within:ring-[#3b5998]/20 transition-all',
                className
            )}
        >
            {allowModeSwitch && (
                <div className="relative shrink-0" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="h-full flex items-center gap-1.5 pl-4 pr-3 md:pl-5 md:pr-3 text-sm md:text-base font-semibold text-gray-600 hover:text-[#3b5998] rounded-l-full transition-colors cursor-pointer"
                    >
                        {MODE_LABELS[mode]}
                        <ChevronDown
                            size={16}
                            className={twMerge('transition-transform text-gray-400', isOpen ? 'rotate-180' : '')}
                        />
                    </button>

                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-px bg-gray-200" />

                    {isOpen && (
                        <div className="absolute top-[calc(100%+8px)] left-0 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                            {availableModes.map((m) => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => {
                                        setMode(m);
                                        setIsOpen(false);
                                    }}
                                    className={twMerge(
                                        'w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer',
                                        mode === m ? 'text-[#3b5998] bg-blue-50/60' : 'text-gray-600'
                                    )}
                                >
                                    {MODE_LABELS[m]}
                                </button>
                            ))}

                            {/* Gợi ý đăng nhập nếu chưa login, để user hiểu tại sao không thấy Feed */}
                            {!isAuthenticated && (
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-500 transition-colors cursor-pointer border-t border-gray-100 mt-1 pt-2"
                                >
                                    Đăng nhập để search Feed
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Photo/ Album"
                className="flex-1 min-w-0 px-4 py-2 md:py-3 text-sm md:text-base bg-transparent focus:outline-none"
            />

            <button
                type="submit"
                className="shrink-0 flex items-center justify-center px-4 md:px-5 text-gray-400 hover:text-[#3b5998] transition-colors cursor-pointer"
                aria-label="Tìm kiếm"
            >
                <Search size={18} />
            </button>
        </form>
    );
};

export default SearchBox;