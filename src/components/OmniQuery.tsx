import { useState } from 'react';
import { FieldInfo } from '@/components/FieldInfo.tsx';
import { InlineCodeBlock } from '@/components/InlineCodeBlock.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resolveSteamID } from '@/lib/api.ts';
import { ID } from '@node-steam/id';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';

interface OmniQueryValues {
    query: string;
}

const defaultQuery: OmniQueryValues = {
    query: 'https://steamcommunity.com/id/b4nny/'
}; // 76561197970669109

const regexSteamVanityURL = new RegExp('^https:\\/\\/steamcommunity.com\\/id\\/([abcdefghijklmnopqrstuvwxyz0-9]{2,})');
const regexSteamProfileURL = new RegExp('^https:\/\/steamcommunity.com\/profiles\/(\\d+)');

const findSteamID = async (query: string) => {
    if (query === '') {
        return '';
    }
    try {
        const sid = new ID(query);
        if (sid.isValid()) {
            if (sid.isLobby() || sid.isGroupChat()) {
                throw 'Invalid account type';
            }

            return sid.toString();
        }
    } catch (e: unknown) {
        if (String(e).includes('Invalid account type')) {
            throw e;
        }
    }

    const idProfile = regexSteamProfileURL.exec(query);
    if (idProfile) {
        const profileID = new ID(   idProfile[1]);
        if (profileID.isLobby() || profileID.isGroupChat()) {
            throw 'Invalid account type';
        }

        return profileID.toString();
    }

    const idVanity = regexSteamVanityURL.exec(query);
    if (idVanity && idVanity[1]) {
        const resolved = await resolveSteamID(idVanity[1]);
        if (resolved && resolved.steam64) {
            return resolved.steam64;
        }
    }

    throw 'Invalid steam id';
};

export const OmniQuery = () => {
    const [results, setResults] = useState<string>('');
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: defaultQuery,
        onSubmit: async (values) => {
            try {
                if (!values.value) {
                    return;
                }

                const steamID = await findSteamID(values.value.query);
                if (!steamID) {
                    return;
                }

                await navigate({
                    to: '/profiles/$steamId',
                    params: { steamId: steamID }
                });
            } catch (e) {
                setResults(JSON.stringify(e as any));
            }
        }
    });

    return (
        <>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await form.handleSubmit();
                }}
            >
                <div className="flex w-full max-w-xl items-center space-x-2">
                    <form.Field
                        name={'query'}
                        validators={{
                            onChange: ({ value }) => {
                                if (!value) {
                                    return 'A value is required';
                                }
                                if (value.length < 2) {
                                    return '2 characters minimum';
                                }

                                const lvalue = value.toLowerCase();

                                if (lvalue.startsWith('')) {
                                    if (!/[abcdefghijklmnopqrstuvwxyz]{2,}/.test(value)) {
                                    }

                                    return undefined;
                                }
                            }
                        }}
                        children={(field) => {
                            return (
                                <>
                                    <Input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        type="query"
                                        placeholder="steamid"
                                    />
                                    <FieldInfo field={field} />
                                </>
                            );
                        }}
                    />

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <>
                                <Button type="submit" disabled={!canSubmit}>
                                    {isSubmitting ? '...' : 'Kritz'}
                                </Button>
                            </>
                        )}
                    />
                </div>
                <InlineCodeBlock>{results}</InlineCodeBlock>
            </form>
        </>
    );
};
