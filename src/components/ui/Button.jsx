import { clsx } from 'clsx'
import { ReactNode } from 'react'

export function Button({ children, className, variant = 'primary', size = 'md', ...props }) {
    return (
        <button
            className={clsx(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                {
                    'bg-lavender-500 text-white hover:bg-lavender-400 h-10 px-6 py-2': variant === 'primary' && size === 'md',
                    'bg-teal text-white hover:bg-opacity-90 h-10 px-6 py-2': variant === 'secondary' && size === 'md',
                    'border border-gray-300 bg-white hover:bg-gray-50 h-10 px-6 py-2': variant === 'outline' && size === 'md',
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}


