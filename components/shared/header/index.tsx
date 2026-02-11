import { getAllCategories } from '@/lib/actions/product.actions'
import data from '@/lib/data'

import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import Search from './search'
import Sidebar from './sidebar'
import { getTranslations } from 'next-intl/server'
const { site } = await getSetting()
const t = await getTranslations()
export default async function Header() {
    const categories = await getAllCategories()

    return (
        <header className='bg-black  text-white'>
            <div className='px-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Link
                            href='/'
                            className='flex items-center header-button font-extrabold text-2xl m-1 '
                        >
                            <Image
                                src={site.logo}
                                width={40}
                                height={40}
                                alt={`${site.name} logo`}
                            />
                            {site.name}
                        </Link>
                    </div>
                    <div className='hidden md:block flex-1 max-w-xl'>
                        <Search />
                    </div>
                    <Menu />
                </div>
                <div className='header-button !p-2 '
                >
                    <Search />
                </div>
            </div>
            <div className='flex items-center px-3 mb-[1px]  bg-gray-800'>
                {/* <Button
                    variant='ghost'
                    className='header-button flex items-center gap-1 text-base [&_svg]:size-6'
                >
                    <MenuIcon />
                    All
                </Button>
                 */}
                {/* <Sidebar categories={getAllCategories} /> */}

                <Sidebar categories={categories} />

                <div className='flex items-center flex-wrap gap-3 overflow-hidden   max-h-[42px]'>
                    {data.headerMenus.map((menu) => (
                        <Link
                            href={menu.href}
                            key={menu.href}
                            className='header-button !p-2'
                        >
                            {/* {menu.name} */}
                            {t('Header.' + menu.name)}

                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}

function getSetting(): { site: any } | PromiseLike<{ site: any }> {
    throw new Error('Function not implemented.')
}
