"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60,
            },
        },
    }));

    const persister = createAsyncStoragePersister({ storage: AsyncStorage });

    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            {children}
        </PersistQueryClientProvider>
    );
}
