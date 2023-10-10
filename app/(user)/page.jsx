"use client";
import Image from 'next/image';
export default function Home() {
  return (
    <div className="">
      <div className="flex justify-center items-center m-14 flex-col">
        {/* Top section */}
        <div className="w-[84%] h-[32rem] border-black bg-blue-200 rounded-2xl grid grid-cols-2">
          {/* <image
            src="/images/image 47.jpg"
            className="mt-[38px] -ml-[103px]"
            alt=""
          /> */}
          <Image src="" alt="me" width="64" height="64" />
          <div className="flex flex-col -ml-[200px] mt-20">
            <div className="text-5xl text-center">Welcome to MilkyWay</div>
            <p className="text-xl mx-20 mt-5">
              Freshness Delivered to Your Doorstep - The Ultimate Milk
              Experience!
            </p>
            <hr className="m-10 border-1 border-black" />
            <div className="px-10 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
              ex nemo corrupti obcaecati nulla minus qui beatae officia dolorem
              quisquam harum accusamus rem eligendi expedita vitae laudantium
              voluptatum, aperiam corporis, quis ratione! Eligendi, ducimus
              illum! Excepturi exercitationem necessitatibus doloremque. Tempora
              ex eligendi illum suscipit cumque nam? Nesciunt voluptates hic ad!
            </div>
          </div>
        </div>

        {/* middle section */}
        <div className="grid grid-cols-2 gap-10 justify-center my-24 justify-items-center w-[84%]">
          <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
            <h1 className="text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
              <span>Amul - Full Cream Milk Pouch</span>
              <span> ( Gold ) </span>
            </h1>
            <div className="flex justify-between items-center mx-5">
              <div className="underline text-base">Discover Now</div>
              <div className="-mt-10">
                <img
                  className="w-48 h-48"
                  src="/images/amul_gold_500.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
            <h1 className="text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
              <span>Amul - Toned Milk Pouch</span>
              <span>( Taaza )</span>
            </h1>
            <div className="flex justify-between items-center mx-5">
              <div className="underline text-base">Discover Now</div>
              <div className="-mt-10">
                <img
                  className="w-48 h-48"
                  src="/images/amul_taza_500.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
            <h1 className="text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
              <span>Amul - Long Life toned milk.</span>
              <span>( Shakti )</span>
            </h1>
            <div className="flex justify-between items-center mx-5">
              <div className="underline text-base">Discover Now</div>
              <div className="-mt-10">
                <img
                  className="w-48 h-48"
                  src="/images/amul_sakti_500.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="w-full h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
            <h1 className="text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
              <span>Amul - Buffalo A2 Milk Pouch</span>
              <span>&nbsp;</span>
            </h1>
            <div className="flex justify-between items-center mx-5">
              <div className="underline text-base">Discover Now</div>
              <div className="-mt-10">
                <img
                  className="w-48 h-48"
                  src="/images/amul_buffalo.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="w-full justify-self-center ml-[100%] h-64 rounded-sm bg-white shadow-sm font-[Taviraj] font-semibold px-10 py-5">
            <div className="text-3xl font-[Taviraj] font-semibold text-justify flex flex-col">
              <span>Amul - Cow Milk Pouch</span>
              <span>&nbsp;</span>
            </div>
            <div className="flex justify-between items-center mx-5">
              <div className="underline text-base">Discover Now</div>
              <div className="-mt-10">
                <img
                  className="w-48 h-48"
                  src="/images/amul_cow_500.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>
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
        <div className="w-[100%] m-20 p-10 flex space-x-10">
          <div className="w-[100%] border-black h-96 bg-blue-200 rounded-[70px] p-10 flex flex-col items-center justify-between space-y-2 text-center shadow-sm">
            <img className="w-36 h-36" src="/images/home_notice.png" alt="" />
            <p className="font-bold text-[22px]">
              Modify your order till 7 evening for next day early morning
              delivery of fresh cow and buffalo milk.
            </p>
            <p className="text-[22px]">
              We source cow milk, buffalo milk from the best Amul in India.
              After we deliver all your daily needs without preservatives or
              mixing.
            </p>
          </div>

          <div className="w-[100%] border-black h-96 bg-blue-200 rounded-[70px] p-10 flex flex-col justify-between shadow-sm">
            <div className="flex space-x-5 items-center">
              <img src="/images/home_cart_img.png" alt="" />
              <p className="text-[22px] font-bold">Order Fresh Milk</p>
            </div>

            <div className="flex space-x-5 items-center">
              <img src="/images/home_sub_img.png" alt="" />
              <p className="text-[22px] font-bold">Subscription Plan</p>
            </div>

            <div className="flex space-x-5 items-center">
              <img src="/images/home_delivery_img.png" alt="" />
              <p className="text-[22px] font-bold">Delivered before 5 - 7 Am</p>
            </div>

            <div className="flex space-x-5 items-center">
              <img src="/images/home_discount_img.png" alt="" />
              <p className="text-[22px] font-bold">
                Grab exciting offers for big saving
              </p>
            </div>
          </div>
        </div>

        {/* images */}
        <div className="w-full flex justify-around">
          <div>
            <img src="/images/home_farm_img.png" alt="" />
            <p className="text-center text-2xl mt-5">Farm</p>
          </div>
          <div>
            <img src="/images/home_storage_img.png" alt="" />
            <p className="text-center text-2xl mt-5">Storage</p>
          </div>
          <div>
            <img src="/images/home_deliver_img.png" alt="" />
            <p className="text-center text-2xl mt-5">Deliver</p>
          </div>
        </div>

        {/* logo */}
        <div className="flex items-center justify-center flex-col my-20">
          <img src="/images/home_logo_mw.png" alt="" />
          <img src="/images/logoname.png" alt="" />
        </div>

        {/* cow */}
        <div>
          <img src="" alt="" />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
