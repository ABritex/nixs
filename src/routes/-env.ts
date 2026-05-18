import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
    server: {
        SERVER_URL: z.string().url().optional(),
    },
    clientPrefix: 'VITE_',
    client: {
        VITE_APP_TITLE: z.string().min(1).optional(),
        VITE_EMAILJS_SERVICE_ID: z.string().min(1),
        VITE_EMAILJS_TEMPLATE_ID: z.string().min(1),
        VITE_EMAILJS_PUBLIC_KEY: z.string().min(1),
    },
    runtimeEnv: {
        VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
        VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    },
    emptyStringAsUndefined: true,
})