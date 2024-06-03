import { Label, TextInput, Button } from "flowbite-react";

export default function Home() {
  return (
    <main className="h-screen bg-[url(../public/bg.jpg)] bg-center bg-cover bg-blend-overlay z-0">
      <h1 className="text-center pt-14 text-4xl font-extrabold text-gray-400">Mumbai House Price Prediction</h1>
      <div className="flex justify-center content-center pt-20">
        <div className="border-none rounded-md shadow-md bg-white bg-opacity-50 p-6 z-10">
          <form className="flex flex-col gap-4 my-5 px-28">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="Your email" />
              </div>
              <input
                className="bg-gray-300 border-none rounded-md p-2 w-full"
                id="email2"
                type="email"
                placeholder="name@flowbite.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Your password" />
              </div>
              <input
                className="bg-gray-300 border-none rounded-md p-2 w-full"
                id="password2"
                type="password"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password" value="Repeat password" />
              </div>
              <input
                className="bg-gray-300 border-none rounded-md p-2 w-full"
                id="repeat-password"
                type="password"
                required={true}
              />
            </div>
            <Button type="submit" color='blue'>Register new account</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
