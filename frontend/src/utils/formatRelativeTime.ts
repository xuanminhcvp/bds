export function formatRelativeTime(dateString?: string) {
    if (!dateString) {
        return '';
    }
    const now = new Date();
    const createdDate = new Date(dateString);
    const diffInTime = now.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (diffInDays === 0) {
        return 'đăng hôm nay';
    } else if (diffInDays === 1) {
        return 'đăng hôm qua';
    } else if (diffInDays >= 2 && diffInDays <= 7) {
        return `đăng ${diffInDays} ngày trước`;
    } else {
        const day = createdDate.getDate();
        const month = createdDate.getMonth() + 1;
        return `đăng ${day}/${month}`;
    }
    }