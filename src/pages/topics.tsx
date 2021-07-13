import Axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
  export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
      const res = await Axios.get('/subs')
  
      return { props: { topics: res.data } }
    } catch (err) {
      return { props: { error: 'Something went wrong' } }
    }
  }
  

  export default function Topics({topics}) {

    return (

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Admin
                    </th>
                
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topics.map((topic) => (
                   <Link href={`/topic/${topic.name}`}>   
                    <tr key={topic.name} className="cursor-pointer hover:bg-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <Image className="rounded-full" width="40" height="40"   src="https://res.cloudinary.com/dvmo50ocz/image/upload/v1625165098/sample.jpg" alt="topicimage" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{topic.name}</div>
                          
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{topic.description}</div>
              
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{topic.user.email}</td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                    </Link>
                    
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
    )
  }
