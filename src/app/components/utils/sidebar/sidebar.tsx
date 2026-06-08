import dashboard from '../../../../../public/sidebar/dashboard.png'
import centralMCI from '../../../../..//public/sidebar/centralMCI.png'
import compromissos from '../../../../../public/sidebar/compromissos.png'
import indicadores from '../../../../../public/sidebar/indicadores.png'
import reunioes from '../../../../../public/sidebar/reunioes.png'
import relatorios from '../../../../../public/sidebar/relatorios.png'
import scoreboard from '../../../../../public/sidebar/scoreboard.png'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import CadastroCollapse from './cadastroCollapse'

const Sidebar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
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
                    <CadastroCollapse isExpanded={isExpanded} />
                    <Link href="/pages/" className='flex h-9 gap-2 items-center'>
                        <Image src={dashboard} alt='dashboard' width={40} height={40} className='shrink-0' />
                        <p className={`
                            whitespace-nowrap
                            hover:scale-110
                            transition-all
                            duration-300
                            ease-in-out
                            ${isExpanded
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 pointer-events-none'}
                            `}>Dashboard</p>
                    </Link>
                    <Link href="/pages/centralmci" className='flex h-9 gap-2 items-center'>
                        <Image src={centralMCI} alt='centralMCI' width={40} height={40} className='shrink-0' />
                        <p className={`
                            whitespace-nowrap
                            hover:scale-110
                            transition-all
                            duration-300
                            ease-in-out
                            ${isExpanded
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 pointer-events-none'}
                        `}>Central MCI</p>
                    </Link>
                    <Link href="/pages/atualizacao" className='flex h-9 gap-2 items-center'>
                        <Image src={indicadores} alt='indicadores' width={40} height={40} className='shrink-0' />
                        <p className={`
                            whitespace-nowrap
                            hover:scale-110
                            transition-all
                            duration-300
                            ease-in-out
                            ${isExpanded
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 pointer-events-none'}
                        `}>Atualização Semanal</p>
                    </Link>
                    <Link href="/pages/reuniaomci" className='flex h-9 gap-2 items-center'>
                        <Image src={scoreboard} alt='scoreboard' width={40} height={40} className='shrink-0' />
                        <p className={`
                            whitespace-nowrap
                            hover:scale-110
                            transition-all
                            duration-300
                            ease-in-out
                            ${isExpanded
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 pointer-events-none'}
                        `}>Reunião MCI</p>
                    </Link>
                    <Link href="/pages/reunioes" className='flex h-9 gap-2 items-center'>
                        <Image src={reunioes} alt='reunioes' width={40} height={40} className='shrink-0' />
                        <p className={`
                            whitespace-nowrap
                            hover:scale-110
                            transition-all
                            duration-300
                            ease-in-out
                            ${isExpanded
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 pointer-events-none'}
                        `}>Reuniões</p>
                    </Link>
                    <Link href="/pages/compromissos" className='flex h-9 gap-2 items-center'>
                        <Image src={compromissos} alt='compromissos' width={40} height={40} className='shrink-0' />
                        <p className={`
                            whitespace-nowrap
                            hover:scale-110
                            transition-all
                            duration-300
                            ease-in-out
                            ${isExpanded
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 pointer-events-none'}
                        `}>Compromissos</p>
                    </Link>
                    <Link href="/pages/relatorios" className='flex h-9 gap-2 items-center'>
                        <Image src={relatorios} alt='relatorios' width={40} height={40} className='shrink-0' />
                        <p className={`
                            whitespace-nowrap
                            hover:scale-110
                            transition-all
                            duration-300
                            ease-in-out
                            ${isExpanded
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 pointer-events-none'}
                        `}>Relatórios</p>
                    </Link>

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar