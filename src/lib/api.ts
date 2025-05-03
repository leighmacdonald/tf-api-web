import type { paths } from '@/schema.ts';
import createClient from 'openapi-fetch';

const client = createClient<paths>({
    baseUrl: import.meta.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8888'
});

export const resolveSteamID = async (query: string) => {
    const { data, error } = await client.GET('/api/steam/steamid', {
        params: {
            query: {
                steamid: query
            }
        }
    });
    if (error) {
        throw error;
    }

    return data;
};

export const steamSummary = async (query: string) => {
    const { data, error } = await client.GET('/api/steam/summary', {
        params: {
            query: {
                steamids: query
            }
        }
    });
    if (error) {
        throw error;
    }

    return data;
};
export const steamFriends = async (query: string) => {
    const { data, error } = await client.GET('/api/steam/friends', {
        params: {
            query: {
                steamid: query
            }
        }
    });
    if (error) {
        throw error;
    }

    return data;
};


export const sourcebansEntries = async (steamid: string) => {
    const { data, error } = await client.GET(`/api/sourcebans/{steamid}`, {
        params: {
            path: {
                steamid: steamid
            }
        }
    });
    if (error) {
        throw error;
    }

    return data;
};

export const bdEntries = async (steamid: string) => {
    const { data, error } = await client.GET(`/api/bd/query`, {
        params: {
            query: {
                steamids: steamid
            }
        }
    });
    if (error) {
        throw error;
    }

    return data;
};
