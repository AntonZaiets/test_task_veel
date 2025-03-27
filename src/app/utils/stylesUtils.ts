import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: (string | undefined | false)[]) => {
    return twMerge(clsx(args));
};
