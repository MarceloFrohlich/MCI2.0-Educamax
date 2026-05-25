'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CiUser } from 'react-icons/ci'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../components/ui/accordion'
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
            className="w-full"
        >

            <AccordionItem
                value="cadastro"
                className="border-none! shadow-none!"
            >

                <div
                    className={`
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
                    `}
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
                            shrink-0
                            size-5
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
                            py-0
                            overflow-hidden
                            transition-all
                            duration-300
                            hover:no-underline
                            [&>svg]:size-4
                            [&>svg]:shrink-0
                            [&>svg]:text-(--textBaseColor)
                            [&>svg]:transition-transform
                            ${isExpanded
                                ? 'opacity-100 max-w-50 ms-2.5'
                                : 'opacity-0 max-w-0 pointer-events-none'
                            }
                            `}
                    >

                        <p
                            className={`
                                    text-[14px]
                                    whitespace-nowrap
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
                                    className={`
                                        group
                                        relative
                                        flex
                                        h-7
                                        items-center
                                        rounded-lg
                                        px-2
                                        text-[13px]
                                        transition-colors
                                    `}
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

                                    <span
                                        className={`
                                            transition-colors
                                            ${active
                                                ? 'text-[#5D78B7]'
                                                : 'text-(--textBaseColor)'
                                            }
                                        `}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <GoArrowRight /> {item.label}
                                        </div>
                                    </span>

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