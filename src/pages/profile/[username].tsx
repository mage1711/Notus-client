import React from 'react'
import { useRouter } from 'next/router'
export default function AccountPage(){
    const router = useRouter()
    const { username: username} = router.query
return (
    <div className="flex">
    <p>username</p>
    </div>
);
}