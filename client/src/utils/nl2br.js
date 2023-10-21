const nl2br = (text) => {
  if (!text) return text;
  return text.split('\n').map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });
};

export default nl2br;
