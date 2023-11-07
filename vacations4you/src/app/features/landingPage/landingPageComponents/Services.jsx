import { Image } from "../landingPageComponents/customComponents/Image";
import { Text } from "../landingPageComponents/customComponents/Text";
import { ServiceTexts } from "./helper/DataList";
import GroupOfPlus from "../../../../images/landingPage/plusGroup.png";
import { Card } from "../landingPageComponents/customComponents/Card";
import { useCallback } from "react";
import Icon1 from "../../../../images/landingPage/icon1.png";
import Icon3 from "../../../../images/landingPage/icon3.png";
import Icon4 from "../../../../images/landingPage/icon4.png";
import { Fade } from "react-awesome-reveal";

const Services = () => {
    const renderServiceIcon = useCallback((element) => {
        switch (element) {
            case 0:
                return Icon1;
            case 1:
                return Icon3;
            case 2:
                return Icon4;
            // case 3:
            //     return Icon2;
            default:
                return "";
        }
    }, []);

    return (
        <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6">
            <Image image={GroupOfPlus} alt="Vector" className="absolute top-0 right-4 lg:h-36 h-24" />
            <main className="w-full pt-32 flex flex-col gap-3 items-center justify-center">
                <Text as="p" className="font-light text-base text-color3/80 tracking-widest">
                    <Fade>{ServiceTexts.firstText}</Fade>
                </Text>
                <Text as="h2" className="md:text-4xl text-2xl font-medium capitalize text-color3">
                    <Fade>{ServiceTexts.secondText}</Fade>
                </Text>

                <div className="w-full h-auto grid lg:grid-cols-3 md:grid-cols-2 lg:gap-7 md:gap-10 gap-7 my-12 z-20 px-8 md:px-0">
                    {ServiceTexts.cards.map((card, index) => (
                        <Card
                            cardClass="w-full bg-white flex flex-col items-center justify-center py-6 cursor-pointer transition duration-300 hover:shadow-xl px-5 rounded-xl cardPseudo after:bg-color1"
                            imageWrapperClass="w-32 h-28 relative z-10 before:content-[''] before:absolute before:top-0 before:right-0 before:w-20 before:h-20 before:bg-color2/30 before:-z-10 before:rounded-tl-3xl before:rounded-br-3xl"
                            cover="object-cover"
                            imageAlt={card.firstText}
                            imageSrc={renderServiceIcon(index)}
                            textWrapperClass="w-full flex flex-col items-center gap-2"
                            key={index}
                        >
                            <Text as="h4" className="text-base rounded font-medium text-color3">
                                {card.firstText}
                            </Text>
                            <Text as="p" className="text-sm font-light text-center text-color3">
                                {card.secondText}
                            </Text>
                        </Card>
                    ))}
                </div>
            </main>
        </section>
    );
};

export default Services;
