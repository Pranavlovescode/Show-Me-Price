import { Label,TextInput,Button, Checkbox } from "flowbite-react";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center content-end mt-28 ">
        <div className="border border-gray-300 rounded-md shadow-md">
        <form className="flex flex-col gap-4 my-5   mx-28">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="name@flowbite.com"
              required={true}
              shadow={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              required={true}
              shadow={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput
              id="repeat-password"
              type="password"
              required={true}
              shadow={true}
            />
          </div>          
          <Button type="submit">Register new account</Button>
        </form>
        </div>
      </div>
    </main>
  );
}
