import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const HashAvatar = ({ src }: { src: string }) => {
    return (
        <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback>Profile</AvatarFallback>
        </Avatar>
    );
};
