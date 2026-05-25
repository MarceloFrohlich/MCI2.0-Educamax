"use client"

import Image from "next/image"
import trophy from '../../../../public/images/trophy.jpg'
import star from '../../../../public/images/star.jpg'
import other from '../../../../public/images/other.jpg'

const imageMap = {
    trophy,
    star,
    other,
} as const

type ImageKey = keyof typeof imageMap

interface IScore {
    title: string
    number: number
    description: string
    initial: string
    image: ImageKey
}

const Score: React.FC<IScore> = ({ description, initial, number, title, image }) => {
    return (
        <div className="relative w-full h-24 flex items-center gap-10 shadow-xl/20 rounded-4xl overflow-hidden group hover:scale-102 duration-300 bg-[#E3ECF3] hover:bg-[#F0F4F9]">
            <h1 className="text-(--textBaseColor)/25 group-hover:text-(--colorVariantBlue) duration-300 text-8xl font-bold absolute left-5 bottom-1">{number} <span className="text-9xl absolute -bottom-1">)</span></h1>
            <div className="w-20 h-20 ms-36 flex justify-center items-center rounded-full border-4 border-(--textBaseColor)/25 group-hover:border-(--textYellowColor) duration-300 bg-[#D9D9D9]">
                <span className="text-4xl mb-1 text-(--textBaseColor)/50 group-hover:text-(--textYellowColor) duration-300">{initial}</span>
            </div>
            <div className="flex flex-col gap-1 text-(--textBaseColor)/50">
                <p className="font-semibold group-hover:text-(--textYellowColor) duration-300">{title}</p>
                <small className="font-semibold text-(--textBaseColor)/50 duration-300">{description}</small>

            </div>
            <Image src={imageMap[image]} alt="image" className="absolute right-20 opacity-15 group-hover:opacity-100 duration-300" />
        </div>
    )
}

export default Score