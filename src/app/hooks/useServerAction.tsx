'use client';

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { IActionResponse } from "../actions/types";


const initialState: IActionResponse = {};

export function useServerAction(
    action: (
        prevState: IActionResponse,
        formData: FormData
    ) => Promise<IActionResponse>
) {
    const isFirstRender = useRef(true);

    const [state, formAction, pending] =
        useActionState<IActionResponse, FormData>(
            action,
            initialState
        );

    useEffect(() => {

        // IGNORA PRIMEIRO RENDER
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (state.success === true && state.successMessage) {
            toast.success(state.success === true && state.successMessage);
        }

        if (state.success === false && state.errorMessage) {
            toast.error(state.success === false && state.errorMessage);
        }

    }, [
        state.success,
        state.successMessage,
        state.errorMessage
    ]);

    return {
        state,
        formAction,
        pending,
    };
}