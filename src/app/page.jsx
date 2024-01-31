"use client";
import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-7rem)]">
      <section className="bg-slate-900 rounded- shadow w-1/4 p-4">
        <form className="flex flex-col" onSubmit={async (e) => {
        e.preventDefault();

        if (!file) return;

        const form = new FormData()
        form.set("file", file)

        const res = await fetch("/api/upload", {
          method: "POST",
          body: form
        })

        const data = await res.json();
        console.log(data)
      }}>
          <label className="text-center py-2 text-3xl font-semibold">
            Upload file:
          </label>

          <input className="text-center py-2 text-sm" type="file"
            onChange={handleFileChange}
          />

          <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2 hover:bg-blue-600 active:bg-blue-800 shadow transition-colors duration-200 font-bold">
            Upload
          </button>
      </form>

        {file && (
          <div className="flex justify-center items-center pt-4">
            <Image
            src={URL.createObjectURL(file)}
            alt="Upload file"
            width={300}
            height={300}
          />
          </div>
        )}
      </section>
    </div>
  );
};