import { useRouter } from 'next/router'
import useSWR from 'swr'
import PostPreview from '../../Components/PostPreview'
import Image from 'next/image'
import Link from 'next/link'

export default function Sub() {
    const router = useRouter()

    const subName = router.query.sub

    const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null)

    if (error) router.push('/')

    let postsMarkup
    if (!sub) {
        postsMarkup = <p className="text-lg text-center">Loading..</p>
    } else if (sub.posts.length === 0) {
        postsMarkup = <p className="text-lg text-center">No posts submitted yet</p>
    } else {
       
        postsMarkup = sub.posts.map((post) => (
            <PostPreview key={post.identifier} post={post} />
        ))
    }

    return (
        <div className="">

            {sub && 
            
            <div>
        <Image src = {sub.imageUrn} width="800" height="200" layout="responsive"/>

           
            <div className="text-4xl text-center bg-blue-400"><h1>{sub.name}</h1></div>
            <Link href={`${sub.name}/submit`}>
                <a className="w-32 py-2 mr-4 leading-5 hollow blue button">
                 submit
                </a>
              </Link>
            <div className="p-10 space-y-6"> {postsMarkup}</div></div>}
        </div>
    )
}