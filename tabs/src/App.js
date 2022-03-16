import { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Loading";
import Companies from "./Companies";
import Job from "./Job";
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const [value, setValue] = useState(0);
  let companies = [];

  const fetchData = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setAllJobs(newJobs);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  companies = [...new Set(allJobs.map((job) => job.company))];
  return (
    <main>
      <section className="section">
        <div className="title">
          <h2>Experience</h2>
          <div className="underline"></div>
        </div>
      </section>
      <div className="jobs-center">
        <Companies companies={companies} value={value} setValue={setValue} />
        <Job jobs={allJobs} index={value} />
      </div>
    </main>
  );
}

export default App;
