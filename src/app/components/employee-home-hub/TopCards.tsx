"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

import 'swiper/css';
import CardBox from "../shared/CardBox"

const TopCards = () => {

  const TopCardInfo = [
    {
      key: "card1",
      title: "My focus streak",
      desc: "5 days",
      subtext: "deep-work days in a row",
      img: "/images/svgs/icon-connect.svg",
      bgcolor: "bg-info/10 dark:bg-info/10",
      textclr: "text-info dark:text-info",
    },
    {
      key: "card2",
      title: "Today's XP",
      desc: "320",
      subtext: "earned from quests and sessions",
      img: "/images/svgs/icon-speech-bubble.svg",
      bgcolor: "bg-success/10 dark:bg-success/10",
      textclr: "text-success dark:text-success",
    },
    {
      key: "card3",
      title: "Breaks taken",
      desc: "3 / 5",
      subtext: "quality breaks so far",
      img: "/images/svgs/icon-favorites.svg",
      bgcolor: "bg-error/10 dark:bg-error/10",
      textclr: "text-error dark:text-error",
    },
    {
      key: "card4",
      title: "Quests done",
      desc: "2 / 3",
      subtext: "today's quests completed",
      img: "/images/svgs/icon-mailbox.svg",
      bgcolor: "bg-secondary/10 dark:bg-secondary/10",
      textclr: "text-primary dark:text-primary",
    },
    {
      key: "card5",
      title: "Social moments",
      desc: "1 lunch",
      subtext: "or coffee booked today",
      img: "/images/svgs/icon-briefcase.svg",
      bgcolor: "bg-warning/10 dark:bg-warning/10",
      textclr: "text-warning dark:text-warning",
    },
    {
      key: "card6",
      title: "Pet mood",
      desc: "Happy",
      subtext: "stays happy when you take real breaks",
      img: "/images/svgs/icon-user-male.svg",
      bgcolor: "bg-primary/10 dark:bg-lightprimary",
      textclr: "text-primary dark:text-primary",
    },
    {
      key: "card7",
      title: "Today's mission",
      desc: "Deep work",
      subtext: "on Project Nova – your main focus for today",
      img: "/images/svgs/icon-favorites.svg",
      bgcolor: "bg-lighterror dark:bg-lighterror",
      textclr: "text-error dark:text-error",
    },
  ]

  return (
    <>
      <div>
        <Swiper
          slidesPerView={6}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          grabCursor={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            1030: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {
            TopCardInfo.map((item) => {
              return (
                <SwiperSlide key={item.key}>
                  <CardBox className={`shadow-none ${item.bgcolor} w-full border-none!`}>
                    <div className="text-center hover:scale-105 transition-all ease-in-out">
                      <div className="flex justify-center">
                        <Image src={item.img}
                          width="50" height="50" className="mb-3" alt="profile-image" />
                      </div>
                      <p className={`font-semibold ${item.textclr} mb-1`}>
                        {item.title}
                      </p>
                      <h5 className={`text-lg font-semibold ${item.textclr} mb-0`}>{item.desc}</h5>
                      <p className={`text-xs ${item.textclr} mt-1 opacity-75`}>{item.subtext}</p>
                    </div>
                  </CardBox>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </>
  )
}
export { TopCards }
