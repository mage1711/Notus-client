import PostPreview from "../Components/PostPreview"
import Head from 'next/head'
import { Fragment ,useState } from 'react'

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


  const description =
    "Notus is a network of communities based on student's interests in academia. Find topics you're interested in, and join the learning experince"
  const title = 'Notus'

  

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

