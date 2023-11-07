import { useCallback, useRef } from "react";
import { Text } from "../landingPageComponents/customComponents/Text";
import { TestimonialTexts } from "./helper/DataList"
import Slider from "react-slick";
import { Button } from "../landingPageComponents/customComponents/Button";
import { Card } from "../landingPageComponents/customComponents/Card";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import CardImage1 from "../../../../images/landingPage/profile1.jpeg";
import CardImage2 from "../../../../images/landingPage/profile2.jpeg";
import CardImage3 from "../../../../images/landingPage/profile3.jpeg";
import CardImage4 from "../../../../images/landingPage/profile4.jpeg";
import groupOfPlus from "../../../../images/landingPage/plusGroup2.png";
import { Image } from "../landingPageComponents/customComponents/Image";

const Testimonials = () => {
    const sliderRef = useRef(null);

    // Function for next button
    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    // Function for previous button
    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
    };

    const renderProfileImg = useCallback((element) => {
        switch (element) {
            case 0:
                return CardImage2;
            case 1:
                return CardImage1;
            case 2:
                return CardImage3;
            case 3:
                return CardImage4;
            default:
                return "";
        }
    }, []);

    return (
        <section className="w-full h-auto flex flex-col items-start justify-center relative lg:px-24 md:px-10 px-6 mt-36 gap-5">
            <main className='w-full grid md:grid-cols-2 lg:gap-0 gap-8 md:gap-5'>
                <div className='w-full flex flex-col gap-6'>
                    <Text as="p" className="font-light text-base text-color3/80 tracking-widest">
                        {TestimonialTexts.firstText}
                    </Text>
                    <Text as="h1" className="lg:text-5xl md:text-3xl text-4xl text-color3 font-medium">
                        {TestimonialTexts.secondText}
                    </Text>
                </div>
                <div className="w-full lg:h-[400px] flex justify-center gap-4 items-center">
                    <div className="lg:h-[250px] w-[90%]">
                        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                            {
                                TestimonialTexts.feedBacks.map((feedBack, index) => (
                                    <div className="w-full">
                                        <Card key={index} cardClass="bg-white shadow border-[1px] border-color3/10 relative rounded-xl p-4 lg:h-[200px] h-[260px] lg:mb-4 w-full flex gap-4 justify-start" imageAlt={feedBack.person} imageSrc={renderProfileImg(index)} imageWrapperClass="w-20 h-20 rounded-full absolute lg:bottom-4 bottom-3 right-4 overflow-hidden" cover="object-cover object-top" textWrapperClass="flex flex-col justify-center gap-6">
                                            <Text as="q" className="text-[0.84rem] font-light text-color3">
                                                {feedBack.text}
                                            </Text>
                                            <div className="flex flex-col gap-2">
                                                <Text as="h4" className="text-base text-color3 font-medium">
                                                    {feedBack.person}
                                                </Text>
                                                <Text as="p" className="text-sm text-color3 font-light">
                                                    {feedBack.location}
                                                </Text>
                                            </div>
                                        </Card>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                    <div className="flex flex-col gap-4 pb-5">
                        <Button onClick={previous} id="prev" className="cursor-pointer outline-none border-none bg-color2/30 text-color3 hover:bg-color2 p-2 rounded-full" type="button">
                            <CaretUp size={18} color="currentColor" weight="fill" />
                        </Button>
                        <Button onClick={next} id="next" className="cursor-pointer outline-none border-none bg-color2/30 text-color3 hover:bg-color2 p-2 rounded-full" type="button">
                            <CaretDown size={18} color="currentColor" weight="fill" />
                        </Button>
                    </div>
                </div>
                <Image image={groupOfPlus} alt="Plus" className="absolute -bottom-16 right-2 h-32" />
            </main>
        </section>
    );
};

export default Testimonials;
