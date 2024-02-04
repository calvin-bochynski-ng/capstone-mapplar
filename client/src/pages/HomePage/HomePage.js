import "./HomePage.scss";
import heroPhone from "../../assets/images/hero-phone.svg";
import heroTablet from "../../assets/images/hero-tablet.svg";
import heroDesktop from "../../assets/images/hero-desktop.svg";
const HomePage = () => {
  return (
    <main className="hero">
      <img src={heroPhone} alt="hero" className="hero__img hero__img--phone" />
      <img
        src={heroTablet}
        alt="hero"
        className="hero__img hero__img--tablet"
      />
      <img
        src={heroDesktop}
        alt="hero"
        className="hero__img hero__img--desktop"
      />
      <h1>This is the Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
        totam cumque consequuntur, repudiandae quaerat praesentium obcaecati eum
        sequi, est necessitatibus commodi non deleniti. Magni, ducimus impedit.
        At porro quo inventore.
      </p>
    </main>
  );
};
export default HomePage;
