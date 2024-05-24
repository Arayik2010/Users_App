import Box from "@/components/Molecules/Box";
import Link from "next/link";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
    return (
        <div>
            <h1><Skeleton/></h1>
            <h2><Skeleton count={10}/></h2>
            <Link href='#' className='text-blue-600'><Skeleton/></Link>
            <Box >
                <Skeleton/>
            </Box>
        </div>
    )
}