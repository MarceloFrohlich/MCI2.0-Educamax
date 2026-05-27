// hooks/useServerAction.ts

'use client';

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IActionResponse {
    success: boolean;
    message: string;
}

const initialState: IActionResponse = {
    success: false,
    message: "",
};

export function useServerAction(
    action: (
        prevState: IActionResponse,
        formData: FormData
    ) => Promise<IActionResponse>
) {

    const router = useRouter();

    const [state, formAction, pending] =
        useActionState(
            action,
            initialState
        );

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            router.refresh();
        }
        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, router]);
    return {
        state,
        formAction,
        pending,
    };
}