import React from "react";
import {
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
} from "lucide-react";

const ContactUs = () => {
  const contactItems = [
    {
      icon: <Phone size={20} />,
      text: "+234 806 324 9490",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      icon: <Mail size={20} />,
      text: "support@payonce.com.ng",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      icon: <MessageCircle size={20} />,
      text: "Join Our WhatsApp Group",
      link: "https://chat.whatsapp.com/Eg7pNO61XSmDClQgMEsA3n",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    // {
    //   icon: <Instagram size={20} />,
    //   text: "@payonce.com.ng",
    //   link: "https://instagram.com/payonce.com.ng",
    //   bgColor: "bg-pink-100",
    //   textColor: "text-pink-500",
    // },
    // {
    //   icon: <Twitter size={20} />,
    //   text: "@payonce.com.ng",
    //   link: "https://twitter.com/yourpage",
    //   bgColor: "bg-blue-50",
    //   textColor: "text-blue-400",
    // },
    // {
    //   icon: <Facebook size={20} />,
    //   text: "YourPage",
    //   link: "https://facebook.com/yourpage",
    //   bgColor: "bg-blue-50",
    //   textColor: "text-blue-700",
    // },
  ];

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <p className="text-gray-500">
          Reach us through any of the channels below. We’d love to hear from
          you!
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {contactItems.map((item, idx) => (
          <a
            key={idx}
            href={item.link || "#"}
            target={item.link ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
          >
            <div
              className={`p-3 rounded-full ${item.bgColor} flex items-center justify-center`}
            >
              {React.cloneElement(item.icon, { className: item.textColor })}
            </div>
            <span className="font-medium text-gray-700">{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
