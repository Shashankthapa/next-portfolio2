"use client";
import React, { FormEvent, useState } from "react";
import FormButton from "./FormButton";
import { submitAction } from "../../../utils/action";
import {toast, ToastContainer} from "react-toastify";
import { getCaptchaToken } from "../../../utils/captcha";

const Form = () => {

  const [submitting, setIsSubmitting] = useState(false);

  const handleSubmit  = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
      const token = await getCaptchaToken();
      setIsSubmitting(true);
      const res = await submitAction(token, formData);
      if (res.success) {
        toast.success(res.message);
        setIsSubmitting(false);
        form.reset();
      } else {
        toast.error(res.message);
    }
  };
  return (
    <section className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <div className="w-full p-2 text-center"><ToastContainer/></div>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Contact Form
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <label className="label-style">Name:</label>
        <input className="input-style" type="text" name="formName" required />
        <label className="label-style">Email:</label>
        <input className="input-style" type="email" name="formEmail" required />
        <label className="label-style">Message:</label>
        <textarea className="input-style" name="formMsg" required />
        <FormButton status = {submitting}/>
      </form>
    </section>
  );
};

export default Form;
