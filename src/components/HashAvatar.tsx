
export const HashAvatar = ({ hash }: { hash: string }) => {
    return (
        <div>
            <img src={`https://avatars.fastly.steamstatic.com/${hash}_full.jpg`} alt={'Player profile'} title={hash} />
        </div>
    );
};
