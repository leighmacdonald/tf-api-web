import type { PropsWithChildren } from 'react';

export const InlineCodeBlock = ({ children }: PropsWithChildren) => (
    <div className="relative rounded  px-[0.3rem] py-[0.2rem] ">
        <pre className="font-mono text-sm font-semibold text-left">{children}</pre>
    </div>
);
