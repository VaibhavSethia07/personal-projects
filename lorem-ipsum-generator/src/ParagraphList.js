const ParagraphList = ({ paragraphs }) => {
  return (
    <div className="lorem-text">
      {paragraphs.map((paragraph, index) => {
        return (
          <article key={index}>
            <p>{paragraph}</p>
          </article>
        );
      })}
    </div>
  );
};

export default ParagraphList;
