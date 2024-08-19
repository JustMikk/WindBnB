import React from "react";
import { Riple } from "react-loading-indicators";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full bg-rose-600 opacity-75 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-rose-600 opacity-75 animate-ping delay-100"></div>
          <div className="absolute inset-0 rounded-full bg-rose-600 opacity-75"></div>
        </div>
      </div>
    </div>
  );
}
