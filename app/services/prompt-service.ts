export const generateStory = async (prompt: string): Promise<string[]> => {
    try {

        //API URL as per stage local or production
        const apiURL = window.location.hostname === 'localhost'
        ? 'http://localhost:4000/generate'
        : 'https://storyspark-api.vercel.app/generate';

        const res = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({prompt}),
        });

        if (!res.ok) {
            throw new Error("Failed to fetch response");
        }

        const data = await res.json();
        return data.responses || [];

    } catch (error) {
        console.error(error);
        throw new Error("Error response");
    }
};

export const generateStoryImage = async (prompt: string): Promise<string> => {
    try {

        //API URL as per stage local or production
        const apiURL = window.location.hostname === 'localhost'
        ? 'http://localhost:4000/'
        : 'https://storyspark-api.vercel.app/';

        const res = await fetch(apiURL+'image', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({prompt}),
        });

        if (!res.ok) {
            throw new Error("Failed to fetch response");
        }

        const data = await res.json();
        console.log(data)
        return data || [];

    } catch (error) {
        console.error(error);
        throw new Error("Error response");
    }
};