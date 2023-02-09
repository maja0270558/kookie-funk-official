import { errorNotification } from "../components/NotificationService";
export default function createFetcher(url: string, arg?: any) {
    let fetcher: Promise<Response>;
    if (arg) {
        fetcher = fetch(url, {
            method: "POST",
            body: arg,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        fetcher = fetch(url);
    }
    return fetcher
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                errorNotification("Error", data.error);
            }
            return data;
        })
        .catch((e) => {
            errorNotification("Error", "unknowed error");
        });
}
