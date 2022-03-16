const Companies = ({ companies, value, setValue }) => {
  return (
    <div className="btn-container">
      {companies.map((company, index) => {
        return (
          <button
            key={index}
            type="button"
            className={`job-btn ${index === value && "active-btn"}`}
            onClick={() => setValue(index)}
          >
            {company}
          </button>
        );
      })}
    </div>
  );
};

export default Companies;
