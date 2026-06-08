'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CiUser } from 'react-icons/ci'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '../../../../components/ui/accordion'
import { GoArrowRight } from 'react-icons/go'

const CadastroCollapse: React.FC<{
    isExpanded: boolean
}> = ({ isExpanded }) => {

    const pathname = usePathname()

    const items = [
        {
            label: 'Usuários',
            href: '/pages/cadastros/usuarios',
        },
        {
            label: 'Franqueadora',
            href: '/pages/cadastros/franqueadoras',
        },
        {
            label: 'Filiais',
            href: '/pages/cadastros/filiais',
        },
        {
            label: 'Departamento',
            href: '/pages/cadastros/departamentos',
        },
    ]

    const isActive = items.some(
        item => pathname === item.href
    )

    return (

        <Accordion
            type="single"
            collapsible
            className="w-full hover:cursor-pointer"
        >

            <AccordionItem
                value="cadastro"
                className="border-none! shadow-none!"
            >

                <div
                    className="
                        group
                        ms-0.5
                        relative
                        flex
                        min-h-9
                        items-center
                        gap-2
                        rounded-lg
                        px-2
                        transition-colors
                        hover:cursor-pointer
                    "
                >

                    {isActive && (

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

                    <CiUser
                        className={`
                            size-5
                            shrink-0
                            transition-colors
                            ${isActive
                                ? 'text-[#5D78B7]'
                                : 'text-(--textBaseColor)'
                            }
                        `}
                    />

                    <AccordionTrigger
                        className={`
                            flex-1
                            overflow-hidden
                            py-0
                            transition-all
                            duration-300
                            hover:no-underline
                            hover:scale-105
                            [&>svg]:size-4
                            [&>svg]:shrink-0
                            [&>svg]:text-(--textBaseColor)
                            [&>svg]:transition-transform
                            ${isExpanded
                                ? 'max-w-50 ms-2.5 opacity-100'
                                : 'pointer-events-none max-w-0 opacity-0'
                            }
                        `}
                    >

                        <p
                            className={`
                                whitespace-nowrap
                                text-[15px]
                                transition-colors
                                ${isActive
                                    ? 'text-[#5D78B7]'
                                    : 'text-(--textBaseColor)'
                                }
                            `}
                        >
                            Cadastro
                        </p>

                    </AccordionTrigger>

                </div>

                {isExpanded && (

                    <AccordionContent
                        className="
                            flex
                            flex-col
                            gap-1
                            pl-4
                            pt-1
                        "
                    >

                        {items.map(item => {

                            const active =
                                pathname === item.href

                            return (

                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="
                                        group
                                        relative
                                        flex
                                        h-7
                                        items-center
                                        rounded-lg
                                        px-2
                                        text-[13px]
                                    "
                                >

                                    {active && (

                                        <div
                                            className="
                                                absolute
                                                left-0
                                                top-1/2
                                                h-4
                                                w-1
                                                -translate-y-1/2
                                                rounded-r-full
                                                bg-[#5D78B7]
                                            "
                                        />

                                    )}

                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            transition-all
                                            duration-300
                                            transform-gpu
                                            group-hover:translate-x-1
                                            ${active
                                                ? 'text-[#5D78B7]'
                                                : 'text-(--textBaseColor)'
                                            }
                                        `}
                                    >

                                        <GoArrowRight
                                            className="
                                                transition-all
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />

                                        <span>
                                            {item.label}
                                        </span>

                                    </div>

                                </Link>

                            )

                        })}

                    </AccordionContent>

                )}

            </AccordionItem>

        </Accordion>

    )

}

export default CadastroCollapse