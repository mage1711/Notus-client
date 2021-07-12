import PostPreview from "../Components/PostPreview"
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { Post } from '../types'
import useSWR from 'swr'
import fetcher from"swr"
import { useSWRInfinite } from 'swr'
import { useAuthState } from "../context/auth"
import Axios from "axios"
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await Axios.get('/post')

    return { props: { posts: res.data } }
  } catch (err) {
    return { props: { error: 'Something went wrong' } }
  }
}

export default function ServerSide({posts}) {
  const [observedPost, setObservedPost] = useState('')

  // const { data: posts } = useSWR<Post[]>('/post')
  // const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs')
  const description =
    "Notus is a network of communities based on student's interests in academia. Find topics you're interested in, and join the learning experince"
  const title = 'Notus'

  // const { posts } = useSWR('/api/post', fetcher, { initialData: props.posts })
  const { authenticated } = useAuthState()

  // const {
  //   data,
  //   error,
  //   size: page,
  //   setSize: setPage,
  //   isValidating,
  //   revalidate,
  // } = useSWRInfinite<Post[]>((index) => `/post?page=${index}`)

  // const isInitialLoading = !data && !error



  // useEffect(() => {
  //   if (!posts || posts.length === 0) return

  //   const id = posts[posts.length - 1].identifier

  //   if (id !== observedPost) {
  //     setObservedPost(id)
  //     observeElement(document.getElementById(id))
  //   }
  // }, [posts])

  // const observeElement = (element: HTMLElement) => {
  //   if (!element) return
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting === true) {
  //         console.log('Reached bottom of post')
  //         setPage(page + 1)
  //         observer.unobserve(element)
  //       }
  //     },
  //     { threshold: 1 }
  //   )
  //   observer.observe(element)
  // }

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:title" content={title} />
      </Head>

        {/* Posts feed */}
        <div className="p-10 space-y-6">
          {/* {isInitialLoading && <p className="text-lg text-center">Loading..</p>} */}
          {posts?.map((post) => (
            <PostPreview
              post={post}
              key={post.identifier}
          
            />
          ))}
   
          {/* {isValidating && posts.length > 0 && (
            <p className="text-lg text-center">Loading More..</p>
          )} */}
   
      </div>
    </Fragment>
  )
}

