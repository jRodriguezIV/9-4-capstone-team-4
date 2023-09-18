import React, { useEffect } from "react";
import video1 from "../../assets/LandingPageVideo.mp4";
import video2 from "../../assets/Page2_WebPage_Landscape.mp4";
import image1 from "../../assets/travelPhotos/cristina-gottardi--YzMZYqwoH4-unsplash (1).jpg";
// import image2 from "../../assets/travelPhotos/dominik-dancs-tzt-w1TCTNw-unsplash.jpg";
import image3 from "../../assets/travelPhotos/bjorn-agerbeek-ak8uY9rVDOs-unsplash.jpg";
// import image4 from "../../assets/travelPhotos/dan-novac-1naE8177_bI-unsplash.jpg";
// import image5 from "../../assets/travelPhotos/billy-huynh-v9bnfMCyKbg-unsplash.jpg"
import { Carousel, Ripple, initTE } from "tw-elements";

export default function Home() {
  // const [isMuted, setIsMuted] = useState(false);

  // const toggleMute = () => {
  //   setIsMuted(!isMuted);
  // };

  useEffect(() => {
    initTE({ Carousel, Ripple });
  }, []);

  return (
    <div>
      <div
        id="carouselExampleCaptions"
        class="relative shadow-2xl"
        data-te-carousel-init
        data-te-ride="carousel"
      >
        <div
          class="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-te-carousel-indicators
        >
          <button
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to="0"
            data-te-carousel-active
            class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide-to="1"
            class="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-label="Slide 2"
          ></button>
        </div>
        <div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <div
            class="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade
            data-te-carousel-item
            data-te-carousel-active
          >
            <video class="w-full" controls autoPlay muted>
              <source src={video1} type="video/mp4" />
            </video>
            <div class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              {/* <h5 class="text-xl">First slide label</h5> */}
              {/* <p>Some representative placeholder content for the first slide.</p> */}
            </div>
          </div>
          <div
            class="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade
            data-te-carousel-item
          >
            <video class="w-full" controls autoPlay muted>
              <source src={video2} type="video/mp4" />
            </video>
            <div class="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              {/* <h5 class="text-xl">Second slide label</h5> */}
              {/* <p>Some representative placeholder content for the second slide.</p> */}
            </div>
          </div>
        </div>
        <button
          class="absolute bottom-[100px] left-0 top-[100px] z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="prev"
        >
          <span class="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Previous
          </span>
        </button>
        <button
          class="absolute bottom-[100px] right-0 top-[100px] z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="next"
        >
          <span class="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>

      {/* partition 1 */}
      <div class="h-screen flex items-center justify-center shadow-2xl">
        <div class="flex w-screen justify-between max-[760px]:flex-col-reverse">
          <div class="flex flex-col items-center justify-center text-[#183759] font-serif drop-shadow-lg">
            <div class="text-3xl md:text-4xl font-bold max-[760px]:mt-20">
              Customize your Experience
            </div>
            <div class="w-6/12 pt-5 text-sm md:text-base max-[760px]:mt-3">
              You can use our Web App with the help of ChatGpt and Google Maps
              to create your own personal tour anywhere you want!
            </div>
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              class="mt-6 inline-block rounded bg-[#183759] px-6 pb-2 pt-2.5 text-xs font-bold text-[#dbd4db] uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] hover:scale-110"
            >
              Create New Tour
            </button>
          </div>
          <div class="md:inline-block md:w-11/12 shadow-lg">
            <img
              class="w-full rounded-lg shadow-2xl"
              src={image1}
              alt="Venice"
            />
          </div>
        </div>
      </div>

      

      {/* partition 2 */}
      <div class=" w-screen h-screen bg-[#cdc6cd] relative">
        <div>
          <div class="absolute max-[760px]:w-screen max-[760px]:text-4xl max-[760px]:top-[21.7%]  top-[43.4%] w-1/2 text-[#cdc6cd] font-semibold text-7xl  drop-shadow-[4px_4px_rgba(24,55,89,.9)] z-10">Freedom of Choice</div>
          <img class="w-1/2 max-[760px]:w-screen max-[760px]:h-[50%] h-screen object-center inline-block shadow-md" src={image3} alt="Ibiza"/>
          <div class="w-1/2 max-[760px]:w-screen max-[760px]:text-4xl  max-[760px]:mt-28 inline-block text-[#183759] font-serif text-7xl shadow-2xl bg-clouds">
          Peace of Mind
          </div>
        </div>                      
      </div>

      {/* partition 3 */}
      <div class="h-screen flex flex-row items-center justify-center">
        <div class="w-screen flex justify-evenly">
          <div class="">
            <div class="md:inline-block">Peace of Mind</div>
            <div class="md:inline-block">Freedom of Choice</div>
          </div>
        </div>
      </div>


    </div>
  );
}

// import './Pages.css';

// export default function Home() {
//   return (
//     <div>
//       <p className="home-content">Home</p>
//     </div>
//   );
// }
