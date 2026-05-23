import React from "react";
import "./LandingPage.css";
import NavBar from "../../Components/NavBar/NavBar";
import CarouselSection from "../../Components/Carousel Section/CarouselSection";
import SeveralItemsSection from "../../Components/Several Items Section/SeveralItemsSection";
import watchImg from "../../assets/watch.jpg";
import cakeImg from "../../assets/cake.jpg";
import TrendingItemsSection from "../../Components/Trending Items Section/TrendingItemsSection";
import Button from "../../Components/UI/Button/Button";
import { IoIosArrowForward } from "react-icons/io";
import Gift from "../../assets/GiftPackImg.png";
import Packaging from "../../assets/packaging.jpg";
import Cake3d from "../../assets/CakePackImg.png";
import PinkletDetailsSection from "../../Components/Pinklet Details Section/PinkletDetailsSection";
import { useNavigate } from "react-router-dom";
import PinkletDetailQA from "../../Components/Pinklet Detail QA/PinkletDetailQA";
import Footer from "../../Components/Footer/Footer";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="LandingPageContainer">
      <NavBar />

      <CarouselSection />
      <SeveralItemsSection
        title={"Perfect Gifts to Add Your Packages"}
        para={"Based on your selections and what’s trending right now."}
        watchImg={watchImg}
        ItemType={"items"}
      />
      <TrendingItemsSection
        title={"Top Trending Gift Items"}
        para={
          "These hand-picked gift items are perfect additions to your custom package."
        }
        Img={watchImg}
        ItemType={"item"}
      />
      <div className="GiftCustomiztionLauncher">
        <div className="GiftCustomiztionLauncherContainer">
          <div className="GiftCustomiztionLauncherLeft">
            <h3>Make Your Own Gift Package in Minutes</h3>
            <p>
              Just pick a cake, add your favorite items, and see a real-time
              visual preview before placing the order.
            </p>
            <div className="GiftCustomiztionLauncherBtn">
              <Button variant="outline">
                Start Customizing Now <IoIosArrowForward />{" "}
              </Button>
            </div>
          </div>
          <div className="GiftCustomiztionLauncherRight">
            <div className="GiftCustomiztionLauncherImg">
              <img src={Gift} alt="Gift Customization" />
            </div>
          </div>
        </div>
      </div>
      <PinkletDetailsSection
        Img={Packaging}
        title="Why Choose Pinklet?"
        para="We’re not just a cake shop. Pinklet is a personalized gifting experience bringing together hand-crafted cakes, artisan gifts, and smart design tools to make every moment unforgettable."
      >
        <div>
          <PinkletDetailQA
            title={"🛍️ Local Artisan Marketplace "}
            para={
              "We partner with local artisans to bring you unique, handcrafted gifts that add a personal touch to your celebrations."
            }
          />
          <PinkletDetailQA
            title={"✨ Real-Time Customization"}
            para={
              "With Pinklet’s intuitive design interface, what you customize is exactly what you get. Instantly preview cakes, gift boxes, and decorations as you personalize — no surprises, just satisfaction."
            }
          />
          <PinkletDetailQA
            title={"💡 Budget-Friendly Suggestions"}
            para={
              "Our smart system suggests gifts and cakes that fit your budget, ensuring you get the best value without compromising on quality or style."
            }
          />
          <PinkletDetailQA
            title={"🛍️ Fully Customizable Gift Packages"}
            para={
              "Create your own gift package by choosing from a wide range of cakes and items. Mix and match to create the perfect gift box for any occasion."
            }
          />
        </div>
      </PinkletDetailsSection>

      <SeveralItemsSection
        title={"Cakes You Might Love"}
        para={
          "Handpicked for you based on what others like and your preferences."
        }
        watchImg={cakeImg}
        ItemType={"cakes"}
      />
      <TrendingItemsSection
        title={"Our Most Loved Cakes"}
        para={
          "These sweet creations are trending now! Add to your gift box or order as a centerpiece."
        }
        Img={cakeImg}
        ItemType={"cakes"}
      />

      <div className="GiftCustomiztionLauncher">
        <div className="GiftCustomiztionLauncherContainer">
          <div className="GiftCustomiztionLauncherRight">
            <div className="GiftCustomiztionLauncherImg">
              <img src={Cake3d} alt="Gift Customization" />
            </div>
          </div>
          <div className="GiftCustomiztionLauncherLeft">
            <h3>Design Your Dream Cake in 3D!</h3>
            <p>
            With our interactive 3D cake designer, you can shape your cake layer by layer, add custom decorations, and even upload your own designs!

            </p>
            <div className="GiftCustomiztionLauncherBtn">
              <Button variant="outline" onClick={() => navigate("/3dcustomizer")}>
              Try 3D Cake Designer <IoIosArrowForward />{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PinkletDetailsSection
        title="Join Our Gifting Family"
        para="Get exclusive access to smart tools and sweet surprises as a registered user!"
      >
        <div>
          <PinkletDetailQA
            title={"🎁 Save Gift Packages for Future"}
            para={
              "As a registered user, you can save your custom gift packages and revisit them anytime. Perfect for planning ahead!"
            }
          />
          <PinkletDetailQA
            title={"🎉 Get Exclusive Offers & Giveaways"}
            para={
              "Join our community to receive special discounts, early access to new products, and exclusive giveaways. We love rewarding our loyal customers!"
            }
          />
          <PinkletDetailQA
            title={"📅 Save Special Dates (We’ll Remind You!)"}
            para={
              "Never forget a birthday or anniversary again! Save important dates and we’ll send you friendly reminders so you can plan the perfect gift."
            }
          />
          <PinkletDetailQA
            title={"❤️ Personalized Recommendations"}
            para={
              "As a registered user, we’ll learn your preferences and suggest gifts and cakes tailored just for you. The more you use Pinklet, the better we get at finding your perfect match!"
            }
          />
          <PinkletDetailQA
            title={"📝 Order Tracking & History"}
            para={
              "Keep track of all your orders in one place. View your order history, track current deliveries, and manage your saved gift packages easily."
            }
          />
        </div>
      </PinkletDetailsSection>
      <Footer/>
    </div>
  );
}

export default LandingPage;
