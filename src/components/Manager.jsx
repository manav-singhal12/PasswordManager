import React from 'react'
import { useRef, useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {

    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])


    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])


    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passref.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passref.current.type = "text"

        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const savepassword = () => {
        if(form.site.length>5 && form.username.length>4 && form.password.length>7){
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log(passwordArray)
        setform({site:"",username:"",password:""})
        toast('Password Saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator}
        else{
            toast("Error : Password not saved")
        }
    }
    const editpassword =(id) => {
        setform( passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item => item.id!== id))

    }

    const deletepassword = (id) => {
        let c=confirm("Do you really want to delete this password")
        if(c){
        setpasswordArray(passwordArray.filter(item => item.id!== id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))}
        toast('Password Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator

}
    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="md:container bg-purple-200  mx-auto p-5 ">
                <div className="heading">
                    <h1 className='font-bold rounded-2xl text-center text-2xl'>PassMaps</h1>
                    <p className='my-1 text-center'>Your Own password Manager</p>
                </div>
                <div className="inputs ">
                    <input value={form.site} onChange={handlechange} placeholder='Enter Website URL' name='site' className='w-[90%] rounded-xl mx-5 my-3 px-5' type="text" />
                    <div className="twoinput my-5 flex '">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' name='username' className='mx-4 w-[70%] rounded-xl px-5' type="text" />
                        <div className="relative">
                            <input ref={passref} value={form.password} onChange={handlechange} placeholder='Enter Password' name='password' className='mx-5 w-[90%] rounded-xl px-5' type="password" />
                            <span onClick={showPassword} className='absolute bottom-[0.2px] left-[220px] cursor-pointer'>
                                <img ref={ref} className='w-[23px] ' src='icons/eye.png'></img>
                            </span>

                        </div>
                    </div>
                </div>
                <button onClick={savepassword} className='bg-violet-300 rounded-xl text-center mx-80 flex w-[20%] justify-center gap-5 hover:bg-violet-500 border-2 border-violet-500'>
                    <lord-icon className="p-1"
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                    <p className='font-bold p-1 '>Add password</p></button>
            </div>
            <div className="passwords ">
                <h2>Your Passwords</h2>
                {passwordArray.length === 0 && <div>No passwords to display</div>}
                {passwordArray.length !== 0 &&
                    <table class="table-auto rounded-lg overflow-hidden w-3/4 mx-auto">
                        <thead className='bg-green-400 text-whte'>
                            <tr>
                                <th>Site</th>
                                <th>username</th>
                                <th>Passwords</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td><div className='flex justify-between w-full px-10 py-1'><a href={item.site} target='_blank'>{item.site}</a><span onClick={() => { copytext(item.site) }} className='cursor-pointer'><i class="fa-solid fa-copy"></i></span></div></td>
                                    <td><div className='flex justify-between w-full px-10 py-1'><a>{item.site}</a><span onClick={() => { copytext(item.username) }} className='cursor-pointer'><i class="fa-solid fa-copy"></i></span></div></td>
                                    <td><div className='flex justify-between w-full px-12 py-1'><a>{item.site}</a><span onClick={() => { copytext(item.password) }} className='cursor-pointer'><i class="fa-solid fa-copy"></i></span></div></td>
                                    <td><div className="actions flex ">
                                        <div onClick={() => { editpassword(item.id) }} className="edit cursor-pointer"><i class="fa-solid fa-pen-to-square"></i></div>
                                        <div onClick={() => { deletepassword(item.id) }} className="delete cursor-pointer"><lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style={{ "width": "22x", "height": "22px" }}>
                                        </lord-icon></div></div></td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
            </div>
        </div>
    )
}

export default Manager
