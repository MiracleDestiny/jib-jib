"use client";
import { SingleImageDropzone } from "@/components/public/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
interface UploadFileProps {
  onComplete: (imageURL: string) => void;
}
export function UploadFile({ onComplete }: UploadFileProps) {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  return (
    <div className="flex relative justify-center items-center">
      {progress < 100 && progress != 0 && (
        <div className="absolute w-[150px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 z-20 ">
          <div
            className={`bg-primary-yellow h-2.5 rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        className={`${progress != 100 ? "opacity-50" : "opacity-100"}`}
        onChange={async (file) => {
          setFile(file);
          if (file) {
            const res = await edgestore.publicFiles
              .upload({
                file,
                onProgressChange: (progress) => {
                  // you can use this to show a progress bar
                  console.log(progress);
                  setProgress(progress);
                },
              })
              .then((value) => onComplete(value.url));
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
          }
        }}
      />

      {/* <button
        type="button"
        onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
        }}
      >
        Upload
      </button> */}
    </div>
  );
}
