import Image from "next/image";
import Link from "next/link";
import HeroImage from '@/public/vivid-blurred-colorful-wallpaper-background.png'
import LogoImage from '@/public/Logo.jpg'
//import FileUploadForm from "@/components/FileUploadForm";
import ContactUs from "@/components/Form/ContactUs";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="flex w-full h-16 p-5 items-center justify-center ">
        <Link href={'#'}>
        <div className="h-32 w-32 flex items-center justify-center">
        
        <Image
        height={LogoImage.height}
        width={LogoImage.width}
        src={LogoImage.src}
        alt="Logo"
        className="mx-auto  aspect-video overflow-hidden  object-contain object-center sm:w-full lg:order-last"

        ></Image>
        </div>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-4 md:py-24 lg:py-12 xl:py-16 text-center md:text-left flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none leading-10 text-green-400" >
                  A monthly inspection is better than regretting your action
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Welcome to DSHinfrared  where we specialize in infrared thermography inspections. Our cutting-edge technology and expert team ensure accurate assessments of your equipment&apos;s condition, helping you maintain peak performance and prevent  costly downtime as well as unfortunate accidents. Trust us to deliver precise insights that safeguard your assets and enhance operational efficiency
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#Form"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-green-500 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                    prefetch={false}
                  >
                    Start Now
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  "
                    prefetch={false}
                  >
                    More..
                  </Link>
                </div>
              </div>
              <div className="flex relative">
                <svg className="hidden md:block  md:absolute -z-50 right-0 left-20 top-20 -translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" className="text-green-200 " fill="currentColor"></rect>
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
                </svg>
              <Image
                
                src={HeroImage.src}
                width={HeroImage.width}
                height={HeroImage.height}
                alt="Hero"
                className="mx-auto rounded-full aspect-video overflow-hidden  object-contain object-center w-5/6 sm:w-full lg:order-last "
              />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 " id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                
                <h2 className="text-3xl font-bold tracking-tighter text-green-300 sm:text-5xl my-4">
                What we Offer?
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12  lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6 md:grid-cols-2 grid-cols-1 text-center md:text-left">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-green-400">Custom Solutions</h3>
                      <p className="text-gray-500 ">
                      we work closely with each client to understand their specific needs 
                      and challenges
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-green-400">Data Analysis</h3>
                      <p className="text-gray-500 ">
                      In addition to simply identifying faults, our company excels at analysing
                      the data collected by infrared cameras to extract valuable insights                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-green-400">Integration</h3>
                      <p className="text-gray-500 ">
                      our infrared technology isn’t just a standalone solution it seamlessly 
                      integrates with our client’s existing systems and workflows
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-green-400">Education and Training</h3>
                      <p className="text-gray-500 ">
                      Recognizing that infrared technology can be complex and intimidating for some clients, our company goes the extra mile to provide comprehensive education and training programs.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              {/*<div className="sm:w-full lg:order-last mx-auto rounded-xl bg-gray-100 p-8 drop-shadow-lg">
              <Image
                src={FeaturesImage.src}
                width={FeaturesImage.width}
                height={FeaturesImage.height}
                alt="Features"
                className="aspect-video overflow-hidden  object-contain object-center"
              />
              </div>
              */}
              
            </div>
          </div>
        </section>
        {/*<section className="flex lg:p-24 md:p-8 p-4  space-y-6 space-x-3">
        <form className="w-full max-w-sm flex flex-col space-y-3">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Jane Doe" aria-label="Full name"/>
          </div>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="JaneDoe@gmail.com" aria-label="Email"/>
          </div>
          
          <div className="flex items-center border-b border-teal-500 py-2 min-h-96">
            <textarea  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  placeholder="Descreption" aria-label="Descreption"/>
          </div>
            <FileUploadForm />
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Contact Us
          </button>
        </form>
        <div className="h-full w-full bg-green-300 ">
        <h2 className="text-3xl font-bold tracking-tighter text-gray-50 sm:text-5xl my-4">
          Get In touch
        </h2>
        </div>
        </section>*/}
        <ContactUs></ContactUs>
        {/*<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 ">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              ابدأ في استغلال قوة بياناتك
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              سجل للحصول على تجربة مجانية واختبر قوة Analytica. لا حاجة لبطاقة ائتمان.
            </p>
          </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="/Dashboard"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                prefetch={false}
              >
                إبدأ الان
              </Link>
              <a
                href="https://Wa.me/+213557373526"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              >تواصل معي </a>
              
            </div>
          </div>
        </section>*/}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-center">
        <p className="text-xs text-gray-500 ">&copy; 2024 <span className=" font-semibold">DSHinfrared</span>. All rights reserved.</p>
      
      </footer>
    </div>
  )
}


/*export default function Home() {
  return ({
    <main className="flex min-h-screen lg:p-24 md:p-8 p-4">
      <FileUploadForm />
    </main>}
    
  );
}
*/