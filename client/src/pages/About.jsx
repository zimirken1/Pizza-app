import React from 'react';
import "../styles/About.css"

const About = () => {
    return (
        <>
            <div className={"offer-section"}>
                <div className={"offer-section__image"}></div>
                <div className={"logo"}>
                    <div className={"logo__image"}></div>
                    <div className={"logo__text"}>PIZZERIA</div>
                </div>
            </div>
            <div className={"history-section"}>
                <div className={"history-article"}>
                    <div className={"title"}>Немного нашей истории</div>
                    <div className={"img"}></div>
                    <div className={"text"}>
                        История "Pizzeria" - это история времен, когда качество было важнее количества,
                        и любовь к еде собирала людей вместе. Здесь каждая пицца готовится с любовью и тщательностью,
                        чтобы побаловать гостей неповторимым вкусом и атмосферой итальянского гостеприимства.
                        Если вы хотите окунуться в атмосферу старой Италии и
                        насладиться волшебством пиццы, "Pizzeria" всегда открыта для вас.
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;