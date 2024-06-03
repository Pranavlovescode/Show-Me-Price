"use client"
import { Label } from "flowbite-react";

export default function Home() {
  return (
    <main className="h-screen md:bg-[url(../public/mumbai_bg.jpg)] bg-[url('../public/potrait.jpg)] bg-center bg-cover bg-blend-overlay z-0">
      <h1 className="text-center pt-14 md:text-4xl text-3xl font-extrabold text-yellow-900">
        Predict Your House Price
      </h1>
      <div className="flex justify-center content-center pt-20">
        <div className="border-none rounded-md shadow-2xl bg-white bg-opacity-50 p-6 z-10">
          <form className="flex flex-col gap-4 flex-shrink-0 my-5 px-28">            
            <div className="mb-2 flex flex-col mr-3 w-full">
                <Label htmlFor="email2" className="mb-2" value="Location" />
                <select
                  id="location"
                  name="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </select>              
            </div>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 w-full">
              <div className="mb-2 flex flex-col md:w-28 ">
                <Label htmlFor="password2" className="mb-2" value="BHK" />
                <input
                  className="bg-gray-50 border-none rounded-md p-2 focus:ring-2 focus:ring-yellow-500 mr-2"
                  id="password2"
                  type="number"
                  required={true}
                />
              </div>
              <div className="mb-2 flex flex-col md:w-28 w-full">
                <Label htmlFor="password2" className="mb-2" value="Area" />
                <input
                  className="bg-gray-50 border-none rounded-md p-2 focus:ring-2 focus:ring-yellow-500"
                  id="password2"
                  type="number"
                  required={true}
                />
              </div>
              <div className="mb-2 flex flex-col">
                <Label htmlFor="password2" className="mb-2" value="Type" />
                <select
                  id="location"
                  name="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                >
                  <option>New</option>
                  <option>Resale</option>
                  <option>Unknown</option>
                  
                </select>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password" value="Status" />
              </div>
              <select
                  id="location"
                  name="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                >
                  <option>Ready to move</option>
                  <option>Under Construction</option>
                </select>
            </div>
            <button
              type="button"
              className="bg-yellow-700 rounded-md hover:bg-yellow-800 delay-50 duration-300 ease-out py-2 mt-2 text-white focus:ring-4 focus:ring-yellow-500"
            >
              Predict Price
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
