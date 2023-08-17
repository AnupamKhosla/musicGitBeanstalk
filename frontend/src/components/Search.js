
export default function Search(props) {
	return (		
		<>
			<section className="relative table w-full py-28 bg-[url('./img/sheet_bg.jpg')] bg-no-repeat bg-center bg-cover">
	            <div className="absolute inset-0 bg-black opacity-80"></div>
	            <div className="container relative">
	                <div className="grid grid-cols-1 text-center mt-10">
	                    <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Indian classical music sheets collection</h3>
	                </div>
	            </div>
	        </section>
	        <div className="relative">
	            <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-gray-100 dark:text-slate-900">
	                <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
	                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
	                </svg>
	            </div>
	        </div>
	        <div className="container relative -mt-16 z-1">
	            <div className="grid grid-cols-1">
	                <div className="p-6 bg-white dark:bg-slate-900 rounded-md shadow-md dark:shadow-gray-800">
	                    <form action="#">
	                        <div className="registration-form relative text-dark text-start">
	                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
	                                <div className="filter-search-form relative lg:before:content-[''] lg:before:absolute lg:before:top-[10px] lg:before:end-0 lg:before:h-10 lg:before:z-1 lg:before:border-r lg:before:border-inherit lg:before:rounded-md lg:before:outline-0 lg:dark:before:border-gray-700">
	                                    <i className="uil uil-search absolute top-[48%] -translate-y-1/2 start-3 z-1 text-rose-600 text-[20px]"></i>
	                                    <input name="name" type="text" id="job-keyword" className="form-input lg:rounded-t-sm lg:rounded-e-none lg:rounded-b-none lg:rounded-s-sm lg:outline-0 w-full filter-input-box bg-gray-50 dark:bg-slate-800 border-0 focus:ring-0" placeholder="Search your keaywords" />
	                                </div>

	                                <div className="filter-search-form relative lg:before:content-[''] lg:before:absolute lg:before:top-[10px] lg:before:end-0 lg:before:h-10 lg:before:z-1 lg:before:border-r lg:before:border-inherit lg:before:rounded-md lg:before:outline-0 lg:dark:before:border-gray-700">
	                                    <i className="uil uil-estate absolute top-[48%] -translate-y-1/2 start-3 z-1 text-rose-600 text-[20px]"></i>
	                                    <select className="form-select z-2" data-trigger name="choices-catagory" id="choices-catagory" aria-label="Default select example">
	                                        <option>Houses</option>
	                                        <option>Apartment</option>
	                                        <option>Offices</option>
	                                        <option>Townhome</option>
	                                    </select>
	                                </div>
	                            
	                                <div className="filter-search-form relative lg:before:content-[''] lg:before:absolute lg:before:top-[10px] lg:before:end-0 lg:before:h-10 lg:before:z-1 lg:before:border-r lg:before:border-inherit lg:before:rounded-md lg:before:outline-0 lg:dark:before:border-gray-700">
	                                    <i className="uil uil-usd-circle absolute top-[48%] -translate-y-1/2 start-3 z-1 text-rose-600 text-[20px]"></i>
	                                    <select className="form-select" data-trigger name="choices-min-price" id="choices-min-price" aria-label="Default select example">
	                                        <option>Min Price</option>
	                                        <option>500</option>
	                                        <option>1000</option>
	                                        <option>2000</option>
	                                        <option>3000</option>
	                                        <option>4000</option>
	                                        <option>5000</option>
	                                        <option>6000</option>
	                                    </select>
	                                </div>
	                            
	                                <div className="filter-search-form relative">
	                                    <i className="uil uil-usd-circle absolute top-[48%] -translate-y-1/2 start-3 z-1 text-rose-600 text-[20px]"></i>
	                                    <select className="form-select" data-trigger name="choices-max-price" id="choices-max-price" aria-label="Default select example">
	                                        <option>Max Price</option>
	                                        <option>500</option>
	                                        <option>1000</option>
	                                        <option>2000</option>
	                                        <option>3000</option>
	                                        <option>4000</option>
	                                        <option>5000</option>
	                                        <option>6000</option>
	                                    </select>
	                                </div>

	                                <div className="lg:mt-6">
	                                    <input type="submit" id="search" name="search" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-rose-600 hover:bg-rose-700 border-rose-600 hover:border-rose-700 text-white searchbtn w-full !h-12 rounded" value="Search" />
	                                </div>
	                            </div>
	                        </div>
	                    </form>
	                </div>
	            </div>
	        </div>
		</>
	)
}