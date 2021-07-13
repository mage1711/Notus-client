
import { Fragment, useEffect, useState } from 'react'
import { Sub } from '../types'
import { useAuthState, useAuthDispatch } from '../context/auth'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Topics', href: 'topics', current: false },
  { name: 'popular', href: '#', current: false },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ResponsiveNavBar: React.FC = () => {
    const [name, setName] = useState('')
    const [subs, setSubs] = useState<Sub[]>([])
    const [timer, setTimer] = useState(null)
    const { authenticated, loading } = useAuthState()
    const dispatch = useAuthDispatch()
    const router = useRouter()
    const logout = () => {
        Axios.get('/user/logout')
          .then(() => {
            dispatch('LOGOUT')
            window.location.reload()
          })
          .catch((err) => console.log(err))
      }

    const searchSubs = async () => {
        clearTimeout(timer)
        setTimer(
          setTimeout(async () => {
            try {
              const { data } = await Axios.get(`/subs/search/${name}`)
              setSubs(data)
              console.log(data)
            } catch (err) {
              console.log(err)
            }
          }, 250)
        )
      }

    useEffect(() => {
        if (name.trim() === '') {
          setSubs([])
          return
        }
        searchSubs()
      }, [name])
      const goToSub = (subName: string) => {
        router.push(`/topic/${subName}`)
        setName('')
      }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                <span className="hidden text-2xl font-semibold text-white font-pacifico lg:flex">
          <Link href="/">Notus</Link>
        </span>
    {/*search bar */}
    <div className="max-w-full px-4 lg:w-160 w-80">
        <div className="relative flex items-center bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search "></i>
          <input
            type="text"
            className="py-1 pr-3 bg-transparent rounded focus:outline-none"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            className="absolute left-0 right-0 bg-white"
            style={{ top: '100%' }}
          >
            {subs?.map((sub) => (
              <div
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200"
                onClick={() => goToSub(sub.name)}
                key={sub.name}
              >
    
                <div className="ml-4 text-sm">
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-gray-600">{sub.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    {/*search bar */}
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          {authenticated ? (
                          <Image
                            className="rounded-full"
                            width="32"
                            height="32"
                            src="https://res.cloudinary.com/dvmo50ocz/image/upload/v1626043116/qgryqchfnru1ulgpx7m4.png"
                            alt="user"
                          />
                             ) : (
                                <Image
                                className="rounded-full "
                                width="32"
                                height="32"
                                src="https://res.cloudinary.com/dvmo50ocz/image/upload/v1625165098/sample.jpg"
                                alt="user"
                              />
                              )}
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                                    (authenticated ? (
                                <Link href="/login">
                              <a
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                              your profile
                              </a>
                              </Link>
                              ) : (
                                <Link href="/login">
                                <a
                                
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                         Sign in
                              </a>
                              </Link>
                              )
                            ))}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                             (authenticated ? (
                           
                                <Link href="/login"  >
                              <a
                              onClick={logout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                             Sign out
                              </a>
                              </Link>
                     
                              ) : (
                                <Link href="/register">
                                <a
                                
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                        Register
                              </a>
                              </Link>
                              )
                            ))}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default ResponsiveNavBar