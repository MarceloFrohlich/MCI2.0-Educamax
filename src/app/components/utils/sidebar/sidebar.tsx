'use client'

import dashboard from '../../../../../public/sidebar/dashboard.png'
import centralMCI from '../../../../..//public/sidebar/centralMCI.png'
import indicadores from '../../../../../public/sidebar/indicadores.png'
import scoreboard from '../../../../../public/sidebar/scoreboard.png'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CadastroCollapse from './cadastroCollapse'
import ReuniaoCollapse from './reuniaoCollapse'
import { canAccess } from '../../../utils/permissoes'
import { ISessao } from '../../../types/auth/auth'

const Sidebar: React.FC<{ sessao: ISessao | null }> = ({ sessao }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const pathname = usePathname()

    const links = [
        {
            label: 'Dashboard',
            href: '/pages',
            image: dashboard,
            alt: 'dashboard',
        },
        {
            label: 'Central MCI',
            href: '/pages/centralmci',
            image: centralMCI,
            alt: 'centralMCI',
        },
        {
            label: 'Atualização Semanal',
            href: '/pages/atualizacao',
            image: indicadores,
            alt: 'indicadores',
        },
        {
            label: 'Reunião MCI',
            href: '/pages/reuniaomci',
            image: scoreboard,
            alt: 'scoreboard',
        },
    ]

    return (
        <aside className='text-(--textBaseColor)'

        >
            <nav className={`
                    rounded-2xl
                    fixed
                    z-9999
                    flex
                    flex-col
                    bg-[#E3ECF3]
                    ms-5
                    py-2
                    shadow-lg
                    ${isExpanded ? 'w-52' : 'w-10'}
                    transition-[width]
                    duration-300
                    top-30
                    ease-in-out`

            }
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                <ul>
                    <CadastroCollapse isExpanded={isExpanded} sessao={sessao} />
                    {links.filter(link => canAccess(link.href, sessao)).map(link => {

                        const active =
                            pathname === link.href ||
                            pathname === `${link.href}/`

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className='relative flex h-9 gap-2 items-center'
                            >
                                {active && (
                                    <div
                                        className="
                                            absolute
                                            left-0
                                            top-1/2
                                            h-5
                                            w-1
                                            -translate-y-1/2
                                            rounded-r-full
                                            bg-[#5D78B7]
                                        "
                                    />
                                )}

                                <Image src={link.image} alt={link.alt} width={40} height={40} className='shrink-0' />
                                <p className={`
                                    whitespace-nowrap
                                    hover:scale-110
                                    transition-all
                                    duration-300
                                    ease-in-out
                                    ${active ? 'text-[#5D78B7]' : ''}
                                    ${isExpanded
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-2 pointer-events-none'}
                                `}>{link.label}</p>
                            </Link>
                        )
                    })}
                    <ReuniaoCollapse isExpanded={isExpanded} />

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
