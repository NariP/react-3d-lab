import '@tanstack/react-query';
import type { ErrorRes } from '@/libs/axios/axios.types';

declare module '@tanstack/react-query' {
    type Meta = {
        errorMessage?: string;
        skipError: boolean;
    };

    interface Register {
        defaultError: ErrorRes;
        queryMeta: Meta;
        mutationMeta: Meta;
    }
}
