const StatisticsCard = (props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-x-4 gap-y-4 rounded-2xl sm:max-w-none lg:max-w-none lg:flex-none lg:flex-col lg:items-start lg:gap-x-16 lg:p-8">
      <div className="flex w-48 lg:w-auto items-center gap-4">
        <p className="flex-none text-4xl font-semibold tracking-tight">{props.number}</p>
      </div>
      <div className="flex-grow flex flex-col space-y-2 sm:w-80 sm:shrink lg:w-auto lg:flex-none">
        <p className="text-2xl font-medium tracking-tight text-eclipse">{props.title}</p>
        <p className="text-base leading-7">{props.description}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
