export const electricityProviders = [
  { id: "IKEDC", name: "Ikeja Electric", image: "/images/ikedc.png" },
  { id: "EKEDC", name: "Eko Electric", image: "/images/ekedc.png" },
  { id: "KEDCO", name: "Kano Electric", image: "/images/kedco.png" },
  { id: "PHED", name: "PortHarcourt Electric", image: "/images/phed.png" },
  { id: "JED", name: "Jos Electric", image: "/images/jed.png" },
  { id: "IBEDC", name: "Ibadan Electric", image: "/images/ibedc.png" },
  { id: "KAEDCO", name: "Kaduna Electric", image: "/images/kaedco.png" },
  { id: "AEDC", name: "Abuja Electric", image: "/images/aedc.png" },
  { id: "EEDC", name: "Enugu Electric", image: "/images/eedc.png" },
  { id: "BEDC", name: "Benin Electric", image: "/images/bedc.png" },
  { id: "ABA", name: "Aba Electric", image: "/images/aba.png" },
  { id: "YEDC", name: "Yola Electric", image: "/images/yedc.png" },
];

// constants/promoData.ts
export const promoData = [
  {
    id: 1,
    image: "/images/airtel.png",
    title: "50% Off on All Data Plans!",
    link: "/promo/data-sale",
  },
  {
    id: 2,

    image: "/images/airtel.png",

    title: "Buy Airtime, Get Cashback",
    link: "/promo/cashback",
  },
  {
    id: 3,
    image: "/images/mtn.png",

    title: "Refer & Earn Rewards",
    link: "/promo/refer",
  },
];

export type NetworkKey = "Mtn" | "Glo" | "Airtel" | "Mobile9";

export const Networks: Record<NetworkKey, string[]> = {
  Mtn: ["mtn_sme", "mtn_cg_lite", "mtn_cg", "mtn_awoof", "mtn_gifting"],
  Glo: ["glo_cg", "glo_awoof", "glo_gifting"],
  Airtel: ["airtel_cg", "airtel_awoof", "airtel_gifting"],
  Mobile9: ["9mobile_sme", "9mobile_gifting"],
};

export const banksInfo = [
  {
    bank: "PALMPAY",
    logo: "/images/palmpay.png",
    note: "Your PalmPay virtual account",
    name:"PALMPAY Bank"
  },
  {
    bank: "9PSB",
    logo: "/images/9psb.png",
    note: "Your 9PSB virtual account",
    name:"9PSB Bank"
  },
];


const serviceImages: Record<string, string> = {
  // Data & Airtime
  mtn: "/images/mtn.png",
  airtel: "/images/airtel.png",
  glo: "/images/glo.jpg",
  "9mobile": "/images/9mobile.jpeg",

  // Electricity
  ikeja: "/images/ikeja.png",
  eko: "/images/eko.png",
  abuja: "/images/abuja.png",
  kano: "/images/kano.png",

  // Cable
  dstv: "/images/dstv.png",
  gotv: "/images/gotv.png",
  startimes: "/images/startimes.png",
  showmax: "/images/showmax.png",

  // Exam
  waec: "/images/waec.png",
  neco: "/images/neco.png",
  nabteb: "/images/nabteb.png",
};


export const networkPrefixes: Record<string, string[]> = {
  mtn: [
    "0803","0806","0703","0706","0810","0813","0814","0816","0819",
    "0903","0906","0913","0916","07025","07026","0704"
  ],
  glo: [
    "0805","0807","0705","0811","0815","0905","0915"
  ],
  airtel: [
    "0802","0808","0701","0708","0812","07027","07028","0901","0902",
    "0904","0907","0912"
  ],
  "9mobile": [
    "0809","0817","0818","0908","0909"
  ]
};


