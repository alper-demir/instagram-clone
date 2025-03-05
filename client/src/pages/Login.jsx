import { useEffect, useRef, useState } from 'react'
import screenshot1 from '../assets/images/screenshot1.png'
import screenshot2 from '../assets/images/screenshot2.png'
import screenshot3 from '../assets/images/screenshot3.png'
import screenshot4 from '../assets/images/screenshot4.png'
import brand from '../assets/images/brand.png'
import cover from '../assets/images/cover.png'
import '../assets/css/Homepage.css'
import microsoft from '../assets/images/microsoft.png'
import googleplay from '../assets/images/googleplay.png'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import useToast from "../hooks/useToast"

const Login = () => {

    const ref = useRef()
    const [disabled, setDisabled] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hidden, setHidden] = useState(true)
    const { showToast } = useToast();
    const navigate = useNavigate();
    useEffect(() => {
        let images = ref.current.querySelectorAll('img')
        const length = images.length
        let index = 0

        const imageCover = () => {
            if (index > 0) {
                images[index - 1].classList.add('opacity-0')
            }
            else {
                images[length - 1].classList.add("opacity-0")
            }
            images[index].classList.remove("opacity-0")
            if (index === length - 1) {
                index = 0
            }

            else {
                index++
            }

        }
        imageCover()
        let interval = setInterval(imageCover, 4000)

        return () => {
            clearInterval(interval)
        }

    }, [ref])
    const handleName = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        setDisabled(!(username.length > 0 && password.length > 5));
    }, [username, password]);

    const handleShowButton = () => {
        hidden ? setHidden(false) : setHidden(true)
        const password = document.getElementById("password")
        if (!hidden) {
            password.type = "password"
        }
        else {
            password.type = "text"
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { message, type } = await loginUser({ username, password });
        showToast(message, type);
        type === "success" && navigate("/");
    }

    return (
        <>
            <div className="justify-center flex items-center text center mt-28">
                <div className='flex '>
                    {/* slide */}
                    <div className='relative min-w-[465px] hidden md:block'>
                        <img src={cover} alt="" />
                        <div ref={ref}>
                            <img src={screenshot1} alt="" className='absolute top-[26px] left-[155px] transition-opacity ease-linear duration-700 opacity-0' />
                            <img src={screenshot2} alt="" className='absolute top-[26px] left-[155px] transition-opacity ease-linear duration-700 opacity-0' />
                            <img src={screenshot3} alt="" className='absolute top-[26px] left-[155px] transition-opacity ease-linear duration-700 opacity-0' />
                            <img src={screenshot4} alt="" className='absolute top-[26px] left-[155px] transition-opacity ease-linear duration-700 opacity-0' />
                        </div>
                    </div>
                    {/* form */}
                    <div className='text-center'>
                        <div className='border px-10 pt-12 pb-10'>
                            <img src={brand} alt="" className='w-48 mx-auto' />
                            <form className='flex flex-col mt-10'>
                                <label className='relative'>
                                    <input type="text" name='name' onChange={handleName} required className='pt-3 peer' />
                                    <small className='absolute top-[0.60rem] left-1 text-xs pl-[0.4rem] peer-valid:text-[0.65rem] peer-valid:top-0 peer-valid:left-0 peer-valid: transition-all text-[#A8A0A0]'>Telefon numarası, kullanıcı adı veya e-posta</small>
                                </label>
                                <label className='relative'>
                                    <input type="password" name='password' id='password' className='w-64 peer pt-3' onChange={handlePassword} required />
                                    <small className='absolute top-[0.60rem] left-1 text-xs pl-[0.4rem] peer-valid:text-[0.65rem] peer-valid:top-0 peer-valid:left-0 peer-valid: transition-all text-[#A8A0A0]'>Şifre</small>
                                    {
                                        password &&
                                        <button type='button' onClick={handleShowButton} className='absolute right-2 top-2 text-sm text-[#262626] hover:text-[#A8A0A0]'>{hidden ? <>Göster</> : <>Gizle</>}</button>
                                    }
                                </label>
                                {
                                    disabled ? (
                                        <button type='submit' disabled className='text-white bg-[#4DB5F9] rounded-lg py-1 my-1'>Giriş yap</button>
                                    ) : (
                                        <button type='button' onClick={handleLogin} className='text-white bg-[#4DB5F9] hover:bg-[#1877F2] rounded-lg py-1 my-1 cursor-pointer'>Giriş yap</button>
                                    )
                                }

                                <div className='flex justify-between items-center mt-3'>
                                    <div className='line'></div>
                                    <p className='mx-2 text-[#8E8E8E] text-sm'>YA DA</p>
                                    <div className='line'></div>
                                </div>

                                <button className="faceboook mt-6 flex justify-center items-center">
                                    <i className="fa-brands fa-square-facebook text-[#262665]  text-lg"></i>
                                    <a href='/' className='text-[#385185] text-sm ml-2'>Facebook ile Giriş Yap</a>
                                </button>

                                <div className='mt-3'>
                                    <a href='/' className='text-xs text-[#385185]'>Şifreni mi unuttun?</a>
                                </div>
                            </form>
                        </div>

                        <div className='border h-16 flex justify-center items-center mt-2'>
                            <span className='text-sm'>Hesabın yok mu? <Link to="/register" className='text-sky-600'>Kaydol</Link></span>
                        </div>

                        <div className='mt-3'>
                            <span className='text-sm'>Uygulamayı indir.</span>
                        </div>

                        <div className='flex justify-center mt-3'>
                            <a href="https://play.google.com/store/apps/details?id=com.instagram.android" target="blank"><img src={googleplay} alt="" className='h-10 mr-1' /></a>
                            <a href="/" target="blank"><img src={microsoft} alt="" className='h-10 mr-1' /></a>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    )

}

export default Login