import { FC } from 'react'

const Footer:FC = () => {
  return (
    <footer className='flex items-center gap-2 h-16 px-5 py-3 bg-blueLight'>
      <p className='text-lg'>Developed by Ihor vynohradnyi &copy;</p>
      <a href="https://github.com/tonykrapatony/">
        <img src={`${import.meta.env.BASE_URL}/assets/images/github_icon.png`} alt="github icon" width={35}/>
      </a>
      <a href="https://www.linkedin.com/in/ihor-vynohradnyi-b97b37153/">
        <img src={`${import.meta.env.BASE_URL}/assets/images/linkedin_icon.png`} alt="github icon" width={40}/>
      </a>
    </footer>
  )
}

export default Footer