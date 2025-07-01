import React from "react";
import Input from "./form/Input";
import Title from "./ui/Title";
import { useFormik } from "formik";
import { reservationSchema } from "../schema/reservation";

const Reservation = () => {
const onSubmit = async (values, actions) => {
  const message = `
📅 *New Diet & Fitness Consultation Booking!*
👤 *Name:* ${values.fullName}
📞 *Phone:* ${values.phoneNumber}
📧 *Email:* ${values.email}
👥 *Participants:* ${values.persons}
🗓️ *Date & Time:* ${new Date(values.date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
  `;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919035188516?text=${encodedMessage}`;

  actions.resetForm();

  // Open WhatsApp chat with pre-filled message
  window.open(whatsappUrl, "_blank");
};


  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        persons: "",
        date: "",
      },
      onSubmit,
      validationSchema: reservationSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Enter your full name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "tel",
      placeholder: "Your contact number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email for confirmation",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "persons",
      type: "number",
      placeholder: "Number of participants (if group)",
      value: values.persons,
      errorMessage: errors.persons,
      touched: touched.persons,
    },
    {
      id: 5,
      name: "date",
      type: "datetime-local",
      value: values.date,
      errorMessage: errors.date,
      touched: touched.date,
    },
  ];

  

  return (
    <div className="container mx-auto py-12">
      <Title addClass="text-[40px] mb-10">Book a Diet & Fitness Consultation</Title>
      <div className="flex justify-between flex-wrap-reverse gap-10">
        <form className="lg:flex-1 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-3">
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
          <button className="btn-primary mt-4" type="submit">
            Book Appointment
          </button>
        </form>
        <div className="lg:flex-1 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3887.5004214816254!2d77.53132947507703!3d13.00377318731445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDAwJzEzLjYiTiA3N8KwMzInMDIuMSJF!5e0!3m2!1sen!2sin!4v1749711707278!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full rounded-lg"
          ></iframe>
         
        </div>
      </div>
    </div>
  );
};

export default Reservation;
