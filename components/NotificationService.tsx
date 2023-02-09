import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

export function errorNotification(title: string, message: string) {
    showNotification({
        title: title,
        message: message,
        autoClose: 4000,
        color: "red",
        icon: <IconX size={18} />,
    });
}

export function normalNotification(title: string, message: string) {
    showNotification({
        title: title,
        message: message,
        autoClose: 4000,
    });
}
