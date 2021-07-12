import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // gets activation code from url
  console.log(router.asPath.substring(12))
  // router.replace()

  return <div>Activation Page!</div>
}

export default MyApp
