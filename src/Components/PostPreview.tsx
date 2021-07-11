
import Link from 'next/link'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from  'classNames'
import { Post } from '../types'
import Axios from 'axios'
import ActionButton from './ActionButton'
import { useRouter } from 'next/router'
import { useAuthState } from '../context/auth'
import Image from 'next/image'
{/* <div className=""><img className="w-24 rounded md:rounded-lg" src="https://images.pexels.com/photos/4558743/pexels-photo-4558743.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/></div> */ }
dayjs.extend(relativeTime)


interface PostPreviewProps {
  post: Post
  revalidate?: Function
}
export default function PostPreview({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
    mediaLink,
    bodyPreview,
  },
  revalidate,
}: PostPreviewProps) {
  const { authenticated } = useAuthState()

  const router = useRouter()

  const isInSubPage = router.pathname === '/topic/[sub]' 

  const vote = async (value: number) => {
    if (!authenticated) router.push('/login')

    if (value === userVote) value = 0

    try {
      const res = await Axios.post('/vote', {
        identifier,
        slug,
        value,
      })

      if (revalidate) revalidate()

      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }


  return (

  //   <div
  //     key={identifier}
  //     className="flex mb-4 bg-white rounded"
  //     id={identifier}
  //   >

  //     {/* Vote section */}
  //     <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
  //       {/* Upvote */}
  //       <div
  //         className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
  //         onClick={() => vote(1)}
  //       >
  //         <i
  //           className={classNames('fas fa-arrow-up', {
  //             'text-red-500': userVote === 1,
  //           })}
  //         ></i>
  //       </div>
  //       <p className="text-xs font-bold">{voteScore}</p>
  //       {/* Downvote */}
  //       <div
  //         className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
  //         onClick={() => vote(-1)}
  //       >
  //         <i
  //           className={classNames('fas fa-arrow-down', {
  //             'text-blue-600': userVote === -1,
  //           })}
  //         ></i>
  //       </div>
  //     </div>
  //     <div className="">
  //     <Image
  //   src="https://res.cloudinary.com/dvmo50ocz/image/upload/v1625165098/sample.jpg"
  //   alt="post image"
  //   width={100}
  //   height={150}
  // />
  //       </div>
  //     {/* Post data section */}
  //     <div className="w-full p-2">
  //       <div className="flex items-center">
  //         {/* <Link href={`/topic/${subName}`}>
  //           <img
  //             src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
  //             className="w-6 h-6 mr-1 rounded-full cursor-pointer"
  //           />
  //         </Link> */}
  //         <Link href={`/topic/${subName}`}>
  //           <a className="text-xs font-bold cursor-pointer hover:underline">
  //             /topic/{subName}
  //           </a>
  //         </Link>
  //         <p className="text-xs text-gray-500">
  //           <span className="mx-1">•</span>
  //           Posted by
  //           <Link href={`/u/${username}`}>
  //             <a className="mx-1 hover:underline">/u/{username}</a>
  //           </Link>
  //           <Link href={url}>
  //             <a className="mx-1 hover:underline">
  //               {dayjs(createdAt).fromNow()}
  //             </a>
  //           </Link>
  //         </p>
  //       </div>
  //       <Link href={url}>
  //         <a className="my-1 text-lg font-medium">{title}</a>
  //       </Link>
  //       {body && <p className="my-1 text-sm">{body}</p>}

  //       <div className="flex">
  //         <Link href={url}>
  //           <a>
  //             <ActionButton>
  //               <i className="mr-1 fas fa-comment-alt fa-xs"></i>
  //               <span className="font-bold">{commentCount} Comments</span>
  //             </ActionButton>
  //           </a>
  //         </Link>
  //         <ActionButton>
  //           <i className="mr-1 fas fa-share fa-xs"></i>
  //           <span className="font-bold">Share</span>
  //         </ActionButton>
  //         <ActionButton>
  //           <i className="mr-1 fas fa-bookmark fa-xs"></i>
  //           <span className="font-bold">Save</span>
  //         </ActionButton>
  //       </div>
  //     </div>

  //   </div>

<div className="w-full lg:max-w-full lg:flex"  key={identifier}  id={identifier}>

<div className="w-6 h-full py-3 text-center rounded-l lg:w-12 bg-gray-50 ">

<div
   className="text-gray-400 cursor-pointer hover:bg-gray-300 hover:text-red-500"
   onClick={() => vote(1)}
 >
   <i
     className={classNames('fas fa-arrow-up', {
       'text-red-500': userVote === 1,
     })}
    ></i>
 </div>
 <p className="text-xs font-bold">{voteScore}</p>

 <div
   className="text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
   onClick={() => vote(-1)}
 >
   <i
     className={classNames('fas fa-arrow-down', {
       'text-blue-600': userVote === -1,
     })}
   ></i>
 </div>
</div>
      
      <div className="flex-none h-48 overflow-hidden text-center bg-cover rounded-t lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l" title="Post Image">


        <Image src={mediaLink}
  width={16}
  height={16}
  layout="responsive"

 />



      </div>
      <div className="flex flex-col justify-between p-4 leading-normal bg-white border-b border-l border-r border-gray-400 rounded-b lg:border-l-0 lg:border-t lg:border-gray-400 lg:rounded-b-none lg:rounded-r">
        <div className="mb-8">
         
     
           <Link href={`/topic/${subName}`}>
           <p className="flex items-center text-sm text-gray-600 cursor-pointer hover:underline"> /topic/{subName}</p>

           </Link>
  
          <Link href={url}>
          <div className="mb-2 text-xl font-bold text-gray-900 cursor-pointer">{title}</div>
          </Link>
          <p className="text-base text-gray-700">{body}</p>
        </div>
        <div className="flex items-center">
          {/* <img className="w-10 h-10 mr-4 rounded-full" src="https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/properties/spongebob-squarepants/characters/spongebob-character-web-desktop.png?height=0&width=480&matte=true&crop=false" alt="Avatar of Writer"/> */}
          <div className="text-sm">
            <p className="leading-none text-gray-900">{username}</p>
            <p className="text-gray-600">{dayjs(createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}