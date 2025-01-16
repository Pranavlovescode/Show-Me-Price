"use client";

import { Label } from "flowbite-react";
import { useEffect, useState } from "react";

type FormContent = {
  location: string;
  bhk: string;
  area: string;
  age: string;
  status: string;
};

type Location = {
  locations: string[];
};

export default function Home() {
  const [pred_price, setPredPrice] = useState(0.0);
  const [location, setLocation] = useState<Location>({ locations: [] });
  const [formContent, setFormContent] = useState<FormContent>({
    location: "",
    bhk: "",
    area: "",
    age: "New",
    status: "Ready to move",
  });

  const predictPrice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NODE_ENV=="production"}/predict-price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formContent),
    });
    console.log("The form content is: ",formContent)
    const res = await response.json();
    console.log(res)
    setPredPrice(res.predicted_price)
  };

  const getLocations = async () => {
    try {
      const res = await fetch(`${process.env.NODE_ENV=="production"}`);
      const data = await res.json();
      setLocation(data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <main className="md:h-screen md:bg-[url(../public/mumbai_bg.jpg)] bg-center bg-cover bg-blend-overlay z-0 h-full">
      <h1 className="text-center pt-14 md:text-4xl text-3xl font-extrabold text-yellow-900">
        Predict Your House Price
      </h1>
      <div className="flex justify-center content-center pt-20 w-full">
        <div className="border-none rounded-md shadow-2xl bg-white bg-opacity-50 p-6 md:z-10 h-screen md:h-full">
          <form
            className="flex flex-col gap-4 flex-shrink-0 my-5 md:px-20"
            onSubmit={predictPrice}
          >
            <div className="mb-2 flex flex-col mr-3 w-full">
              <Label htmlFor="location" className="mb-2" value="Location" />
              <select
                id="location"
                name="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                onChange={(e) =>
                  setFormContent({ ...formContent, location: e.target.value })
                }
                required={true}
              >
                <option>Choose a Location</option>
                {location.locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 w-full">
              <div className="mb-2 flex flex-col md:w-28 ">
                <Label htmlFor="bhk" className="mb-2" value="BHK" />
                <input
                  className="border-gray-300 bg-gray-50 border-none rounded-md p-2 focus:ring-2 focus:ring-yellow-500 mr-2"
                  id="bhk"
                  name="bhk"
                  type="number"
                  onChange={(e) =>
                    setFormContent({ ...formContent, bhk: e.target.value })
                  }
                  required={true}
                />
              </div>
              <div className="mb-2 flex flex-col md:w-28 w-full">
                <Label htmlFor="area" className="mb-2" value="Area" />
                <input
                  className="bg-gray-50 border-gray-300 border-none rounded-md p-2 focus:ring-2 focus:ring-yellow-500"
                  id="area"
                  name="area"
                  type="number"
                  onChange={(e) =>
                    setFormContent({ ...formContent, area: e.target.value })
                  }
                  required={true}
                />
              </div>
              <div className="mb-2 flex flex-col">
                <Label htmlFor="age" className="mb-2" value="Type" />
                <select
                  id="age"
                  name="age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                  onChange={(e) =>
                    setFormContent({ ...formContent, age: e.target.value })
                  }
                  required={true}
                  value={formContent.age}
                >
                  <option value="New">New</option>
                  <option value="Resale">Resale</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" value="Status" />
              </div>
              <select
                id="status"
                name="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2"
                onChange={(e) =>
                  setFormContent({ ...formContent, status: e.target.value })
                }
                value={formContent.status}
              >
                <option value="Ready to move">Ready to move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-700 rounded-md hover:bg-yellow-800 delay-50 duration-300 ease-out py-2 mt-2 text-white focus:ring-4 focus:ring-yellow-500"
            >
              Predict Price
            </button>
          </form>
          {pred_price ? (
            pred_price.toString().length > 5 ? (
              <h3 className="text-center text-2xl font-semibold">
                Predicted Price : {(pred_price / 100).toPrecision(2)} Cr
              </h3>
            ) : (
              <h3 className="text-center text-2xl font-semibold">
                Predicted Price : {pred_price} L
              </h3>
            )
          ) : (
            <h3 className="text-center text-2xl font-semibold"></h3>
          )}
        </div>
      </div>
    </main>
  );
}
