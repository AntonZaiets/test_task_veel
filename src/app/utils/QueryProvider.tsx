"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 60,
            },
        },
    }));

    const persister = createSyncStoragePersister({ storage: window.localStorage });

    persistQueryClient({
        queryClient,
        persister,
    });

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

