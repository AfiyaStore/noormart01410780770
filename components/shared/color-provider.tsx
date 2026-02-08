// 'use client'

// import * as React from 'react'
// import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
// import useColorStore from '@/hooks/use-color-store'
// export function ColorProvider({
//     children,
//     ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//     const { theme } = useTheme()
//     const { color, updateCssVariables } = useColorStore(theme)
//     React.useEffect(() => {
//         updateCssVariables()
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [theme, color])

//     return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const { theme } = useTheme()
    const { color, updateCssVariables } = useColorStore(theme)

    // ✅ Trigger update whenever theme OR color.name changes
    React.useEffect(() => {
        updateCssVariables()
        console.log('Applying color:', color.name, color)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, color.name])

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
