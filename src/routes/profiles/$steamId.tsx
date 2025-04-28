import {createFileRoute} from '@tanstack/react-router'
import {steamSummary} from "@/lib/api.ts";

export const Route = createFileRoute('/profiles/$steamId')({
    component: ProfilePage,
    loader: async ({params}) => {
        const summaries = await steamSummary(params.steamId)
        if (!summaries || summaries.length !== 1) {
            throw 'Could not load user summary'
        }

        return summaries[0]
    },
})

function ProfilePage() {
    const summary = Route.useLoaderData();

    if (!summary) {
        return <></>
    }

    return (
        <div className="mx-auto max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl bg-[#282c34]">
            <div className="text-center border-amber-300 border-4">
                <img src={`https://avatars.fastly.steamstatic.com/${summary.avatarhash}_full.jpg`} alt="profile image" />
            </div>
            <div className="text-center border-amber-300 border-4">
                <header
                    className=" items-center justify-center bg-[#282c34] text-white text-base">

                    {JSON.stringify(summary, null, 2)}
                </header>
            </div>
        </div>
    )
}
