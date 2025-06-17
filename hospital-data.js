// hospitals.js - Hospital Network Data
const hospitalData = {
  bangkok: {
    title: "กรุงเทพมหานคร (BANGKOK)",
    provinces: [
      {
        name: "กรุงเทพมหานคร/Bangkok",
        hospitals: [
          {
            name: "รพ.เกษมราษฎร์ บางแค/Kasemrad Hospital Bangkae",
            service: "OPD&IPD case",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2804-8959-70",
            mapUrl: "https://maps.app.goo.gl/2zc1wcocJzXqR3YSA"
          },
          {
            name: "รพ.เกษมราษฎร์ ประชาชื่น/Kasemrad Hospital Prachachuen",
            service: "OPD&IPD case",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2910-1600-45",
            mapUrl: "https://maps.app.goo.gl/wz2HqkqrP2dgpxLz7"
          },
          {
            name: "รพ.เกษมราษฎร์ รามคำแหง/KASEMRAD RAMKHAMHAENG HOSPITAL",
            service: "OPD&IPD case",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2339-0000",
            mapUrl: "https://maps.app.goo.gl/uHTawePbcSd4AUUB7"
          },
          {
            name: "เคคลินิกเวชกรรม/K Clinic Vejchakam",
            service: "OPD case only",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2636-7733",
            mapUrl: "https://maps.app.goo.gl/Pjh2LtuELDuDWxbh8"
          },
          {
            name: "เคคลินิกเวชกรรม สาขาราม 2/K Clinic Ram 2",
            service: "OPD case only",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2751-6894",
            mapUrl: "https://maps.app.goo.gl/7WL3RT5w8MtmNdGE7"
          },
          {
            name: "รพ.เจ้าพระยา/Chaophya Hospital",
            service: "OPD&IPD case",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2434-1111, 0-2884-7000",
            mapUrl: "https://maps.app.goo.gl/muLaczw2C3Jd9Vq78"
          },
          {
            name: "รพ.เซนต์หลุยส์/Saint Louis Hospital",
            service: "OPD&IPD case",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2838-5555",
            mapUrl: "https://maps.app.goo.gl/pZD4qWtHcP13qbDd8"
          },
          {
            name: "รพ.กรุงเทพ/Bangkok Hospital",
            service: "OPD&IPD case",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "Hot line: 1719, 0-2310-3000",
            mapUrl: "https://maps.app.goo.gl/kn68ckJu2Hn6pSs69"
          },
          {
            name: "รพ.บำรุงราษฎร์/Bumrungrad Hospital",
            service: "OPD&IPD case",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2066-8888",
            mapUrl: "https://maps.app.goo.gl/i2atrDhMHyBNcuEk6"
          },
          {
            name: "รพ.สมิติเวช ศรีนครินทร์/Samitivej Srinakarin Hospital",
            service: "OPD&IPD case",
            province: "กรุงเทพมหานคร/Bangkok",
            phone: "0-2022-2222",
            mapUrl: "https://maps.app.goo.gl/SnCLzP4ihg24CgJb8"
          }
        ]
      }
    ]
  },
  suburban: {
    title: "ปริมณฑล (Suburban)",
    provinces: [
      {
        name: "นครปฐม/Nakornptrathom",
        hospitals: [
          {
            name: "รพ.เทพากร/Thepakorn Hospital",
            service: "OPD&IPD case",
            province: "นครปฐม/Nakornptrathom",
            phone: "0-3427-3463",
            mapUrl: "https://maps.app.goo.gl/kVQ4axZeX3nZqbQYA"
          },
          {
            name: "รพ.กรุงเทพคริสเตียน นครปฐม/Bangkok Christian Nakhonpathom Hospital",
            service: "OPD&IPD case",
            province: "นครปฐม/Nakornptrathom",
            phone: "0-3427-0080-7",
            mapUrl: "https://maps.app.goo.gl/xeLVSp9f4zoCTqcR8"
          },
          {
            name: "รพ.กรุงเทพสนามจันทร์/Bangkok Hospital Sanamchan",
            service: "OPD&IPD case",
            province: "นครปฐม/Nakornptrathom",
            phone: "Hot line: 1719, 0-3421-9600",
            mapUrl: "https://maps.app.goo.gl/AUz3rwd2G2WR5YSa9"
          }
        ]
      },
      {
        name: "นนทบุรี/Nonthaburi",
        hospitals: [
          {
            name: "รพ.เกษมราษฎร์ รัตนาธิเบศร์/Kasemrad Rattanatibeth Hospital",
            service: "OPD&IPD case",
            province: "นนทบุรี/Nonthaburi",
            phone: "0-2921-3400-9",
            mapUrl: "https://maps.app.goo.gl/BY7qhBz3tMbEkMw66"
          },
          {
            name: "รพ.เกษมราษฎร์ อินเตอร์เนชั่นแนล รัตนาธิเบศร์/Kasemrad International Hospital Rattanatibeth",
            service: "OPD&IPD case",
            province: "นนทบุรี/Nonthaburi",
            phone: "0-2594-0020-65",
            mapUrl: "https://maps.app.goo.gl/6jHQoJfwVsM4tKnPA"
          },
          {
            name: "รพ.นนทเวช/Nonthavej Hospital",
            service: "OPD&IPD case",
            province: "นนทบุรี/Nonthaburi",
            phone: "0-2596-7888",
            mapUrl: "https://maps.app.goo.gl/U8WwfQARerpEViPQA"
          }
        ]
      },
      {
        name: "ปทุมธานี/Pathumthanni",
        hospitals: [
          {
            name: "รพ.เปาโล รังสิต/Paolo Rangsit Hospital",
            service: "OPD&IPD case",
            province: "ปทุมธานี/Pathumthanni",
            phone: "0-2577-8111",
            mapUrl: "https://maps.app.goo.gl/4AQtiafg4ssiQTwQ9"
          },
          {
            name: "รพ.แพทย์รังสิต 1/PatRangsit 1 Hospital",
            service: "OPD&IPD case",
            province: "ปทุมธานี/Pathumthanni",
            phone: "0-2998-9999",
            mapUrl: "https://goo.gl/maps/DSJAPdvssRGEp8gr7"
          }
        ]
      },
      {
        name: "สมุทรปราการ/Samut Prakarn",
        hospitals: [
          {
            name: "รพ.เปาโล พระประแดง/Paolo Phrapradaeng Hospital",
            service: "OPD&IPD case",
            province: "สมุทรปราการ/Samut Prakarn",
            phone: "0-2818-9000, 0-2815-7141-50",
            mapUrl: "https://maps.app.goo.gl/BZis3TkyRW9DCktC7"
          },
          {
            name: "รพ.จุฬารัตน์ 1 สุวรรณภูมิ/Chularat 1 Suvarnabhumi Hospital",
            service: "OPD&IPD case",
            province: "สมุทรปราการ/Samut Prakarn",
            phone: "Hot line: 1609, 0-2316-9561, 0-2316-5033",
            mapUrl: "https://maps.app.goo.gl/ZCC4enqxueM9Fqr36"
          }
        ]
      }
    ]
  },
  central: {
    title: "ภาคกลาง (Central)",
    provinces: [
      {
        name: "เพชรบูรณ์/Phetchabun",
        hospitals: [
          {
            name: "รพ.เพชรรัตน์/Petcharat Hospital",
            service: "OPD&IPD case",
            province: "เพชรบูรณ์/Phetchabun",
            phone: "0-5672-0680-4",
            mapUrl: "https://maps.app.goo.gl/x8SfvswBDcJp3aqo6"
          }
        ]
      },
      {
        name: "นครสวสรรค์/Nakhonsawan",
        hospitals: [
          {
            name: "รพ.พริ้นซ์ ปากน้ำโพ 1/Princ Hospital Paknampo 1",
            service: "OPD&IPD case",
            province: "นครสวสรรค์/Nakhonsawan",
            phone: "Call center 1208, 0-5600-0111",
            mapUrl: "https://maps.app.goo.gl/w4EbSUcEsp8jHZv5A"
          }
        ]
      }
    ]
  },
  eastern: {
    title: "ภาคตะวันออก (Eastern)",
    provinces: [
      {
        name: "จันทบุรี/Chantaburi",
        hospitals: [
          {
            name: "รพ.กรุงเทพจันทบุรี/Bangkok Hospital Chantaburi",
            service: "OPD&IPD case",
            province: "จันทบุรี/Chantaburi",
            phone: "Call center: 1719, 0-3931-9888, 0-3960-2177",
            mapUrl: "https://maps.app.goo.gl/6rZsyhZr69RHrsFw5"
          }
        ]
      },
      {
        name: "ชลบุรี/Chonburi",
        hospitals: [
          {
            name: "รพ.กรุงเทพพัทยา/Bangkok Hospital Pattaya",
            service: "OPD&IPD case",
            province: "ชลบุรี/Chonburi",
            phone: "038-259-999",
            mapUrl: "https://goo.gl/maps/sZM17JwVpULeJLkp9"
          },
          {
            name: "รพ.สมิติเวช ชลบุรี/Samitivej Chonburi Hospital",
            service: "OPD&IPD case",
            province: "ชลบุรี/Chonburi",
            phone: "0-3303-8888",
            mapUrl: "https://maps.app.goo.gl/eVE7XP5whcorSotc6"
          }
        ]
      }
    ]
  },
  northern: {
    title: "ภาคเหนือ (Northern)",
    provinces: [
      {
        name: "เชียงใหม่/ChiangMai",
        hospitals: [
          {
            name: "รพ.เชียงใหม่ ราม/Chiang Mai Ram Hospital",
            service: "OPD&IPD case",
            province: "เชียงใหม่/ChiangMai",
            phone: "0-5200-4699",
            mapUrl: "https://maps.app.goo.gl/tsP2BCZjqdj6rZHn7"
          },
          {
            name: "รพ.กรุงเทพเชียงใหม่/Bangkok Hospital Chiangmai",
            service: "OPD&IPD case",
            province: "เชียงใหม่/ChiangMai",
            phone: "Call center: 1719, 0-5208-9888",
            mapUrl: "https://maps.app.goo.gl/G8PSPNe2eDfy9ZyYA"
          }
        ]
      },
      {
        name: "เชียงราย/ChiangRai",
        hospitals: [
          {
            name: "รพ.เกษมราษฎร์ ศรีบุรินทร์/Kasemrad Sriburin Hospital",
            service: "OPD&IPD case",
            province: "เชียงราย/ChiangRai",
            phone: "0-5391-0999",
            mapUrl: "https://maps.app.goo.gl/B1GuFM29XecXscXb7"
          }
        ]
      }
    ]
  },
  western: {
    title: "ภาคตะวันตก (Western)",
    provinces: [
      {
        name: "เพชรบุรี/Phetchaburi",
        hospitals: [
          {
            name: "รพ.กรุงเทพเพชรบุรี/Bangkok Hospital Phetchaburi",
            service: "OPD&IPD case",
            province: "เพชรบุรี/Phetchaburi",
            phone: "0-3289-7888",
            mapUrl: "https://maps.app.goo.gl/QcC9yJcawNKyRCkn8"
          }
        ]
      },
      {
        name: "กาญจนบุรี/Kanchanaburi",
        hospitals: [
          {
            name: "รพ.ธนกาญจน์/Thanakarn Hospital",
            service: "OPD&IPD case",
            province: "กาญจนบุรี/Kanchanaburi",
            phone: "0-3454-0601",
            mapUrl: "https://maps.app.goo.gl/fkFMgku1EdXLi7Av5"
          }
        ]
      }
    ]
  },
  northeastern: {
    title: "ภาคตะวันออกเฉียงเหนือ (North Eastern)",
    provinces: [
      {
        name: "เลย/Loei",
        hospitals: [
          {
            name: "รพ.เมืองเลย ราม/Muang Loei Ram Hospital",
            service: "OPD&IPD case",
            province: "เลย/Loei",
            phone: "0-4287-0000-9",
            mapUrl: "https://maps.app.goo.gl/u5y6v41fWm2nLw3q7"
          }
        ]
      },
      {
        name: "ขอนแก่น/Khonkaen",
        hospitals: [
          {
            name: "รพ.กรุงเทพ ขอนแก่น/Bangkok Hospital Khon Khaen",
            service: "OPD&IPD case",
            province: "ขอนแก่น/Khonkaen",
            phone: "Call center: 1724, 0-4304-2888",
            mapUrl: "https://maps.app.goo.gl/SGR8HwMGobqF6cUJ9"
          }
        ]
      }
    ]
  },
  southern: {
    title: "ภาคใต้ (Southern)",
    provinces: [
      {
        name: "กระบี่/Krabi",
        hospitals: [
          {
            name: "เวิลด์ เมด บีชฟรอนท์ คลินิกเวชกรรม/Worldmed beachfront Clinic",
            service: "OPD case only",
            province: "กระบี่/Krabi",
            phone: "095-424-0444",
            mapUrl: "https://maps.app.goo.gl/vV7G99yZ5QuTAeEXA"
          },
          {
            name: "รพ.กระบี่นครินทร์ อินเตอร์เนชั่นแนล/Krabinakarin International Hospital",
            service: "OPD&IPD case",
            province: "กระบี่/Krabi",
            phone: "0-7562-6555",
            mapUrl: "https://maps.app.goo.gl/2hUGzUx8rwZVwQBF8"
          }
        ]
      },
      {
        name: "ภูเก็ต/Phuket",
        hospitals: [
          {
            name: "รพ.กรุงเทพภูเก็ต/Bangkok Hospital Phuket",
            service: "OPD&IPD case",
            province: "ภูเก็ต/Phuket",
            phone: "Call center: 1719, 0-7625-4425",
            mapUrl: "https://maps.app.goo.gl/qLnJ4FJR8bxB9qHi6"
          }
        ]
      },
      {
        name: "สุราษฏร์ธานี/Suratthani",
        hospitals: [
          {
            name: "รพ.กรุงเทพสมุย/Bangkok Hospital Samui",
            service: "OPD&IPD case",
            province: "สุราษฏร์ธานี/Suratthani",
            phone: "Call center: 1719, 0-7742-9500",
            mapUrl: "https://maps.app.goo.gl/pwRjidGbdmi6AqzE7"
          }
        ]
      }
    ]
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = hospitalData;
}