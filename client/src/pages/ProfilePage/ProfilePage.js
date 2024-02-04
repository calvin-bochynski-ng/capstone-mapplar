import "./ProfilePage.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../component/Profile/Profile";
import AccordionCard from "../../component/AccordionCard/AccordionCard";

import Search from "../../component/Search/Search";

const ProfilePage = ({ setIsToken }) => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return (
    <main className="profile-page">
      <section className="profile-page__container">
        <div className="profile-page__search">
          <Search setIsSearch={setIsSearch} />
        </div>
        <Profile userid={userid} isSearch={isSearch} />
      </section>

      <section className="profile-page__itinerary">
        <h1>Recent Itinerary</h1>
        <AccordionCard
          City="London"
          Destination="United Kingdom"
          userid={userid}
          isSearch={isSearch}
        />
        <AccordionCard
          City="New York"
          Destination="United States"
          userid={userid}
          isSearch={isSearch}
        />
        <AccordionCard
          City="Hong Kong"
          Destination="Hong Kong"
          userid={userid}
          isSearch={isSearch}
        />
      </section>
    </main>
  );
};
export default ProfilePage;
