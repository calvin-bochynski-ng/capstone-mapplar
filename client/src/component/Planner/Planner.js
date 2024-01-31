import "./Planner.scss";

const Planner = ({ selectedSites, setIsItinerary }) => {
  if (!selectedSites) {
    return <p>loading...</p>;
  }
  return (
    <section className="planner">
      <h1 className="planner__title">Selected Sites</h1>
      {!selectedSites
        ? ""
        : selectedSites.map((site, index) => {
            return (
              <div key={index}>
                <p className="planner__site-name">{site.site_name}</p>
              </div>
            );
          })}
      <button
        className="planner__button"
        onClick={() => {
          setIsItinerary(true);
        }}
      >
        Checkout to Itinerary
      </button>
    </section>
  );
};
export default Planner;
