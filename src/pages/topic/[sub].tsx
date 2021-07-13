import { useRouter } from 'next/router'
import useSWR from 'swr'
import PostPreview from '../../Components/PostPreview'

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
            {sub && <div className="p-10 space-y-6">{postsMarkup}</div>}
        </div>
    )
}