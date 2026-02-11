// import CartButton from './cart-button'
// import UserButton from './user-button'
// import { EllipsisVertical } from 'lucide-react'
// import {
//     Sheet,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from '@/components/ui/sheet'
// import ThemeSwitcher from './theme-switcher'
// // 
// const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {
//     return (
//         <div className='flex justify-end'>
//             <nav className='md:flex gap-3 hidden w-full'>
//                 <ThemeSwitcher />
//                 {forAdmin ? null : <CartButton />}

//             </nav>
//             <nav className='md:hidden'>
//                 <Sheet>
//                     <SheetTrigger className='align-middle header-button'>
//                         <EllipsisVertical className='h-6 w-6' />
//                     </SheetTrigger>
//                     <SheetContent className='bg-black text-white  flex flex-col items-start  '>
//                         <SheetHeader className='w-full'>
//                             <div className='flex items-center justify-between '>
//                                 <SheetTitle>Site Menu</SheetTitle>
//                                 <SheetDescription></SheetDescription>
//                             </div>
//                         </SheetHeader>
//                         <ThemeSwitcher />
//                         <UserButton />
//                         <CartButton />
//                     </SheetContent>
//                 </Sheet>
//             </nav>
//         </div>
//     )
// }
// export default Menu

import CartButton from './cart-button'
import { EllipsisVertical } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import ThemeSwitcher from './theme-switcher'
import UserButton from './user-button'
import LanguageSwitcher from './language-switcher'
import { useTranslations } from 'next-intl'
const t = useTranslations()
const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {

    // export default function Menu() {
    return (
        <div className='flex justify-end'>
            <nav className='hidden md:flex gap-3  w-full'>
                <LanguageSwitcher />

                <ThemeSwitcher />
                <UserButton />

                {/* <CartButton /> */}
                {forAdmin ? null : <CartButton />}

            </nav>
            <nav className='md:hidden'>
                <Sheet>
                    <SheetTrigger className='align-middle header-button'>
                        <EllipsisVertical className='h-6 w-6' />
                    </SheetTrigger>
                    <SheetContent className='bg-black text-white  flex flex-col items-start  '>
                        <SheetHeader className='w-full'>
                            <div className='flex items-center justify-between '>
                                <SheetTitle className='  '>{t('Header.Site Menu')}</SheetTitle>
                                <LanguageSwitcher />
                                <SheetDescription>

                                </SheetDescription>
                            </div>
                        </SheetHeader>
                        <LanguageSwitcher />

                        <ThemeSwitcher />
                        <UserButton />
                        <CartButton />
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}


export default Menu