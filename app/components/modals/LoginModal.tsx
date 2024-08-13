"use client";

import { signIn } from "next-auth/react";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [LoginModal, registerModal]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      passsword: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged in successfully");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log in to your account!" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        icon={FcGoogle}
        onClick={() => signIn("google")}
        label="Continue with Google"
      />
      <Button
        outline
        icon={AiFillGithub}
        onClick={() => signIn("github")}
        label="Continue with Github"
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2 text-center">
          <div>First time using Windbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      title="Login"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
