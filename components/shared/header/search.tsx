// import { SearchIcon } from 'lucide-react'
// import { Input } from '@/components/ui/input'

// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select'
// import { APP_NAME } from '@/lib/constants'
// // const categories = ['men', 'women', 'kids', 'accessories']

// import { getAllCategories } from '@/lib/actions/product.actions'
// import { getTranslations } from 'next-intl/server'

// const t = await getTranslations()

// const categories = await getAllCategories()

// export default async function Search() {
//     return (
//         <form
//             action='/search'
//             method='GET'
//             className='flex  items-stretch h-full '
//         >
//             <Select name='category'>
//         <SelectTrigger className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r  rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none  '>
//                     <SelectValue placeholder='All' />
//                 </SelectTrigger>
//                 <SelectContent position='popper'>
//           <SelectItem value='all'>{t('Header.All')}</SelectItem>
//                     {categories.map((category) => (
//                         <SelectItem key={category} value={category}>
//                             {category}
//                         </SelectItem>
//                     ))}
//                 </SelectContent>
//             </Select>
//             <Input
//                 className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-0.5rem '
//         placeholder={t('Header.Search Site', { name })}
//                 name='q'
//                 type='search'
//             />



//             <button
//                 type='submit'
//                 className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-0.5rem px-3 '
//             >
//                 <SearchIcon className='w-6 h-0.5rem' />
//             </button>
//         </form>
//     )
// }

// //import { SearchIcon } from 'lucide-react'
// // import { Input } from '@/components/ui/input'

// // import {
// //     Select,
// //     SelectContent,
// //     SelectItem,
// //     SelectTrigger,
// //     SelectValue,
// // } from '@/components/ui/select'
// // import { APP_NAME } from '@/lib/constants'

// // const categories = ['men', 'women', 'kids', 'accessories']

// // export default async function Search() {
// //     return (
// //         <form
// //             action='/search'
// //             method='GET'
// //             className='flex items-stretch h-full border rounded-md overflow-hidden'
// //         >
// //             {/* Category select */}
// //             <Select name='category'>
// //                 <SelectTrigger className='w-auto border-r border-gray-300 bg-gray-100 text-black rounded-none'>
// //                     <SelectValue placeholder='All' />
// //                 </SelectTrigger>
// //                 <SelectContent position='popper'>
// //                     <SelectItem value='all'>All</SelectItem>
// //                     {categories.map((category) => (
// //                         <SelectItem key={category} value={category}>
// //                             {category}
// //                         </SelectItem>
// //                     ))}
// //                 </SelectContent>
// //             </Select>

// //             {/* Search input */}
// //             <Input
// //                 className="
// //                     flex-1
// //                     border-none
// //                     bg-gray-100 dark:bg-gray-800
// //                     text-black dark:text-white
// //                     px-3 py-2
// //                     rounded-none
// //                     focus:outline-none
// //                     focus:border-primary
// //                 "
// //                 placeholder={`Search Site ${APP_NAME}`}
// //                 name='q'
// //                 type='search'
// //             />

// //             {/* Submit button */}
// //             <button
// //                 type='submit'
// //                 className='bg-primary text-white px-3 flex items-center justify-center'
// //             >
// //                 <SearchIcon className='w-5 h-5' />
// //             </button>
// //         </form>
// //     )
// // }



// import { SearchIcon } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select'
// import { APP_NAME } from '@/lib/constants'
// import { getAllCategories } from '@/lib/actions/product.actions'

// const categories = await getAllCategories()

// export default async function Search() {
//     return (
//         <form
//             action='/search'
//             method='GET'
//             className='flex items-stretch h-full border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden'
//         >
//             {/* Category select */}
//             <Select name='category'>
//                 <SelectTrigger className='w-auto border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'>
//                     <SelectValue placeholder='All' />
//                 </SelectTrigger>
//                 <SelectContent position='popper'>
//                     <SelectItem value='all'>All</SelectItem>
//                     {categories.map((category) => (
//                         <SelectItem key={category} value={category}>
//                             {category}
//                         </SelectItem>
//                     ))}
//                 </SelectContent>
//             </Select>

//             {/* Search input */}
//             <Input
//                 className="
//                     flex-1
//                     border-none
//                     bg-gray-100 dark:bg-gray-800
//                     text-black dark:text-white
//                     px-3 py-2
//                     rounded-none
//                     focus:outline-none
//                     focus:ring-3 focus:ring-primary
//                     focus:border-primary
//                 "
//                 placeholder={`Search Site ${APP_NAME}`}
//                 name='q'
//                 type='search'
//             />

//             {/* Submit button */}
//             <button
//                 type='submit'
//                 className='bg-primary text-primary-foreground dark:text-black px-3 flex items-center justify-center rounded-none'
//             >
//                 <SearchIcon className='w-5 h-5' />
//             </button>
//         </form>
//     )
// }


import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { getAllCategories } from '@/lib/actions/product.actions'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select'
import { getSetting } from '@/lib/actions/setting.actions'
import { getTranslations } from 'next-intl/server'

export default async function Search() {
    const {
        site: { name },
    } = await getSetting()
    const categories = await getAllCategories()

    const t = await getTranslations()
    return (
        <form action='/search' method='GET' className='flex  items-stretch h-10 '>
            <Select name='category'>
                <SelectTrigger className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r  rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none  '>
                    <SelectValue placeholder={t('Header.All')} />
                </SelectTrigger>
                <SelectContent position='popper'>
                    <SelectItem value='all'>{t('Header.All')}</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full'
                placeholder={t('Header.Search Site', { name })}
                name='q'
                type='search'
            />
            <button
                type='submit'
                className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2 '
            >
                <SearchIcon className='w-6 h-6' />
            </button>
        </form>
    )
}