"use client";
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="bg-[#f7f6f4]">
      <div className="flex justify-center items-center m-14 mt-0 mb-0 flex-col">
        {/* Top section */}
        <div className=" w-[100%] sm:w-[84%] p-5 border-black bg-[#F1DDC9] rounded-2xl flex flex-col md:p-10 xl:flex-row items-center">
          {/* <image
            src="/images/image 47.jpg"
            className="mt-[38px] -ml-[103px]"
            alt=""
          /> */}
          {/* <Image src="/images/image_47.png" alt="me" width="500" height="400" className='-ml-28 mt-10' /> */}
          <Image src="/images/logo_back.png" alt="me" width="500" height="400" className='w-52 h-52 sm:w-60 sm:h-60 xl:w-96 xl:h-96' />
          <div className="flex flex-col xl:mt-20 w-[100%]">
            <div className="text-xl font-semibold text-center sm:text-2xl md:text-3xl xl:text-5xl">Welcome to MilkyWay</div>
            <p className="text-sm sm:text-base text-center mt-4 xl:mx-20 md:text-lg xl:text-xl xl:mt-5">
              Freshness Delivered to Your Doorstep - The Ultimate Milk
              Experience!
            </p>
            <hr className="my-5 xl:mx-10 border-1 border-black" />
            <div className=" hidden sm:block sm:text-sm md:px-10 sm:px-5 text-justify text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
              ex nemo corrupti obcaecati nulla minus qui beatae officia dolorem
              quisquam harum accusamus rem eligendi expedita vitae laudantium
              voluptatum, aperiam corporis, quis ratione! Eligendi, ducimus
              illum! Excepturi exercitationem necessitatibus doloremque. Tempora
              ex eligendi illum suscipit cumque nam? Nesciunt voluptates hic ad!
            </div>
            <div className="sm:hidden sm:text-sm md:px-10 sm:px-5 text-justify text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
              ex nemo corrupti obcaecati nulla minus qui beatae officia dolorem
              quisquam harum accusamus rem eligendi expedita vitae laudantium expedita vitae laudantium
            </div>
          </div>
        </div>

        {/* middle section */}
        <div className="grid sm:grid-cols-2 gap-y-10 sm:gap-10 justify-center my-24 justify-items-center w-[100%]">
          <Link href='/products' className='w-full'>
            <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
              <h1 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
                <span>Amul - Full Cream Milk Pouch</span>
                <span> &nbsp; </span>
              </h1>
              <div className="flex flex-col-reverse lg:flex-row justify-between items-center mx-5">
                <div className="underline text-base">Discover Now</div>
                <div className="-mt-7 lg:-mt-10">
                  <img
                    className=" w-32 h-32 lg:w-40 lg:h-40"
                    src="/images/amul_gold_500.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href='/products' className='w-full'>
            <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
              <h1 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
                <span>Amul - Toned Milk Pouch</span>
                <span> &nbsp; </span>
              </h1>
              <div className="flex flex-col-reverse lg:flex-row justify-between items-center mx-5">
                <div className="underline text-base">Discover Now</div>
                <div className="-mt-7 lg:-mt-10">
                  <img
                    className=" w-32 h-32 lg:w-40 lg:h-40"
                    src="/images/amul_taza_500.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href='/products' className='w-full'>
            <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
              <h1 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
                <span>Amul - Long Life toned milk.</span>
                <span> &nbsp; </span>
              </h1>
              <div className="flex flex-col-reverse lg:flex-row justify-between items-center mx-5">
                <div className="underline text-base">Discover Now</div>
                <div className="-mt-7 lg:-mt-10">
                  <img
                    className=" w-32 h-32 lg:w-40 lg:h-40"
                    src="/images/amul_sakti_500.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href='/products' className='w-full'>
            <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
              <h1 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
                <span>Amul - Buffalo A2 Milk Pouch</span>
                <span>&nbsp;</span>
              </h1>
              <div className="flex flex-col-reverse lg:flex-row justify-between items-center mx-5">
                <div className="underline text-base">Discover Now</div>
                <div className="-mt-7 lg:-mt-10">
                  <img
                    className=" w-32 h-32 lg:w-40 lg:h-40"
                    src="/images/amul_buffalo.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href='/products' className='w-full'>
            <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
              <h1 className="text-base md:text-xl lg:text-2xl xl:text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
                <span>Amul - Buffalo A2 Milk Pouch</span>
                <span>&nbsp;</span>
              </h1>
              <div className="flex flex-col-reverse lg:flex-row justify-between items-center mx-5">
                <div className="underline text-base">Discover Now</div>
                <div className="-mt-7 lg:-mt-10">
                  <img
                    className=" w-32 h-32 lg:w-40 lg:h-40"
                    src="/images/amul_buffalo.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>

          <Link href='/products' className='w-full'>
            <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
              <div className="text-base md:text-xl lg:text-2xl xl:text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
                <span>Amul - Cow Milk Pouch</span>
                <span>&nbsp;</span>
              </div>
              <div className="flex flex-col-reverse lg:flex-row justify-between items-center mx-5">
                <div className="underline text-base">Discover Now</div>
                <div className=" -mt-7 lg:-mt-10">
                  <img
                    className="w-32 h-32 lg:w-40 lg:h-40"
                    src="/images/amul_cow_500.jpeg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* monthly deal section */}
        {/* <div className="w-[84%]">
          <div className="text-4xl mb-14 font-[Taviraj] underline">
            Monthly Deals
          </div>
          <div className="grid grid-cols-4 gap-10">
            <div className="p-5 shadow-sm bg-white flex flex-col space-y-5">
              <div className="flex justify-center items-center">
                <img className="w-48 h-48" src='/images/amul_gold_500.jpeg' alt="" />
              </div>
              <div className="flex flex-col space-y-3 justify-center items-center">
                <span className="text-xl">Amul - Gold -500 ml</span>
                <span className="font-normal text-[#777777]">2 % Off</span>
                <span className="text-[#777777] line-through font-normal">
                  Rs. 1000.00
                </span>
                <span className="text-xl">Rs 980.000</span>
              </div>

              <div className="flex space-x-2">
                <div className="border border-red-700 w-[20%] text-2xl flex items-center justify-center p-2">
                  <i className="fa-regular fa-heart text-red-700 font-thin"></i>
                </div>
                <div className="w-[80%] bg-red-700 text-white flex justify-center items-center p-2">
                  <p>Add to cart</p>
                </div>
              </div>
            </div>
            <div className="p-5 shadow-sm bg-white flex flex-col space-y-5">
              <div className="flex justify-center items-center">
                <img className="w-48 h-48" src='/images/amul_buffalo.jpeg' alt="" />
              </div>
              <div className="flex flex-col space-y-3 justify-center items-center">
                <span className="text-xl">Singo Ebony</span>
                <span className="font-normal text-[#777777]">20% Off</span>
                <span className="text-[#777777] line-through font-normal">
                  Rs. 1500.00
                </span>
                <span className="text-xl">Rs 1264.000</span>
              </div>

              <div className="flex space-x-2">
                <div className="border border-red-700 w-[20%] text-2xl flex items-center justify-center p-2">
                  <i className="fa-regular fa-heart text-red-700 font-thin"></i>
                </div>
                <div className="w-[80%] bg-red-700 text-white flex justify-center items-center p-2">
                  <p>Add to cart</p>
                </div>
              </div>
            </div>
            <div className="p-5 shadow-sm bg-white flex flex-col space-y-5">
              <div className="flex justify-center items-center">
                <img className="w-48 h-48" src='/images/amul_taza_500.jpeg' alt="" />
              </div>
              <div className="flex flex-col space-y-3 justify-center items-center">
                <span className="text-xl">Amul - Taaza - 500 ml</span>
                <span className="font-normal text-[#777777]">2 % Off</span>
                <span className="text-[#777777] line-through font-normal">
                  Rs. 1280.00
                </span>
                <span className="text-xl">Rs 1118.000</span>
              </div>

              <div className="flex space-x-2">
                <div className="border border-red-700 w-[20%] text-2xl flex items-center justify-center p-2">
                  <i className="fa-regular fa-heart text-red-700 font-thin"></i>
                </div>
                <div className="w-[80%] bg-red-700 text-white flex justify-center items-center p-2">
                  <p>Add to cart</p>
                </div>
              </div>
            </div>
            <div className="p-5 shadow-sm bg-white flex flex-col space-y-5">
              <div className="flex justify-center items-center">
                <img className="w-48 h-48" src='/images/amul_sakti_500.jpeg' alt="" />
              </div>
              <div className="flex flex-col space-y-3 justify-center items-center">
                <span className="text-xl">Amul - Shakti - 500 ml</span>
                <span className="font-normal text-[#777777]">10% Off</span>
                <span className="text-[#777777] line-through font-normal">
                  Rs. 1280.00
                </span>
                <span className="text-xl">Rs 1024.000</span>
              </div>

              <div className="flex space-x-2">
                <div className="border border-red-700 w-[20%] text-2xl flex items-center justify-center p-2">
                  <i className="fa-regular fa-heart text-red-700 font-thin"></i>
                </div>
                <div className="w-[80%] bg-red-700 text-white flex justify-center items-center p-2">
                  <p>Add to cart</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Quates */}
        <div className="w-[100%] mb-20 sm:m-20  flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0">
          <div className="w-[100%] border-black h-60 sm:h-80 lg:h-96 bg-[#F1DDC9] rounded-[40px] sm:rounded-[70px] px-5 py-10 sm:p-10 flex flex-col items-center justify-between space-y-2 text-center shadow-sm">
            <img className="w-20 h-16 sm:w-28 sm:h-24 md:w-32 md:h-28 xl:w-36 xl:h-32" src="/images/home_notice.png" alt="" />
            <p className="font-bold text-xs  sm:text-base md:text-lg xl:text-[21px]">
              Modify your order till 7 evening for next day early morning
              delivery of fresh cow and buffalo milk.
            </p>
            <p className=" text-xs sm:text-base md:text-lg xl:text-[21px]">
              We source cow milk, buffalo milk from the best Amul in India.
              After we deliver all your daily needs without preservatives or
              mixing.
            </p>
          </div>

          <div className="w-[100%] border-black h-60 sm:h-80 lg:h-96 bg-[#F1DDC9] rounded-[40px] sm:rounded-[70px] px-5 py-10 sm:p-10 flex flex-col justify-between shadow-sm">
            <div className="flex space-x-5 items-center">
              <img src="/images/home_cart_img.png" alt="" className='w-8 h-8 sm:w-16 sm:h-16' />
              <p className="text-xs sm:text-base md:text-lg text-[22px] font-bold">Order Fresh Milk</p>
            </div>

            <div className="flex space-x-5 sm:items-center">
              <img src="/images/home_sub_img.png" alt="" className='w-8 h-8 sm:w-16 sm:h-16' />
              <p className="text-xs sm:text-base md:text-lg text-[22px] font-bold">Subscription Plan</p>
            </div>

            <div className="flex space-x-5 items-center">
              <img src="/images/home_delivery_img.png" alt="" className='w-8 h-8 sm:w-16 sm:h-16' />
              <p className="text-xs sm:text-base md:text-lg text-[22px] font-bold">Delivered before 5 - 7 Am</p>
            </div>

            <div className="flex space-x-5 items-center">
              <img src="/images/home_discount_img.png" alt="" className='w-8 h-8 sm:w-16 sm:h-16' />
              <p className=" text-xs sm:text-base md:text-lg text-[22px] font-bold">
                Grab exciting offers for big saving
              </p>
            </div>
          </div>
        </div>

        {/* images */}
        <div className="w-full flex flex-col md:flex-row items-center md:justify-around md:space-y-0 space-y-5">
          <div>
            <img src="/images/home_farm_img.png" alt="" className='h-60 xl:h-80 md:w-[80%] xl:w-[90%]' />
            <p className="text-center text-xl lg:text-2xl mt-5">Farm</p>
          </div>
          <div>
            <img src="/images/home_storage_img.png" alt="" className='h-60 xl:h-80 md:w-[80%] xl:w-[90%]' />
            <p className="text-center text-xl lg:text-2xl mt-5">Storage</p>
          </div>
          <div>
            <img src="/images/home_deliver_img.png" alt="" className='h-60 xl:h-80 md:w-[80%] xl:w-[90%]' />
            <p className="text-center text-xl lg:text-2xl mt-5">Deliver</p>
          </div>
        </div>

        {/* logo */}
        <div className="flex items-center justify-center flex-col my-20">
          {/* <img src="/images/logo_back.png" alt="" className='w-96' /> */}
          {/* <img src="/images/logoname.png" alt="" /> */}
        </div>

        {/* cow */}
        <div>
          <img src="" alt="" />
        </div>
      </div>
      {/* <Footer /> */}
    </div >
  );
}
