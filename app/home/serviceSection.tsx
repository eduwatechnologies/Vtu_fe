"use client";
import { Check, CheckCircle, Smartphone, Tv, Wifi, Zap } from "lucide-react";

export function ServiceSection() {
  const services = [
    {
      icon: Smartphone,
      title: "Airtime Top-up",
      description:
        "Instant airtime for all networks with competitive rates and instant delivery",
      features: [
        "All Networks",
        "Instant Delivery",
        "Best Rates",
        "24/7 Available",
      ],
      price: "From ₦50",
    },
    {
      icon: Wifi,
      title: "Data Bundles",
      description:
        "Affordable data plans for MTN, Airtel, Glo, and 9mobile networks",
      features: [
        "All Data Plans",
        "SME & Gifting",
        "Auto Renewal",
        "Bulk Purchase",
      ],
      price: "From ₦100",
    },
    {
      icon: Zap,
      title: "Utility Bills",
      description:
        "Pay electricity, cable TV, internet, and other utility bills seamlessly",
      features: ["PHCN/EKEDC", "Cable TV", "Internet Bills", "Water Bills"],
      price: "No Extra Fee",
    },
    {
      icon: Tv,
      title: "Cable TV",
      description:
        "Subscribe to DSTV, GOTV, Startimes and other cable TV services",
      features: ["DSTV", "GOTV", "Startimes", "Strong Decoder"],
      price: "From ₦1,000",
    },
  ];

  return (
    <section className=" py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-element">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive VTU solutions designed to meet all your digital
            transaction needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow fade-in-element"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <Check className="w-4 h-4 text-blue-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-lg font-semibold text-green-600">
                {service.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
